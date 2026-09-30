import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageSquare, Minus, Plus, RotateCcw, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { LogoMark } from "@/components/brand/Logo";
import { whatsappLink } from "@/config/site";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

interface ProductCardData {
  reference: string;
  designation: string;
  brand: string;
}
interface PostCardData {
  slug: string;
  title: string;
  category: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: ProductCardData[];
  articles?: PostCardData[];
}

const STORAGE_KEY = "rd-chat-session";
const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Bonjour, je suis l'assistant de Rousseau Distribution. Dites-moi quelle pièce vous recherchez et je vous oriente vers la bonne référence.",
};
const QUICK_REPLIES = [
  "Je cherche une pièce",
  "Demander un devis",
  "Quelles familles de produits ?",
  "Parler à un commercial",
];

function newId() {
  return Math.random().toString(36).slice(2);
}

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [sessionId] = useState(() => newId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSent = useRef(0);
  const { add, has } = useQuote();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw) as ChatMessage[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!mounted || open) return;
    if (sessionStorage.getItem("rd-chat-tip")) return;
    const t = setTimeout(() => setTooltip(true), 6000);
    return () => clearTimeout(t);
  }, [mounted, open]);

  const dismissTip = () => {
    setTooltip(false);
    try {
      sessionStorage.setItem("rd-chat-tip", "1");
    } catch {
      /* ignore */
    }
  };

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, 500);
      if (!text || streaming) return;
      if (Date.now() - lastSent.current < 1200) return;
      lastSent.current = Date.now();

      const history = [...messages, { id: newId(), role: "user" as const, content: text }];
      setMessages(history);
      setInput("");
      setStreaming(true);

      const assistantId = newId();
      setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

      try {
        const res = await fetch("/api/public/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            messages: history
              .filter((m) => m.id !== "welcome")
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (!res.ok || !res.body) throw new Error("network");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const patch = (fn: (m: ChatMessage) => ChatMessage) =>
          setMessages((prev) => prev.map((m) => (m.id === assistantId ? fn(m) : m)));

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            try {
              const ev = JSON.parse(line) as {
                type: string;
                value?: string;
                items?: unknown;
                code?: number;
              };
              if (ev.type === "text") {
                patch((m) => ({ ...m, content: m.content + (ev.value ?? "") }));
              } else if (ev.type === "products") {
                patch((m) => ({ ...m, products: ev.items as ProductCardData[] }));
              } else if (ev.type === "posts") {
                patch((m) => ({ ...m, articles: ev.items as PostCardData[] }));
              } else if (ev.type === "error") {
                const msg =
                  ev.code === 429
                    ? "Beaucoup de demandes en ce moment. Réessayez dans un instant, ou passez par le formulaire de devis."
                    : "Je ne parviens pas à répondre pour le moment. Vous pouvez nous écrire via le formulaire de devis ou WhatsApp.";
                patch((m) => ({ ...m, content: m.content || msg }));
              }
            } catch {
              /* ignore */
            }
          }
        }
        patch((m) =>
          m.content || m.products || m.articles
            ? m
            : {
                ...m,
                content:
                  "Je ne parviens pas à répondre pour le moment. Vous pouvez nous écrire via le formulaire de devis ou WhatsApp.",
              },
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "La connexion a échoué. Vous pouvez nous écrire via le formulaire de devis ou WhatsApp.",
                }
              : m,
          ),
        );
      } finally {
        setStreaming(false);
      }
    },
    [messages, sessionId, streaming],
  );

  if (!mounted) return null;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex max-w-[15rem] items-start gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-navy shadow-lift"
                >
                  <span>Une pièce à trouver ? Je vous aide.</span>
                  <button
                    type="button"
                    onClick={dismissTip}
                    aria-label="Fermer l'info-bulle"
                    className="focus-rd -mt-1 -mr-1 rounded p-1 text-muted-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                setMinimised(false);
                dismissTip();
              }}
              aria-label="Ouvrir l'assistant Rousseau"
              className="focus-rd relative flex size-14 items-center justify-center rounded-full bg-navy shadow-lift transition-transform duration-300 hover:scale-105 md:size-16"
            >
              <MessageSquare className="size-6 text-white md:size-7" />
              <span className="absolute top-2.5 right-2.5 size-2.5 rounded-full bg-rouge" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Assistant Rousseau"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className={cn(
              "fixed z-[60] flex flex-col overflow-hidden border border-border bg-background shadow-lift",
              "inset-0 rounded-none sm:inset-auto sm:right-5 sm:bottom-5 sm:h-[600px] sm:max-h-[calc(100vh-2.5rem)] sm:w-[400px] sm:rounded-2xl",
              minimised && "sm:h-auto",
            )}
          >
            <div className="glass-navy flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <LogoMark />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  Assistant Rousseau
                  <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                </p>
                <p className="text-xs text-white/60">Réponse en quelques secondes</p>
              </div>
              <button
                type="button"
                onClick={() => setMinimised((v) => !v)}
                aria-label={minimised ? "Agrandir" : "Réduire"}
                className="focus-rd hidden rounded p-1.5 text-white/70 hover:text-white sm:block"
              >
                {minimised ? <Plus className="size-4" /> : <Minus className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer l'assistant"
                className="focus-rd rounded p-1.5 text-white/70 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {!minimised && (
              <>
                <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-surface px-4 py-5">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex gap-2", m.role === "user" && "justify-end")}
                    >
                      {m.role === "assistant" && <LogoMark className="size-7" />}
                      <div className={cn("max-w-[82%] space-y-2", m.role === "user" && "text-right")}>
                        {(m.content || m.role === "user") && (
                          <div
                            className={cn(
                              "rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                              m.role === "user"
                                ? "bg-navy text-left text-white"
                                : "border border-border bg-background text-slate-ink",
                            )}
                          >
                            {m.role === "assistant" ? (
                              <div className="prose-chat space-y-2 [&_a]:text-rouge [&_a]:underline [&_code]:font-mono [&_code]:text-navy [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-navy">
                                <ReactMarkdown>{m.content}</ReactMarkdown>
                              </div>
                            ) : (
                              m.content
                            )}
                          </div>
                        )}

                        {m.products && m.products.length > 0 && (
                          <div className="space-y-2">
                            {m.products.map((p) => (
                              <div
                                key={p.reference}
                                className="rounded-lg border border-border bg-background p-3 text-left"
                              >
                                <span className="mono-ref font-bold text-rouge">{p.reference}</span>
                                <p className="mt-0.5 text-xs font-semibold text-navy">
                                  {p.designation}
                                </p>
                                <p className="text-[11px] text-muted-foreground">{p.brand}</p>
                                <div className="mt-2.5 flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      add(p);
                                      toast.success("Ajouté à votre demande de devis", {
                                        description: p.reference,
                                      });
                                    }}
                                    className="focus-rd rounded-md bg-rouge px-2.5 py-1.5 text-[11px] font-bold text-white"
                                  >
                                    {has(p.reference) ? "Ajouté" : "Ajouter au devis"}
                                  </button>
                                  <Link
                                    to="/catalogue/$reference"
                                    params={{ reference: encodeURIComponent(p.reference) }}
                                    onClick={() => setOpen(false)}
                                    className="focus-rd text-[11px] font-bold text-navy"
                                  >
                                    Voir
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {m.articles && m.articles.length > 0 && (
                          <div className="space-y-2">
                            {m.articles.map((a) => (
                              <div
                                key={a.slug}
                                className="rounded-lg border border-border bg-background p-3 text-left"
                              >
                                <p className="text-[11px] font-bold tracking-wide text-rouge uppercase">
                                  Article
                                </p>
                                <p className="mt-1 text-xs font-semibold text-navy">{a.title}</p>
                                <Link
                                  to="/blog/$slug"
                                  params={{ slug: a.slug }}
                                  onClick={() => setOpen(false)}
                                  className="focus-rd mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-navy"
                                >
                                  Lire <ArrowRight className="size-3" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {streaming && messages[messages.length - 1]?.content === "" && (
                    <div className="flex items-center gap-1.5 pl-9">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 animate-bounce rounded-full bg-navy/40"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </div>
                  )}

                  {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-2 pt-1 pl-9">
                      {QUICK_REPLIES.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => void send(q)}
                          className="focus-rd rounded-full border border-navy/15 bg-background px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-rouge hover:text-rouge"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void send(input);
                  }}
                  className="border-t border-border bg-background px-3 py-3"
                >
                  <div className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value.slice(0, 500))}
                      disabled={streaming}
                      maxLength={500}
                      placeholder="Votre question…"
                      aria-label="Message"
                      className="focus-rd min-w-0 flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-navy outline-none placeholder:text-muted-foreground"
                    />
                    <button
                      type="submit"
                      disabled={streaming || !input.trim()}
                      aria-label="Envoyer"
                      className="focus-rd flex size-10 shrink-0 items-center justify-center rounded-full bg-rouge text-white transition-opacity disabled:opacity-40"
                    >
                      <Send className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setMessages([WELCOME])}
                      className="focus-rd inline-flex items-center gap-1 font-semibold hover:text-navy"
                    >
                      <RotateCcw className="size-3" /> Nouvelle conversation
                    </button>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-rd font-semibold text-[#128C7E]"
                    >
                      WhatsApp
                    </a>
                  </div>
                  <p className="mt-2 text-center text-[10px] leading-snug text-muted-foreground">
                    Assistant IA, les informations sont à confirmer par notre équipe.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Headphones,
  Layers,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { whatsappLink } from "@/config/site";
import { getProduct } from "@/data/products";
import { getPostImage } from "@/lib/post-image";
import { getProductImage } from "@/lib/product-image";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/utils";
import avatar from "@/assets/chatbot-avatar.png";

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
const QUICK_REPLIES: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Je cherche une pièce", icon: Search },
  { label: "Demander un devis", icon: FileText },
  { label: "Quelles familles de produits ?", icon: Layers },
  { label: "Parler à un commercial", icon: Headphones },
];

function newId() {
  return Math.random().toString(36).slice(2);
}

/** Carries the HTTP status of a failed chat request so the UI can pick the right message. */
class ChatHttpError extends Error {
  status: number;
  constructor(status: number) {
    super(`chat request failed with status ${status}`);
    this.status = status;
  }
}

/** Round avatar used in the launcher, header, tooltip and assistant messages. */
function Avatar({ className }: { className?: string }) {
  return (
    <img
      src={avatar}
      alt=""
      decoding="async"
      className={cn("shrink-0 rounded-full bg-navy object-cover", className)}
      aria-hidden
    />
  );
}

function ProductBubble({
  product,
  onAdd,
  added,
  onNavigate,
}: {
  product: ProductCardData;
  onAdd: () => void;
  added: boolean;
  onNavigate: () => void;
}) {
  const full = getProduct(product.reference);
  const img = full ? getProductImage(full) : null;

  return (
    <div className="flex gap-3 rounded-xl border border-border bg-background p-2.5 text-left shadow-sm">
      {img && (
        <span
          className={cn(
            "size-16 shrink-0 overflow-hidden rounded-lg",
            img.specific ? "bg-surface" : "bg-navy-deep",
          )}
        >
          <img
            src={img.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn("size-full", img.specific ? "object-contain p-1" : "object-cover")}
          />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span className="mono-ref font-bold text-rouge">{product.reference}</span>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug font-semibold text-navy">
          {product.designation}
        </p>
        <p className="text-[11px] text-muted-foreground">{product.brand}</p>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onAdd}
            className={cn(
              "focus-rd inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors duration-300",
              added ? "bg-navy text-white" : "bg-rouge text-white hover:bg-rouge/90",
            )}
          >
            {added ? (
              <>
                <Check className="size-3" /> Ajouté
              </>
            ) : (
              "Ajouter au devis"
            )}
          </button>
          <Link
            to="/catalogue/$reference"
            params={{ reference: encodeURIComponent(product.reference) }}
            onClick={onNavigate}
            className="focus-rd text-[11px] font-bold text-navy hover:text-rouge"
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArticleBubble({ article, onNavigate }: { article: PostCardData; onNavigate: () => void }) {
  const image = getPostImage({ slug: article.slug, title: article.title });

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      onClick={onNavigate}
      className="group focus-rd flex overflow-hidden rounded-xl border border-border bg-background text-left shadow-sm transition-colors duration-300 hover:border-rouge/40"
    >
      {image && (
        <span className="relative w-20 shrink-0 overflow-hidden">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </span>
      )}
      <span className="min-w-0 flex-1 p-3">
        <span className="block text-[11px] font-bold tracking-wide text-rouge uppercase">
          Article
        </span>
        <span className="mt-1 line-clamp-2 block text-xs leading-snug font-semibold text-navy">
          {article.title}
        </span>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-navy group-hover:text-rouge">
          Lire <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
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
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSent = useRef(0);
  const reduced = useReducedMotion();
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

  // Escape closes the panel; the input takes focus when the panel opens (desktop only).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    if (window.matchMedia("(min-width: 640px)").matches) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, minimised]);

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
        if (!res.ok || !res.body) {
          const detail = await res.text().catch(() => "");
          console.error("[chat] request failed:", res.status, res.statusText, detail);
          throw new ChatHttpError(res.status);
        }

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
      } catch (err) {
        console.error("[chat] error:", err);
        const status = err instanceof ChatHttpError ? err.status : 0;
        const content =
          status === 429
            ? "Beaucoup de demandes en ce moment. Réessayez dans un instant, ou passez par le formulaire de devis."
            : status === 402 || status === 503
              ? "L'assistant est momentanément indisponible. Vous pouvez nous écrire via le formulaire de devis ou WhatsApp."
              : "La connexion a échoué. Vous pouvez nous écrire via le formulaire de devis ou WhatsApp.";
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content } : m)),
        );
      } finally {
        setStreaming(false);
      }
    },
    [messages, sessionId, streaming],
  );

  if (!mounted) return null;

  const lastId = messages[messages.length - 1]?.id;
  const showWelcomeGrid = messages.length <= 1;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-5 md:bottom-5"
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
                  className="relative flex max-w-[16rem] items-start gap-2.5 rounded-2xl rounded-br-md border border-border bg-background py-3 pr-2 pl-3 text-sm font-semibold text-navy shadow-lift"
                >
                  <Avatar className="size-7" />
                  <span className="pt-0.5 leading-snug">Une pièce à trouver ? Je vous aide.</span>
                  <button
                    type="button"
                    onClick={dismissTip}
                    aria-label="Fermer l'info-bulle"
                    className="focus-rd rounded p-1 text-muted-foreground hover:text-navy"
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
              className="group focus-rd relative flex size-16 items-center justify-center rounded-full bg-navy shadow-lift ring-2 ring-white transition-transform duration-300 hover:scale-105"
            >
              {!reduced && (
                <span
                  className="absolute inset-0 animate-ping rounded-full border-2 border-rouge/40"
                  style={{ animationDuration: "3.2s" }}
                  aria-hidden
                />
              )}
              <Avatar className="size-full" />
              <span className="absolute top-0 right-0 size-3.5 rounded-full border-2 border-white bg-rouge" />
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
            {/* Header */}
            <div className="glass-navy relative flex items-center gap-3 overflow-hidden border-b border-white/10 px-4 py-3.5">
              <div className="blueprint pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <span className="relative">
                <Avatar className="size-10 ring-2 ring-white/20" />
                <span
                  className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-navy bg-emerald-400"
                  aria-hidden
                />
              </span>
              <div className="relative min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Assistant Rousseau</p>
                <p className="text-xs text-white/60">En ligne, réponse en quelques secondes</p>
              </div>
              <button
                type="button"
                onClick={() => setMinimised((v) => !v)}
                aria-label={minimised ? "Agrandir" : "Réduire"}
                className="focus-rd relative hidden rounded p-1.5 text-white/70 hover:text-white sm:block"
              >
                {minimised ? <Plus className="size-4" /> : <Minus className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer l'assistant"
                className="focus-rd relative rounded p-1.5 text-white/70 hover:text-white"
              >
                <X className="size-4" />
              </button>
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-rouge" aria-hidden />
            </div>

            {!minimised && (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 space-y-4 overflow-y-auto bg-surface px-4 py-5"
                  aria-live="polite"
                >
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex items-end gap-2", m.role === "user" && "justify-end")}
                    >
                      {m.role === "assistant" && <Avatar className="size-7" />}
                      <div
                        className={cn(
                          "max-w-[84%] min-w-0 space-y-2",
                          m.role === "user" && "text-right",
                        )}
                      >
                        {(m.content || m.role === "user") && (
                          <div
                            className={cn(
                              "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                              m.role === "user"
                                ? "rounded-br-md bg-navy text-left text-white"
                                : "rounded-bl-md border border-border bg-background text-slate-ink",
                            )}
                          >
                            {m.role === "assistant" ? (
                              <div className="prose-chat space-y-2 [&_a]:text-rouge [&_a]:underline [&_code]:font-mono [&_code]:text-navy [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-navy">
                                <ReactMarkdown>{m.content}</ReactMarkdown>
                                {streaming && m.id === lastId && (
                                  <span
                                    className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-rouge align-middle"
                                    aria-hidden
                                  />
                                )}
                              </div>
                            ) : (
                              m.content
                            )}
                          </div>
                        )}

                        {m.products && m.products.length > 0 && (
                          <div className="space-y-2">
                            {m.products.map((p) => (
                              <ProductBubble
                                key={p.reference}
                                product={p}
                                added={has(p.reference)}
                                onAdd={() => {
                                  add(p);
                                  toast.success("Ajouté à votre demande de devis", {
                                    description: p.reference,
                                  });
                                }}
                                onNavigate={() => setOpen(false)}
                              />
                            ))}
                          </div>
                        )}

                        {m.articles && m.articles.length > 0 && (
                          <div className="space-y-2">
                            {m.articles.map((a) => (
                              <ArticleBubble
                                key={a.slug}
                                article={a}
                                onNavigate={() => setOpen(false)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* typing indicator */}
                  {streaming && messages[messages.length - 1]?.content === "" && (
                    <div className="flex items-end gap-2">
                      <Avatar className="size-7" />
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-background px-4 py-3.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className={cn(
                              "size-1.5 rounded-full bg-navy/40",
                              !reduced && "animate-bounce",
                            )}
                            style={{ animationDelay: `${i * 120}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* welcome: quick replies as a 2x2 grid */}
                  {showWelcomeGrid && (
                    <div className="grid grid-cols-2 gap-2 pt-1 pl-9">
                      {QUICK_REPLIES.map((q) => (
                        <button
                          key={q.label}
                          type="button"
                          onClick={() => void send(q.label)}
                          className="group focus-rd flex flex-col items-start gap-2 rounded-xl border border-border bg-background p-3 text-left text-xs font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-rouge/50 hover:shadow-sm"
                        >
                          <span className="flex size-7 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-rouge group-hover:text-white">
                            <q.icon className="size-3.5" />
                          </span>
                          {q.label}
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
                  className="border-t border-border bg-background px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative min-w-0 flex-1">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value.slice(0, 500))}
                        disabled={streaming}
                        maxLength={500}
                        placeholder="Votre question…"
                        aria-label="Message"
                        className="focus-rd w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-rouge/60"
                      />
                      {input.length > 400 && (
                        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[10px] text-muted-foreground">
                          {input.length}/500
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={streaming || !input.trim()}
                      aria-label="Envoyer"
                      className="focus-rd flex size-10 shrink-0 items-center justify-center rounded-full bg-rouge text-white transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
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
                      className="focus-rd inline-flex items-center gap-1 rounded-full border border-[#128C7E]/30 px-2.5 py-1 font-semibold text-[#128C7E] transition-colors duration-300 hover:bg-[#128C7E] hover:text-white"
                    >
                      <MessageCircle className="size-3" />
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
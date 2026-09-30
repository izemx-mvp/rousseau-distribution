import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useQuote } from "@/lib/quote-store";

export function QuoteDrawer() {
  const { items, drawerOpen, setDrawerOpen, remove, setQuantity, clear } = useQuote();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-navy-deep/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Ma demande de devis"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-background shadow-lift outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-2.5">
                <FileText className="size-5 text-rouge" />
                <h2 className="text-lg font-extrabold text-navy">Ma demande de devis</h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Fermer"
                className="focus-rd rounded-md p-1.5 text-navy/60 hover:text-navy"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-slate-ink">
                    Votre demande est vide. Ajoutez des références depuis le catalogue.
                  </p>
                  <Link
                    to="/catalogue"
                    onClick={() => setDrawerOpen(false)}
                    className="focus-rd mt-5 inline-flex items-center gap-2 rounded-lg border border-navy/20 px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-surface"
                  >
                    Parcourir le catalogue
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.reference}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="mono-ref font-bold text-rouge">{item.reference}</span>
                            <p className="mt-1 text-sm font-semibold text-navy">
                              {item.designation}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.brand}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.reference)}
                            aria-label={`Retirer ${item.reference}`}
                            className="focus-rd rounded p-1 text-muted-foreground hover:text-rouge"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.reference, item.quantity - 1)}
                            aria-label="Diminuer la quantité"
                            className="focus-rd rounded-md border border-border p-1.5 text-navy hover:bg-surface"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="mono-ref w-10 text-center font-bold text-navy">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.reference, item.quantity + 1)}
                            aria-label="Augmenter la quantité"
                            className="focus-rd rounded-md border border-border p-1.5 text-navy hover:bg-surface"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <Link
                  to="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className="group focus-rd flex w-full items-center justify-center gap-2 rounded-lg bg-rouge px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-rouge"
                >
                  Envoyer la demande
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="focus-rd mt-3 w-full text-xs font-semibold text-muted-foreground hover:text-rouge"
                >
                  Vider la liste
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

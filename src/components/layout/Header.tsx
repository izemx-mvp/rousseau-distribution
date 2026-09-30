import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { navigation, site, whatsappLink } from "@/config/site";
import { FAMILIES, countByFamily } from "@/data/products";
import { getFamilyImage } from "@/lib/product-image";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const { count, setDrawerOpen } = useQuote();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const counts = countByFamily();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the mobile menu and the catalogue mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Every page opens on a navy hero, so the header is "on dark" until the user scrolls.
  const onDark = !scrolled;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const renderLink = (item: (typeof navigation)[number]) => (
    <Link
      to={item.to}
      className={cn(
        "focus-rd relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
        onDark ? "text-white/80 hover:text-white" : "text-navy/75 hover:text-navy",
        isActive(item.to) && (onDark ? "text-white" : "text-navy"),
      )}
    >
      {item.label}
      {isActive(item.to) && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-3.5 -bottom-0.5 h-[3px] rounded-full bg-rouge"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
    </Link>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass-header" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-rd flex items-center justify-between transition-all duration-300",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo variant={onDark ? "light" : "default"} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {navigation.map((item) => {
              if (item.to !== "/catalogue") {
                return <div key={item.to}>{renderLink(item)}</div>;
              }

              // Catalogue: link + mega-menu with the four families
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                  onFocus={() => setMega(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false);
                  }}
                >
                  {renderLink(item)}
                  <AnimatePresence>
                    {mega && (
                      <div className="absolute top-full left-1/2 z-50 w-[34rem] -translate-x-1/2 pt-3">
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden rounded-xl border border-border bg-background shadow-lift"
                        >
                          <div className="grid grid-cols-2 gap-1 p-2">
                            {FAMILIES.map((f) => (
                              <Link
                                key={f.id}
                                to="/catalogue"
                                search={{ famille: f.id }}
                                onClick={() => setMega(false)}
                                className="group focus-rd flex items-center gap-3 rounded-lg p-2 transition-colors duration-300 hover:bg-surface"
                              >
                                <img
                                  src={getFamilyImage(f.id)}
                                  alt=""
                                  loading="lazy"
                                  decoding="async"
                                  className="size-14 shrink-0 rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span>
                                  <span className="block text-sm font-bold text-navy">
                                    {f.label}
                                  </span>
                                  <span className="mono-ref text-xs text-muted-foreground">
                                    {counts[f.id]} références
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            to="/catalogue"
                            onClick={() => setMega(false)}
                            className="focus-rd group flex items-center justify-between border-t border-border bg-surface px-5 py-3 text-sm font-bold text-navy transition-colors duration-300 hover:text-rouge"
                          >
                            Voir tout le catalogue
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Quote list: visible on every screen size (label hidden on small screens) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Ouvrir la demande de devis (${count} article${count > 1 ? "s" : ""})`}
              className={cn(
                "focus-rd relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                onDark ? "text-white/85 hover:text-white" : "text-navy/80 hover:text-navy",
              )}
            >
              <FileText className="size-4" />
              <span className="hidden md:inline">Ma demande</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 22 }}
                    className="flex size-5 items-center justify-center rounded-full bg-rouge font-mono text-[11px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/contact"
              className="group focus-rd hidden items-center gap-2 rounded-lg bg-rouge px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge sm:inline-flex"
            >
              Demander un devis
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className={cn(
                "focus-rd rounded-md p-2 lg:hidden",
                onDark ? "text-white" : "text-navy",
              )}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto bg-navy-deep lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <img
              src={heroBg}
              alt=""
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep"
              aria-hidden
            />
            <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden />

            <div className="relative flex min-h-full flex-col">
              <div className="container-rd flex h-20 shrink-0 items-center justify-between">
                <Logo variant="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="focus-rd rounded-md p-2 text-white"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav className="container-rd mt-6 flex flex-col" aria-label="Navigation mobile">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "focus-rd flex items-center justify-between border-b border-white/10 py-4 text-2xl font-extrabold transition-colors",
                        isActive(item.to) ? "text-white" : "text-white/75",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {isActive(item.to) && (
                          <span className="h-6 w-1 rounded-full bg-rouge" aria-hidden />
                        )}
                        {item.label}
                      </span>
                      <ArrowRight className="size-5 text-white/30" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="container-rd mt-auto space-y-3 pt-10 pb-8">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setDrawerOpen(true);
                  }}
                  className="focus-rd flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white"
                >
                  <FileText className="size-4" />
                  Ma demande
                  {count > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-rouge font-mono text-[11px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </button>
                <Link
                  to="/contact"
                  className="focus-rd flex w-full items-center justify-center gap-2 rounded-lg bg-rouge px-6 py-4 text-base font-bold text-white"
                >
                  Demander un devis
                  <ArrowRight className="size-4" />
                </Link>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="focus-rd flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white/85"
                  >
                    <Phone className="size-4 text-rouge" />
                    Appeler
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-rd flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white/85"
                  >
                    <MessageCircle className="size-4 text-rouge" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
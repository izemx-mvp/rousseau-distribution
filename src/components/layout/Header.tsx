import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { navigation } from "@/config/site";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setDrawerOpen } = useQuote();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = pathname === "/" && !scrolled;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

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
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "focus-rd relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
                  onDark
                    ? "text-white/80 hover:text-white"
                    : "text-navy/75 hover:text-navy",
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
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Ouvrir la demande de devis (${count} article${count > 1 ? "s" : ""})`}
              className={cn(
                "focus-rd relative hidden items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors sm:inline-flex",
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

      <AnimatePresence>
        {open && (
          <motion.div
            className="blueprint fixed inset-0 z-[70] bg-navy-deep lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-rd relative flex h-20 items-center justify-between">
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
            <nav className="container-rd relative mt-8 flex flex-col gap-1">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                >
                  <Link
                    to={item.to}
                    className="focus-rd block border-b border-white/10 py-4 text-2xl font-extrabold text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-rd relative mt-10">
              <Link
                to="/contact"
                className="focus-rd flex w-full items-center justify-center gap-2 rounded-lg bg-rouge px-6 py-4 text-base font-bold text-white"
              >
                Demander un devis
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

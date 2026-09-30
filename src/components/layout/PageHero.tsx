import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { GearOutline } from "@/components/illustrations/Tech";
import { Swoosh } from "@/components/sections/SectionHeading";

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb: { label: string; to?: string; params?: Record<string, string> }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="blueprint absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 text-white/8">
        <div className="spin-slow">
          <GearOutline strokeWidth={1} />
        </div>
      </div>
      <div className="container-rd relative">
        <motion.nav
          aria-label="Fil d'Ariane"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-1.5 text-xs text-white/55"
        >
          {breadcrumb.map((b, i) => (
            <span key={`${b.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3" />}
              {b.to ? (
                <Link to={b.to} className="focus-rd transition-colors hover:text-white">
                  {b.label}
                </Link>
              ) : (
                <span className="text-white/85">{b.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-4xl leading-[1.05] text-white md:text-6xl"
        >
          {title}
        </motion.h1>
        <Swoosh className="mt-6 w-24" />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

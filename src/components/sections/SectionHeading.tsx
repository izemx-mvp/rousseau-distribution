import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Swoosh({ className, light }: { className?: string; light?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn("block h-1 origin-left", light ? "bg-rouge" : "bg-rouge", className)}
      style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: As = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-bold tracking-[0.18em] uppercase",
            light ? "text-rouge" : "text-rouge",
          )}
        >
          {eyebrow}
        </p>
      )}
      <As
        className={cn(
          "text-3xl leading-[1.08] md:text-[2.75rem]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </As>
      <Swoosh className={cn("mt-5 w-18", align === "center" && "mx-auto")} />
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            light ? "text-white/70" : "text-slate-ink",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

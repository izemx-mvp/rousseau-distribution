import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  BearingOutline,
  BeltOutline,
  BlueprintOutline,
  ChainOutline,
  GearOutline,
  MotorOutline,
} from "@/components/illustrations/Tech";
import { sectors, site } from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/secteurs")({
  head: () => ({
    meta: [
      { title: `Secteurs — ${site.name}` },
      {
        name: "description",
        content:
          "Agroalimentaire, pharmaceutique, industrie manufacturière, emballage, énergie : découvrez les secteurs servis par Rousseau Distribution.",
      },
      { property: "og:title", content: `Secteurs — ${site.name}` },
      {
        property: "og:description",
        content: "Les secteurs industriels accompagnés par Rousseau Distribution.",
      },
    ],
  }),
  component: SecteursPage,
});

const sectorIllustrations = [
  BeltOutline,
  BearingOutline,
  MotorOutline,
  ChainOutline,
  GearOutline,
  BlueprintOutline,
];

function SecteursPage() {
  const [active, setActive] = useState<string>(sectors[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const elements = Object.values(sectionRefs.current).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActive(visible.target.dataset.sectorId ?? active);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHero
        title="Secteurs d'activité"
        subtitle="Des équipes techniques qui comprennent les contraintes propres à chaque industrie."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Secteurs" }]}
      />

      <section className="relative bg-background">
        <div className="container-rd flex gap-12">
          <nav
            aria-label="Navigation des secteurs"
            className="sticky top-28 hidden h-max w-56 shrink-0 py-16 lg:block"
          >
            <p className="mb-4 text-xs font-bold tracking-[0.18em] text-slate-ink uppercase">
              Secteurs
            </p>
            <ul className="space-y-1 border-l border-surface-line">
              {sectors.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "focus-rd -ml-px block border-l-2 py-2 pl-4 text-sm transition-colors duration-300",
                      active === s.id
                        ? "border-rouge font-bold text-rouge"
                        : "border-transparent text-slate-ink hover:text-navy",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1">
            {sectors.map((sector, i) => {
              const Illu = sectorIllustrations[i % sectorIllustrations.length];
              const fromLeft = i % 2 === 0;
              return (
                <SectorSection
                  key={sector.id}
                  sector={sector}
                  Illustration={Illu}
                  fromLeft={fromLeft}
                  odd={i % 2 === 1}
                  registerRef={(el) => {
                    sectionRefs.current[sector.id] = el;
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

function SectorSection({
  sector,
  Illustration,
  fromLeft,
  odd,
  registerRef,
}: {
  sector: (typeof sectors)[number];
  Illustration: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  fromLeft: boolean;
  odd: boolean;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <section
      id={sector.id}
      data-sector-id={sector.id}
      ref={registerRef}
      className={cn("scroll-mt-28 py-16 md:py-20", odd && "bg-surface")}
    >
      <div
        className={cn(
          "grid items-center gap-10 md:grid-cols-2",
          !fromLeft && "md:[&>*:first-child]:order-2",
        )}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, x: fromLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold tracking-[0.18em] text-rouge uppercase">
            Secteur
          </p>
          <h2 className="mt-3 text-3xl leading-tight text-navy md:text-4xl">{sector.label}</h2>
          <span className="swoosh mt-5" />
          <p className="mt-6 text-base leading-relaxed text-slate-ink">{sector.text}</p>

          <RevealGroup className="mt-7 space-y-3" stagger={0.08}>
            {sector.parts.map((part) => (
              <RevealItem key={part} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-rouge/12 text-rouge">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-slate-ink">{part}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Link
            to="/catalogue"
            className="focus-rd group mt-8 inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Voir les références
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: fromLeft ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-sm text-navy"
        >
          <div className="absolute inset-6 opacity-80">
            <Illustration strokeWidth={1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

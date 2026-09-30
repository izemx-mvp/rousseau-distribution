import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import {
  BearingOutline,
  BeltOutline,
  BlueprintOutline,
  ChainOutline,
  GearOutline,
  MotorOutline,
} from "@/components/illustrations/Tech";
import { sectors, site } from "@/config/site";
import { sectorImage } from "@/lib/sector-image";
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
          setActive(visible.target.dataset["sectorId"] ?? active);
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

      <section className="relative overflow-x-clip bg-background">
        {/* Mobile / tablet: horizontal chip navigation */}
        <nav
          aria-label="Navigation des secteurs"
          className="container-rd -mb-4 pt-8 lg:hidden"
        >
          <ul className="flex gap-2 overflow-x-auto pb-2">
            {sectors.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "focus-rd inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold transition-colors duration-300",
                    active === s.id
                      ? "border-rouge bg-rouge text-white"
                      : "border-border bg-background text-navy hover:border-navy/30",
                  )}
                >
                  <img
                    src={sectorImage(s.id)}
                    alt=""
                    loading="lazy"
                    className="size-7 rounded-full object-cover"
                  />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-rd flex gap-12">
          {/* Desktop: sticky scroll-spy navigation with thumbnails */}
          <nav
            aria-label="Navigation des secteurs"
            className="sticky top-28 hidden h-max w-64 shrink-0 py-16 lg:block"
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
                      "focus-rd -ml-px flex items-center gap-3 border-l-2 py-2 pl-3 text-sm transition-colors duration-300",
                      active === s.id
                        ? "border-rouge font-bold text-rouge"
                        : "border-transparent text-slate-ink hover:text-navy",
                    )}
                  >
                    <img
                      src={sectorImage(s.id)}
                      alt=""
                      loading="lazy"
                      className={cn(
                        "size-8 rounded-md object-cover transition-all duration-300",
                        active === s.id ? "opacity-100 ring-2 ring-rouge" : "opacity-60 grayscale",
                      )}
                    />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 divide-y divide-border">
            {sectors.map((sector, i) => (
              <SectorSection
                key={sector.id}
                sector={sector}
                Illustration={sectorIllustrations[i % sectorIllustrations.length]!}
                fromLeft={i % 2 === 0}
                registerRef={(el) => {
                  sectionRefs.current[sector.id] = el;
                }}
              />
            ))}
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
  registerRef,
}: {
  sector: (typeof sectors)[number];
  Illustration: ComponentType<{ className?: string; strokeWidth?: number }>;
  fromLeft: boolean;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <section
      id={sector.id}
      data-sector-id={sector.id}
      ref={registerRef}
      className="scroll-mt-28 py-16 md:py-24"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: fromLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={fromLeft ? "md:order-1" : "md:order-2"}
        >
          <h2 className="text-3xl leading-tight text-navy md:text-4xl">{sector.label}</h2>
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/catalogue"
              className="focus-rd group inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Voir les références
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="focus-rd inline-flex items-center gap-2 rounded-lg border border-navy/20 px-6 py-3.5 text-sm font-bold text-navy transition-colors duration-300 hover:border-rouge/40 hover:text-rouge"
            >
              Demander un devis
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: fromLeft ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className={cn("relative order-first", fromLeft ? "md:order-2" : "md:order-1")}
        >
          {/* faint outline illustration peeking behind the image */}
          <div
            className={cn(
              "pointer-events-none absolute -top-10 w-40 text-navy/10",
              fromLeft ? "-right-6" : "-left-6",
            )}
            aria-hidden
          >
            <Illustration strokeWidth={1} />
          </div>

          {/* offset red frame */}
          <span
            className={cn(
              "absolute -bottom-3 h-full w-full rounded-2xl border-2 border-rouge/35",
              fromLeft ? "-right-3" : "-left-3",
            )}
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-2xl shadow-lift">
            <ParallaxImage
              src={sectorImage(sector.id)}
              alt={`Illustration du secteur ${sector.label}`}
              className="aspect-[4/3]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-6 text-sm leading-relaxed text-white/85">
              {sector.caption}
            </p>
            <motion.span
              className="absolute top-0 left-0 h-[3px] w-full origin-left bg-rouge"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
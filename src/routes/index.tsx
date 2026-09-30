import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Boxes,
  Factory,
  Globe2,
  Headphones,
  Layers,
  Search,
  Timer,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BearingOutline, GearOutline, Illustration } from "@/components/illustrations/Tech";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SectionHeading, Swoosh } from "@/components/sections/SectionHeading";
import { sectors, site } from "@/config/site";
import { posts } from "@/data/posts";
import { countByFamily, FAMILIES, type ProductFamily } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Pièces de rechange industrielles, livrées sans temps d'arrêt` },
      {
        name: "description",
        content:
          "Distributeur de pièces de rechange industrielles : roulements, courroies, moteurs électriques et transmission mécanique. Sourcing international, conseil technique, devis rapide.",
      },
      {
        property: "og:title",
        content: `${site.name} — Pièces de rechange industrielles`,
      },
      {
        property: "og:description",
        content:
          "Roulements, courroies, moteurs et transmission mécanique. Des milliers de références et un accompagnement technique pour limiter vos arrêts de production.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const figureIcons = { boxes: Boxes, factory: Factory, award: Award, truck: Truck } as const;

const familyIllustration: Record<ProductFamily, "bearing" | "belt" | "motor" | "chain"> = {
  roulements: "bearing",
  courroies: "belt",
  moteurs: "motor",
  transmission: "chain",
};

const reasons = [
  {
    icon: Layers,
    title: "Large stock de références",
    text: "Roulements, courroies, moteurs et organes de transmission : les familles les plus demandées en maintenance industrielle.",
  },
  {
    icon: Timer,
    title: "Réactivité",
    text: "Une demande, une réponse claire. Nous traitons les recherches de référence sans allers-retours inutiles.",
  },
  {
    icon: Globe2,
    title: "Sourcing international",
    text: "Un réseau de fabricants et de fournisseurs en Europe et en Asie pour couvrir les pièces difficiles à trouver.",
  },
  {
    icon: Headphones,
    title: "Conseil technique",
    text: "Nous vous aidons à identifier la pièce à partir d'une plaque, d'une photo ou des caractéristiques de la machine.",
  },
];

const searchExamples = ["6205-2RS", "Courroie SPB 1600", "Moteur 3 kW IE3", "Chaîne 08B-1"];

function TypingSearch() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(searchExamples[0]!);
      return;
    }
    const target = searchExamples[index % searchExamples.length]!;
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const type = () => {
      setText(target.slice(0, i));
      i++;
      if (i <= target.length) {
        timeout = setTimeout(type, 70);
      } else {
        timeout = setTimeout(() => setIndex((n) => n + 1), 1900);
      }
    };
    type();
    return () => clearTimeout(timeout);
  }, [index, reduced]);

  return (
    <span className="mono-ref text-navy">
      {text}
      <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-rouge" />
    </span>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const line = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-deep pt-24 pb-16">
      <div className="blueprint absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_35%,oklch(0.585_0.232_27.5/0.22),transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 -left-32 w-[36rem] text-white/7">
        <div className="spin-slow">
          <GearOutline strokeWidth={0.9} />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-48 -bottom-56 w-[44rem] text-white/6">
        <div className="spin-slower">
          <BearingOutline strokeWidth={0.9} />
        </div>
      </div>

      <div className="container-rd relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            {...line(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide text-white/85 uppercase"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-rouge opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-rouge" />
            </span>
            {site.baseline}
          </motion.span>

          <h1 className="mt-7 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-white">
            <motion.span className="block" {...line(0.1)}>
              Vos pièces industrielles,
            </motion.span>
            <motion.span className="block" {...line(0.2)}>
              livrées{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-rouge">sans temps d'arrêt</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-rouge/25"
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              .
            </motion.span>
          </h1>

          <motion.p
            {...line(0.35)}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Des milliers de références en roulements, courroies, moteurs électriques et transmission
            mécanique. Sourcing international et conseil technique pour identifier la bonne pièce du
            premier coup.
          </motion.p>

          <motion.div {...line(0.45)} className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group focus-rd inline-flex items-center gap-2 rounded-lg bg-rouge px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge"
            >
              Demander un devis
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/catalogue"
              className="focus-rd inline-flex items-center gap-2 rounded-lg border border-white/35 px-6 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
            >
              Parcourir le catalogue
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div className="float-y">
            <Link
              to="/catalogue"
              className="focus-rd block rounded-2xl border border-white/15 bg-white p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Recherche rapide
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3.5">
                <Search className="size-4 shrink-0 text-rouge" />
                <span className="truncate text-sm text-muted-foreground">
                  Rechercher une référence, une marque, une machine…
                </span>
              </div>
              <div className="mt-3 rounded-lg bg-navy/4 px-4 py-3">
                <TypingSearch />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Roulements", "Courroies", "Moteurs"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-navy"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-rouge">
                Ouvrir le catalogue <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <motion.span
            className="size-1 rounded-full bg-white/70"
            animate={reduced ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const list = [...site.brands, ...site.brands];
  return (
    <section className="border-y border-border bg-background py-7">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max gap-14 group-hover:[animation-play-state:paused]">
          {list.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="text-lg font-extrabold tracking-tight whitespace-nowrap text-navy/25"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Figures() {
  return (
    <section className="bg-navy">
      <div className="blueprint relative">
        <div className="container-rd relative grid divide-y divide-white/10 py-4 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {site.figures.map((f) => {
            const Icon = figureIcons[f.icon as keyof typeof figureIcons] ?? Boxes;
            return (
              <Reveal key={f.label} className="flex items-center gap-4 px-2 py-8 lg:px-8">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/8 text-rouge">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-mono text-2xl font-bold text-white md:text-3xl">
                    <CountUp value={f.value} suffix={f.suffix} />
                  </span>
                  <span className="text-sm text-white/60">{f.label}</span>
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Families() {
  const counts = countByFamily();
  return (
    <section className="section-y bg-surface">
      <div className="container-rd">
        <SectionHeading
          eyebrow="Catalogue"
          title="Familles de produits"
          intro="Quatre familles couvrant l'essentiel des organes mécaniques et électriques sollicités en production."
        />
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {FAMILIES.map((f) => (
            <RevealItem key={f.id}>
              <Link
                to="/catalogue"
                search={{ famille: f.id }}
                className="card-rd group focus-rd flex h-full flex-col p-8"
              >
                <span className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 -translate-x-6 rotate-12 bg-rouge/6 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                <div className="relative size-20 text-navy/30 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
                  <Illustration name={familyIllustration[f.id]} strokeWidth={1.3} />
                </div>
                <h3 className="relative mt-6 text-2xl text-navy">{f.label}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-ink">
                  {f.description}
                </p>
                <div className="relative mt-6 flex items-center justify-between pt-4">
                  <span className="mono-ref font-bold text-rouge">
                    {counts[f.id]} références
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy">
                    Voir la famille
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section-y bg-background">
      <div className="container-rd grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Pourquoi nous"
            title={`Pourquoi ${site.name}`}
            intro="Un interlocuteur technique qui connaît les pièces, pas seulement un catalogue en ligne."
          />
        </div>
        <RevealGroup className="relative space-y-3 lg:pl-8" stagger={0.1}>
          <span className="absolute top-0 bottom-0 left-0 hidden w-px bg-border lg:block" />
          {reasons.map((r) => (
            <RevealItem key={r.title}>
              <div className="group flex gap-5 rounded-xl border border-transparent p-5 transition-colors duration-300 hover:border-border hover:bg-surface">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy text-white transition-colors duration-300 group-hover:bg-rouge">
                  <r.icon className="size-5" />
                </span>
                <span>
                  <h3 className="text-lg text-navy">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-ink">{r.text}</p>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="blueprint absolute inset-0" />
      <div className="container-rd relative section-y">
        <SectionHeading
          tone="light"
          eyebrow="Secteurs"
          title="Des industries aux contraintes très différentes"
          intro="Nous fournissons des pièces de rechange à des sites de production de tous secteurs."
        />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {sectors.map((s) => (
            <RevealItem key={s.id}>
              <Link
                to="/secteurs"
                hash={s.id}
                className="focus-rd group block h-full rounded-xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-rouge hover:bg-white/8"
              >
                <h3 className="text-lg font-bold text-white">{s.label}</h3>
                <Swoosh className="mt-3 w-10" />
                <p className="mt-4 text-sm leading-relaxed text-white/60">{s.caption}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function LatestPosts() {
  const latest = [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <section className="section-y bg-surface">
      <div className="container-rd">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Blog"
            title="Derniers articles"
            intro="Guides techniques et conseils de maintenance pour choisir, contrôler et remplacer vos pièces."
          />
          <Link
            to="/blog"
            className="group focus-rd inline-flex items-center gap-2 text-sm font-bold text-navy"
          >
            Voir tous les articles
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {latest.map((p) => (
            <RevealItem key={p.slug} className="relative">
              <PostCard post={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Marquee />
      <Figures />
      <Families />
      <Why />
      <Sectors />
      <HowItWorks />
      <LatestPosts />
      <CtaBand />
    </>
  );
}

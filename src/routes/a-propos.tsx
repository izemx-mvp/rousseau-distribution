import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Award, HeartHandshake, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Swoosh } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import {
  BearingOutline,
  BeltOutline,
  ChainOutline,
  GearOutline,
} from "@/components/illustrations/Tech";
import { site } from "@/config/site";

import aboutWarehouse from "@/assets/about-warehouse.png";
import familyRoulements from "@/assets/family-roulements.png";
import sectorIndustrie from "@/assets/sector-industrie.png";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: `À propos — ${site.name}` },
      {
        name: "description",
        content:
          "Découvrez Rousseau Distribution : notre mission, nos valeurs et notre approche du sourcing de pièces de rechange industrielles.",
      },
      { property: "og:title", content: `À propos — ${site.name}` },
      {
        property: "og:description",
        content:
          "Notre mission, nos valeurs et notre approche du sourcing international de pièces industrielles.",
      },
    ],
  }),
  component: AProposPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Fiabilité",
    text: "Des références identifiées avec rigueur et des pièces contrôlées avant expédition.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    text: "Une équipe disponible pour répondre rapidement à vos demandes urgentes.",
  },
  {
    icon: Award,
    title: "Expertise technique",
    text: "Une connaissance approfondie des organes mécaniques et électriques industriels.",
  },
  {
    icon: HeartHandshake,
    title: "Proximité client",
    text: "Un interlocuteur unique qui suit votre dossier de la demande à la livraison.",
  },
];

const flow = [
  { label: "Fabricants", icon: GearOutline },
  { label: "Sourcing international", icon: BeltOutline },
  { label: "Contrôle", icon: BearingOutline },
  { label: "Livraison client", icon: ChainOutline },
];

/** Seconds the red marker takes to travel along the sourcing line. */
const FLOW_DURATION = 1.8;

function AProposPage() {
  const reduced = useReducedMotion();

  return (
    <div>
      <PageHero
        title="À propos de Rousseau Distribution"
        subtitle="Distributeur de pièces de rechange industrielles, engagé aux côtés des équipes maintenance."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "À propos" }]}
      />

      {/* ------------------------------------------------------------ */}
      {/* Presentation: photo collage                                   */}
      {/* ------------------------------------------------------------ */}
      <section className="section-y overflow-x-clip bg-background">
        <div className="container-rd grid items-center gap-16 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Présentation"
              title="Un partenaire technique pour vos pièces de rechange"
              align="left"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-ink">
              <p>
                Rousseau Distribution accompagne les services maintenance et achats dans
                l'identification et l'approvisionnement de pièces industrielles : roulements,
                courroies, moteurs électriques et organes de transmission mécanique.
              </p>
              <p>
                Notre rôle est de simplifier une tâche souvent complexe : retrouver la bonne
                référence, dans le bon délai, avec un interlocuteur capable de comprendre votre
                contrainte technique.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md pb-10 md:pb-0">
            {/* faint gear behind the collage */}
            <div
              className="pointer-events-none absolute -top-16 -left-16 w-64 text-navy/10"
              aria-hidden
            >
              <div className="spin-slow">
                <GearOutline strokeWidth={0.9} />
              </div>
            </div>

            <div className="relative">
              <span
                className="absolute -right-3 -bottom-3 h-full w-full rounded-xl border-2 border-rouge/35"
                aria-hidden
              />
              <ParallaxImage
                src={aboutWarehouse}
                alt="Allée d'entrepôt avec étagères de pièces de rechange"
                className="relative aspect-[4/5] rounded-xl shadow-lift"
              />

              {/* product render peeking out of the corner */}
              <div className="absolute -bottom-8 -left-4 w-32 overflow-hidden rounded-xl border-4 border-background shadow-lift md:-left-10 md:w-40">
                <img
                  src={familyRoulements}
                  alt="Roulement à billes en coupe"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute bottom-0 left-0 h-[3px] w-full bg-rouge" />
              </div>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-6 -right-2 rounded-xl border border-surface-line bg-background px-5 py-4 text-center shadow-lift md:-right-8"
              >
                <p className="font-mono text-2xl font-bold text-navy">
                  Depuis {site.foundingYear}
                </p>
                <p className="mt-1 text-xs tracking-wide text-slate-ink uppercase">
                  Au service de l'industrie
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Mission statement band                                        */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-deep">
        <img
          src={sectorIndustrie}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy-deep/85" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-transparent"
          aria-hidden
        />
        <div className="blueprint absolute inset-0 opacity-50" aria-hidden />
        <div className="container-rd relative py-24 md:py-32">
          <Reveal>
            <Swoosh className="w-14" />
            <p className="mt-7 max-w-4xl text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.15] font-extrabold tracking-tight text-white">
              Retrouver la bonne référence, dans le bon délai, avec un interlocuteur qui comprend
              votre contrainte technique.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Values                                                        */}
      {/* ------------------------------------------------------------ */}
      <section className="section-y bg-surface">
        <div className="container-rd">
          <SectionHeading
            eyebrow="Mission & valeurs"
            title="Ce qui guide notre travail au quotidien"
            align="center"
            className="mx-auto"
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {values.map((v) => (
              <RevealItem key={v.title} className="h-full">
                <div className="card-rd group relative h-full overflow-hidden p-7">
                  <span className="absolute top-0 left-0 h-[3px] w-0 bg-rouge transition-all duration-500 group-hover:w-full" />
                  <v.icon
                    className="pointer-events-none absolute -right-4 -bottom-4 size-28 text-navy/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    strokeWidth={1.2}
                    aria-hidden
                  />
                  <div className="relative flex size-12 items-center justify-center rounded-lg bg-navy text-white transition-colors duration-300 group-hover:bg-rouge">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="relative mt-5 text-lg text-navy">{v.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-ink">
                    {v.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Sourcing flow: a red marker travels along the line            */}
      {/* ------------------------------------------------------------ */}
      <section className="section-y relative overflow-hidden bg-navy-deep">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,oklch(0.585_0.232_27.5/0.18),transparent_70%)]"
          aria-hidden
        />
        <div className="container-rd relative">
          <SectionHeading
            tone="light"
            eyebrow="Approche sourcing"
            title="Du fabricant à votre site industriel"
            intro="Nous mobilisons un réseau de sourcing international — notamment en Asie, dont la Chine — associé à des contrôles avant expédition, pour vous livrer la bonne pièce."
            align="center"
            className="mx-auto"
          />

          <div className="relative mt-20">
            {/* line + traveling marker (desktop) */}
            <div
              aria-hidden
              className="absolute top-9 right-[12.5%] left-[12.5%] hidden h-px md:block"
            >
              <motion.span
                className="absolute inset-0 origin-left bg-white/25"
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: FLOW_DURATION, ease: "linear" }}
              />
              {!reduced && (
                <motion.span
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rouge shadow-rouge"
                  initial={{ left: "0%", opacity: 0 }}
                  whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: FLOW_DURATION, ease: "linear" }}
                />
              )}
            </div>

            <div className="grid gap-10 md:grid-cols-4">
              {flow.map((step, i) => (
                <motion.div
                  key={step.label}
                  className="flex flex-col items-center text-center"
                  initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: (i / (flow.length - 1)) * FLOW_DURATION,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative z-10 flex size-[72px] items-center justify-center rounded-full border border-white/20 bg-navy text-rouge shadow-soft">
                    <div className="size-9">
                      <step.icon strokeWidth={1.4} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-bold text-white">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CtaBand />
    </div>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Award, HeartHandshake, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  BearingOutline,
  BeltOutline,
  ChainOutline,
  GearOutline,
  MotorOutline,
} from "@/components/illustrations/Tech";
import { site } from "@/config/site";

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

function AProposPage() {
  const reduced = useReducedMotion();

  return (
    <div>
      <PageHero
        title="À propos de Rousseau Distribution"
        subtitle="Distributeur de pièces de rechange industrielles, engagé aux côtés des équipes maintenance."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "À propos" }]}
      />

      <section className="section-y bg-background">
        <div className="container-rd grid items-center gap-14 md:grid-cols-2">
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

          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-sm text-navy">
              <div className="absolute inset-0 spin-slow opacity-20">
                <GearOutline strokeWidth={0.8} />
              </div>
              <div className="absolute inset-10 opacity-40">
                <BearingOutline strokeWidth={1} />
              </div>
              <div className="absolute inset-24 spin-slower opacity-70 text-rouge">
                <MotorOutline strokeWidth={1.2} />
              </div>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-6 left-1/2 w-56 -translate-x-1/2 rounded-xl border border-surface-line bg-background p-5 text-center shadow-lift"
              >
                <p className="font-mono text-3xl font-bold text-navy">
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
              <RevealItem key={v.title}>
                <div className="card-rd h-full p-7">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-navy/8 text-navy">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-ink">{v.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-y bg-background overflow-hidden">
        <div className="container-rd">
          <SectionHeading
            eyebrow="Approche sourcing"
            title="Du fabricant à votre site industriel"
            intro="Nous mobilisons un réseau de sourcing international — notamment en Asie, dont la Chine — associé à des contrôles avant expédition, pour vous livrer la bonne pièce."
            align="center"
            className="mx-auto"
          />

          <div className="relative mt-16">
            <motion.div
              aria-hidden
              className="absolute top-9 right-[8%] left-[8%] hidden h-px bg-navy/20 md:block"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
            <div className="grid gap-10 md:grid-cols-4">
              {flow.map((step, i) => (
                <motion.div
                  key={step.label}
                  className="flex flex-col items-center text-center"
                  initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative z-10 flex size-[72px] items-center justify-center rounded-full border border-navy/15 bg-background text-navy shadow-soft">
                    <div className="size-9">
                      <step.icon strokeWidth={1.4} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-bold text-navy">{step.label}</p>
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

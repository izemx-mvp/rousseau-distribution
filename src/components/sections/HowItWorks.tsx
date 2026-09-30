import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Vous nous contactez",
    text: "Référence, photo de la plaque, plan ou simple description de la machine : tout point de départ est exploitable.",
  },
  {
    n: "02",
    title: "Nous identifions la référence",
    text: "Nos techniciens recoupent les caractéristiques et proposent la pièce d'origine ou son équivalence.",
  },
  {
    n: "03",
    title: "Nous livrons",
    text: "Nous confirmons la disponibilité, les conditions et organisons l'expédition vers votre site.",
  },
];

export function HowItWorks({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <section className={className ?? "section-y bg-background"}>
      <div className="container-rd">
        <SectionHeading
          eyebrow="Méthode"
          title="Comment ça marche"
          intro="Trois étapes, de la demande à la livraison."
        />

        <div className="relative mt-14">
          <motion.div
            aria-hidden
            className="absolute top-8 right-8 left-8 hidden border-t border-dashed border-navy/25 md:block"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          <RevealGroup className="grid gap-8 md:grid-cols-3" stagger={0.14}>
            {steps.map((s) => (
              <RevealItem key={s.n} className="relative">
                <div className="flex size-16 items-center justify-center rounded-full border border-navy/15 bg-background font-mono text-lg font-bold text-navy shadow-soft">
                  {s.n}
                </div>
                <h3 className="mt-6 text-xl text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-ink">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

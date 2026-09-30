import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BearingOutline } from "@/components/illustrations/Tech";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappLink } from "@/config/site";

export function CtaBand({
  title = "Vous ne trouvez pas votre pièce ?",
  text = "Envoyez-nous une référence, une photo ou la marque de votre machine : nous identifions la pièce et revenons vers vous avec une proposition.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-rouge">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,var(--rouge-deep),var(--rouge)_55%,var(--navy))] opacity-95" />
      <div className="pointer-events-none absolute -right-20 -bottom-24 hidden w-[28rem] text-white/12 md:block">
        <div className="spin-slow">
          <BearingOutline strokeWidth={1} />
        </div>
      </div>
      <div className="container-rd relative py-20 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl leading-tight text-white md:text-[2.6rem]">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group focus-rd inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Demander un devis
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-rd inline-flex items-center gap-2 rounded-lg border border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/12"
            >
              <MessageCircle className="size-4" />
              Écrire sur WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

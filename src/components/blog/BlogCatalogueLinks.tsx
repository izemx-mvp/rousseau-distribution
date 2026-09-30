import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FAMILIES, countByFamily } from "@/data/products";
import { getFamilyImage } from "@/lib/product-image";

/** Internal-linking block: sends blog readers to the matching catalogue family. */
export function BlogCatalogueLinks() {
  const counts = countByFamily();

  return (
    <section className="section-y bg-surface">
      <div className="container-rd">
        <SectionHeading
          eyebrow="Catalogue"
          title="Retrouvez les pièces citées dans nos guides"
          intro="Roulements, courroies, moteurs et transmission : parcourez les références par famille."
        />
        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.08}>
          {FAMILIES.map((f) => (
            <RevealItem key={f.id} className="h-full">
              <Link
                to="/catalogue"
                search={{ famille: f.id }}
                className="focus-rd group relative block aspect-[4/3] overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={getFamilyImage(f.id)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />
                <span className="absolute top-0 left-0 h-[3px] w-0 bg-rouge transition-all duration-500 group-hover:w-full" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <span>
                    <span className="block text-sm leading-tight font-bold text-white md:text-base">
                      {f.label}
                    </span>
                    <span className="mono-ref text-xs text-white/70">
                      {counts[f.id]} références
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
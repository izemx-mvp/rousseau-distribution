import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { AddToQuoteButton, ProductCard } from "@/components/catalogue/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Illustration, type IllustrationName } from "@/components/illustrations/Tech";
import { whatsappLink } from "@/config/site";
import { FAMILIES, getProduct, products, type ProductFamily } from "@/data/products";
import { cn } from "@/lib/utils";

const familyIllustration: Record<ProductFamily, IllustrationName> = {
  roulements: "bearing",
  courroies: "belt",
  moteurs: "motor",
  transmission: "chain",
};

export const Route = createFileRoute("/catalogue/$reference")({
  head: ({ params }) => {
    const decoded = decodeURIComponent(params.reference);
    const product = getProduct(decoded);
    if (!product) {
      return {
        meta: [
          { title: "Référence introuvable | Rousseau Distribution" },
          { name: "description", content: "Cette référence n'existe pas dans notre catalogue." },
        ],
      };
    }
    const title = `${product.reference} — ${product.designation} | Rousseau Distribution`;
    const description = `${product.designation} (${product.brand}). ${product.description}`.slice(0, 220);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { reference } = Route.useParams();
  const decoded = decodeURIComponent(reference);
  const product = getProduct(decoded);

  if (!product) {
    return <NotFoundState reference={decoded} />;
  }

  const family = FAMILIES.find((f) => f.id === product.family);
  const similar = products
    .filter((p) => p.family === product.family && p.reference !== product.reference)
    .slice(0, 4);

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-10 md:pt-36">
        <div className="blueprint absolute inset-0" />
        <div className="container-rd relative">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
            <Link to="/" className="focus-rd hover:text-white">
              Accueil
            </Link>
            <span>/</span>
            <Link to="/catalogue" className="focus-rd hover:text-white">
              Catalogue
            </Link>
            {family && (
              <>
                <span>/</span>
                <Link to="/catalogue" search={{ famille: family.id }} className="focus-rd hover:text-white">
                  {family.label}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="mono-ref text-white/85">{product.reference}</span>
          </nav>
        </div>
      </section>

      <section className="section-y !pt-12">
        <div className="container-rd grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ParallaxPanel family={product.family} />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="mono-ref rounded bg-rouge/10 px-3 py-1 font-bold text-rouge">
                {product.reference}
              </span>
              {family && (
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy/70">
                  {family.label}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl leading-tight text-navy md:text-4xl">{product.designation}</h1>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              Marque : <span className="text-navy">{product.brand}</span> · Sous-catégorie :{" "}
              <span className="text-navy">{product.subcategory}</span>
            </p>

            <p className="mt-6 text-base leading-relaxed text-slate-ink">{product.description}</p>

            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? "bg-background" : "bg-surface/60"}>
                      <th
                        scope="row"
                        className="w-1/2 px-4 py-3 text-left font-semibold text-muted-foreground"
                      >
                        {spec.label}
                      </th>
                      <td className="px-4 py-3 font-semibold text-navy">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <AddToQuoteButton product={product} />
              <a
                href={whatsappLink(`Bonjour, je recherche la référence ${product.reference} …`)}
                target="_blank"
                rel="noreferrer"
                className="focus-rd inline-flex items-center gap-2 rounded-lg border border-navy/20 px-4 py-2.5 text-sm font-bold text-navy transition-colors duration-300 hover:border-rouge/40 hover:text-rouge"
              >
                <MessageCircle className="size-4" />
                Demander via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section-y !py-14 bg-surface/50">
          <div className="container-rd">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl leading-tight text-navy md:text-3xl">Références similaires</h2>
              {family && (
                <Link
                  to="/catalogue"
                  search={{ famille: family.id }}
                  className="focus-rd hidden items-center gap-1 text-sm font-bold text-navy sm:inline-flex"
                >
                  Voir tout
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
            <div className="mt-7 -mx-1 flex snap-x gap-5 overflow-x-auto pb-2 px-1">
              {similar.map((p) => (
                <div key={p.reference} className="w-72 shrink-0 snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </div>
  );
}

function ParallaxPanel({ family }: { family: ProductFamily }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: relX * 18, y: relY * 18 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn(
        "blueprint-light flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface p-16",
      )}
    >
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="size-full text-navy/25"
      >
        <Illustration name={familyIllustration[family]} strokeWidth={1} />
      </motion.div>
    </div>
  );
}

function NotFoundState({ reference }: { reference: string }) {
  return (
    <div className="container-rd flex min-h-[60vh] flex-col items-center justify-center py-32 text-center">
      <span className="mono-ref rounded bg-rouge/10 px-3 py-1 font-bold text-rouge">{reference}</span>
      <h1 className="mt-6 text-3xl font-bold text-navy md:text-4xl">Référence introuvable</h1>
      <p className="mt-3 max-w-md text-base text-slate-ink">
        Cette référence ne figure pas (ou plus) dans notre catalogue. Vérifiez l'orthographe ou
        contactez-nous : nous vous aiderons à l'identifier.
      </p>
      <Link
        to="/catalogue"
        className="focus-rd mt-8 inline-flex items-center gap-2 rounded-lg bg-rouge px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge"
      >
        <ArrowLeft className="size-4" />
        Retour au catalogue
      </Link>
    </div>
  );
}

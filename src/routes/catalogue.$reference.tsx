import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ScanSearch,
} from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { AddToQuoteButton, ProductCard } from "@/components/catalogue/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { whatsappLink } from "@/config/site";
import { FAMILIES, getProduct, products, type Product } from "@/data/products";
import { getFamilyImage, getProductImage } from "@/lib/product-image";
import { cn } from "@/lib/utils";
import catalogueEmpty from "@/assets/catalogue-empty.png";

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
    const description = `${product.designation} (${product.brand}). ${product.description}`.slice(
      0,
      220,
    );
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
    .slice(0, 6);

  const facts = [
    { label: "Marque", value: product.brand },
    { label: "Famille", value: family?.label ?? "—" },
    { label: "Sous-catégorie", value: product.subcategory },
  ];

  return (
    <div className="bg-background">
      {/* Breadcrumb band with the family render as a faint backdrop */}
      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-10 md:pt-36">
        <img
          src={getFamilyImage(product.family)}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/40"
          aria-hidden
        />
        <div className="blueprint absolute inset-0" aria-hidden />
        <div className="container-rd relative">
          <nav
            aria-label="Fil d'Ariane"
            className="flex flex-wrap items-center gap-1.5 text-xs text-white/55"
          >
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
                <Link
                  to="/catalogue"
                  search={{ famille: family.id }}
                  className="focus-rd hover:text-white"
                >
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
        <div className="container-rd grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <ProductVisual product={product} />

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

            <h1 className="mt-4 text-3xl leading-tight text-navy md:text-4xl">
              {product.designation}
            </h1>

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-lg border border-border bg-surface/60 px-4 py-3"
                >
                  <dt className="text-[11px] font-semibold text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 text-sm leading-snug font-bold text-navy">{f.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-base leading-relaxed text-slate-ink">{product.description}</p>

            <h2 className="mt-8 flex items-center gap-3 text-lg text-navy">
              <span className="h-5 w-1 rounded-full bg-rouge" aria-hidden />
              Caractéristiques techniques
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={i % 2 === 0 ? "bg-background" : "bg-surface/60"}
                    >
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

            <div className="mt-8 flex gap-4 rounded-xl border border-border bg-surface/60 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                <ScanSearch className="size-5" />
              </span>
              <p className="text-sm leading-relaxed text-slate-ink">
                <strong className="text-navy">Un doute sur la référence ?</strong> Envoyez-nous la
                plaque ou une photo de la pièce, nous vous aidons à l'identifier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <SimilarCarousel items={similar} familyId={family?.id} />
      )}

      <CtaBand />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product visual: real product photo if available, family render else */
/* ------------------------------------------------------------------ */

function ProductVisual({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { src, specific } = getProductImage(product);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: relX * 18, y: relY * 18 });
  };

  return (
    <div className="lg:sticky lg:top-28">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setOffset({ x: 0, y: 0 })}
        className={cn(
          "relative aspect-square overflow-hidden rounded-2xl border border-border",
          specific ? "blueprint-light bg-surface" : "bg-navy-deep",
        )}
      >
        <motion.img
          src={src}
          alt={`${product.designation} — ${product.reference}`}
          decoding="async"
          animate={{ x: offset.x, y: offset.y }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className={cn(
            "absolute inset-0 size-full",
            specific ? "object-contain p-10" : "scale-110 object-cover",
          )}
        />
        {!specific && (
          <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent" />
        )}
        <span className="mono-ref absolute top-4 left-4 rounded-md bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-sm">
          {product.brand}
        </span>
        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-rouge" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Image illustrative, non contractuelle.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Similar references with arrow controls                              */
/* ------------------------------------------------------------------ */

function SimilarCarousel({ items, familyId }: { items: Product[]; familyId?: string | undefined }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="section-y bg-surface/50 !py-14">
      <div className="container-rd">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl leading-tight text-navy md:text-3xl">Références similaires</h2>
          <div className="flex items-center gap-3">
            {familyId && (
              <Link
                to="/catalogue"
                search={{ famille: familyId as never }}
                className="focus-rd hidden items-center gap-1 text-sm font-bold text-navy sm:inline-flex"
              >
                Voir tout
                <ArrowRight className="size-4" />
              </Link>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Références précédentes"
                className="focus-rd flex size-10 items-center justify-center rounded-lg border border-border bg-background text-navy transition-colors duration-300 hover:border-rouge hover:bg-rouge hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Références suivantes"
                className="focus-rd flex size-10 items-center justify-center rounded-lg border border-border bg-background text-navy transition-colors duration-300 hover:border-rouge hover:bg-rouge hover:text-white"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={trackRef}
          className="-mx-1 mt-7 flex snap-x gap-5 overflow-x-auto px-1 pb-2"
        >
          {items.map((p) => (
            <div key={p.reference} className="w-72 shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Not found                                                           */
/* ------------------------------------------------------------------ */

function NotFoundState({ reference }: { reference: string }) {
  return (
    <div className="container-rd flex min-h-[60vh] flex-col items-center justify-center py-32 text-center">
      <img
        src={catalogueEmpty}
        alt=""
        decoding="async"
        className="size-36 rounded-2xl object-cover shadow-lift"
      />
      <span className="mono-ref mt-8 rounded bg-rouge/10 px-3 py-1 font-bold text-rouge">
        {reference}
      </span>
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
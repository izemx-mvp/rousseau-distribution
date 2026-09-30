import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { Illustration, type IllustrationName } from "@/components/illustrations/Tech";
import type { Product, ProductFamily } from "@/data/products";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

const familyIllustration: Record<ProductFamily, IllustrationName> = {
  roulements: "bearing",
  courroies: "belt",
  moteurs: "motor",
  transmission: "chain",
};

const familyLabel: Record<ProductFamily, string> = {
  roulements: "Roulements",
  courroies: "Courroies",
  moteurs: "Moteurs",
  transmission: "Transmission",
};

export function AddToQuoteButton({
  product,
  className,
  size = "default",
}: {
  product: Pick<Product, "reference" | "designation" | "brand">;
  className?: string;
  size?: "default" | "sm";
}) {
  const { add, has } = useQuote();
  const added = has(product.reference);

  return (
    <button
      type="button"
      onClick={() => {
        if (added) return;
        add({
          reference: product.reference,
          designation: product.designation,
          brand: product.brand,
        });
        toast.success("Ajouté à votre demande de devis", { description: product.reference });
      }}
      aria-label={`Ajouter ${product.reference} à la demande de devis`}
      className={cn(
        "focus-rd inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-300",
        size === "sm" ? "px-3.5 py-2 text-xs" : "px-4 py-2.5 text-sm",
        added
          ? "bg-navy/8 text-navy"
          : "bg-rouge text-white hover:-translate-y-0.5 hover:shadow-rouge",
        className,
      )}
    >
      {added ? <Check className="size-4" /> : <Plus className="size-4" />}
      {added ? "Ajouté" : "Demander un devis"}
    </button>
  );
}

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const illo = familyIllustration[product.family];

  if (view === "list") {
    return (
      <article className="card-rd flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-surface text-navy/45">
          <Illustration name={illo} className="size-11" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-ref rounded bg-rouge/10 px-2 py-0.5 font-bold text-rouge">
              {product.reference}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">{product.brand}</span>
          </div>
          <h3 className="mt-2 text-base font-bold text-navy">{product.designation}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-slate-ink">
            {product.specs
              .slice(0, 3)
              .map((s) => `${s.label} : ${s.value}`)
              .join(" · ")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <AddToQuoteButton product={product} size="sm" />
          <Link
            to="/catalogue/$reference"
            params={{ reference: encodeURIComponent(product.reference) }}
            className="focus-rd group inline-flex items-center gap-1 text-xs font-bold text-navy"
          >
            Détails
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="card-rd group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="mono-ref rounded bg-rouge/10 px-2 py-1 font-bold text-rouge">
          {product.reference}
        </span>
        <div className="size-14 text-navy/25 transition-transform duration-500 group-hover:scale-110">
          <Illustration name={illo} />
        </div>
      </div>
      <h3 className="mt-4 text-base leading-snug font-bold text-navy">{product.designation}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-muted-foreground">{product.brand}</span>
        <span className="rounded-full bg-surface px-2 py-0.5 font-semibold text-navy/70">
          {familyLabel[product.family]}
        </span>
      </div>
      <ul className="mt-4 space-y-1 text-xs text-slate-ink">
        {product.specs.slice(0, 3).map((s) => (
          <li key={s.label} className="flex justify-between gap-3 border-b border-border/70 pb-1">
            <span className="text-muted-foreground">{s.label}</span>
            <span className="font-semibold text-navy">{s.value}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <AddToQuoteButton product={product} size="sm" />
        <Link
          to="/catalogue/$reference"
          params={{ reference: encodeURIComponent(product.reference) }}
          className="focus-rd group/l inline-flex items-center gap-1 text-xs font-bold text-navy"
        >
          Détails
          <ArrowRight className="size-3.5 transition-transform group-hover/l:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

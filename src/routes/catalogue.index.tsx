import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutGrid, List, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Illustration } from "@/components/illustrations/Tech";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/catalogue/ProductCard";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FAMILIES, countByFamily, products, type Product, type ProductFamily } from "@/data/products";
import { cn } from "@/lib/utils";

type View = "grid" | "list";
type Sort = "pertinence" | "reference" | "marque";

interface CatalogueSearch {
  q?: string;
  famille?: ProductFamily;
  marque?: string;
  vue?: View;
  tri?: Sort;
}

const FAMILY_IDS = FAMILIES.map((f) => f.id);
const PAGE_SIZE = 24;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export const Route = createFileRoute("/catalogue/")({
  validateSearch: (search: Record<string, unknown>): CatalogueSearch => {
    const rawQ = search["q"];
    const rawFamille = search["famille"];
    const rawMarque = search["marque"];
    const rawVue = search["vue"];
    const rawTri = search["tri"];
    const q = typeof rawQ === "string" && rawQ.trim() ? rawQ : undefined;
    const famille =
      typeof rawFamille === "string" && FAMILY_IDS.includes(rawFamille as ProductFamily)
        ? (rawFamille as ProductFamily)
        : undefined;
    const marque = typeof rawMarque === "string" && rawMarque.trim() ? rawMarque : undefined;
    const vue = rawVue === "list" ? "list" : rawVue === "grid" ? "grid" : undefined;
    const tri =
      rawTri === "reference" || rawTri === "marque" || rawTri === "pertinence"
        ? (rawTri as Sort)
        : undefined;
    const result: CatalogueSearch = {};
    if (q !== undefined) result.q = q;
    if (famille !== undefined) result.famille = famille;
    if (marque !== undefined) result.marque = marque;
    if (vue !== undefined) result.vue = vue;
    if (tri !== undefined) result.tri = tri;
    return result;
  },
  head: () => ({
    meta: [
      { title: "Catalogue de pièces industrielles | Rousseau Distribution" },
      {
        name: "description",
        content:
          "Parcourez le catalogue Rousseau Distribution : roulements, courroies, moteurs électriques et organes de transmission. Recherchez par référence, marque ou machine.",
      },
      { property: "og:title", content: "Catalogue de pièces industrielles | Rousseau Distribution" },
      {
        property: "og:description",
        content:
          "Roulements, courroies, moteurs et transmission mécanique : recherchez une référence dans notre catalogue industriel.",
      },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const reducedMotion = useReducedMotion();

  const [inputValue, setInputValue] = useState(search.q ?? "");
  const [isSettling, setIsSettling] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const settleRef = useRef<ReturnType<typeof setTimeout>>();

  const counts = useMemo(() => countByFamily(), []);

  // Autofocus on desktop only, never on mobile.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) inputRef.current?.focus();
  }, []);

  // Debounce the free-text query into the URL search params.
  useEffect(() => {
    setIsSettling(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigate({
        search: (prev) => ({ ...prev, q: inputValue.trim() || undefined }),
        replace: true,
      });
      if (settleRef.current) clearTimeout(settleRef.current);
      settleRef.current = setTimeout(() => setIsSettling(false), 250);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    return () => {
      if (settleRef.current) clearTimeout(settleRef.current);
    };
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search.q, search.famille, search.marque, search.tri]);

  const brands = useMemo(() => {
    const base = search.famille ? products.filter((p) => p.family === search.famille) : products;
    return Array.from(new Set(base.map((p) => p.brand))).sort((a, b) => a.localeCompare(b, "fr"));
  }, [search.famille]);

  const subcategories = useMemo(() => {
    const base = search.famille ? products.filter((p) => p.family === search.famille) : products;
    return Array.from(new Set(base.map((p) => p.subcategory))).sort((a, b) => a.localeCompare(b, "fr"));
  }, [search.famille]);

  const filtered = useMemo(() => {
    const q = normalize(search.q ?? "");
    let list = products.filter((p) => {
      if (search.famille && p.family !== search.famille) return false;
      if (search.marque && normalize(p.brand) !== normalize(search.marque)) return false;
      if (!q) return true;
      return (
        normalize(p.reference).includes(q) ||
        normalize(p.designation).includes(q) ||
        normalize(p.brand).includes(q) ||
        normalize(p.subcategory).includes(q)
      );
    });

    const tri = search.tri ?? "pertinence";
    if (tri === "reference") {
      list = [...list].sort((a, b) => a.reference.localeCompare(b.reference, "fr"));
    } else if (tri === "marque") {
      list = [...list].sort((a, b) => a.brand.localeCompare(b.brand, "fr"));
    }
    return list;
  }, [search.q, search.famille, search.marque, search.tri]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const view: View = search.vue ?? "grid";

  const setSearch = (patch: Partial<CatalogueSearch>) => {
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  };

  const resetFilters = () => {
    setInputValue("");
    navigate({ search: {}, replace: true });
  };

  const hasActiveFilters = Boolean(search.q || search.famille || search.marque);

  return (
    <div className="bg-background">
      <PageHero
        title="Catalogue"
        subtitle="Recherchez par référence, désignation, marque ou machine parmi nos milliers de pièces disponibles."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Catalogue" }]}
      >
        <div className="mx-auto max-w-2xl">
          <label htmlFor="catalogue-search" className="sr-only">
            Rechercher une référence
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-navy/50">
              {isSettling ? (
                <Loader2 className="size-5 animate-spin" aria-hidden />
              ) : (
                <Search className="size-5" aria-hidden />
              )}
            </span>
            <input
              ref={inputRef}
              id="catalogue-search"
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Référence, désignation, marque, machine…"
              className="focus-rd h-16 w-full rounded-xl border border-white/15 bg-white/95 pr-5 pl-14 text-base font-medium text-navy shadow-lift placeholder:text-muted-foreground focus:border-rouge/60"
            />
          </div>
        </div>
      </PageHero>

      <section className="section-y !py-12 md:!py-16">
        <div className="container-rd grid grid-cols-1 gap-8 lg:grid-cols-[17rem_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <FilterPanel
                search={search}
                brands={brands}
                subcategories={subcategories}
                counts={counts}
                onChange={setSearch}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </aside>

          {/* Mobile filter trigger */}
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="focus-rd inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold text-navy"
            >
              <SlidersHorizontal className="size-4" />
              Filtres
              {hasActiveFilters && <span className="size-1.5 rounded-full bg-rouge" />}
            </button>
            <ResultCount count={filtered.length} />
          </div>

          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filtrer le catalogue</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterPanel
                  search={search}
                  brands={brands}
                  subcategories={subcategories}
                  counts={counts}
                  onChange={setSearch}
                  onReset={resetFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
              <SheetClose asChild>
                <button
                  type="button"
                  className="focus-rd mt-6 w-full rounded-lg bg-rouge px-4 py-3 text-sm font-bold text-white"
                >
                  Voir les résultats
                </button>
              </SheetClose>
            </SheetContent>
          </Sheet>

          {/* Results */}
          <div>
            <div className="hidden items-center justify-between gap-4 border-b border-border pb-4 lg:flex">
              <ResultCount count={filtered.length} />
              <div className="flex items-center gap-3">
                <label htmlFor="tri" className="sr-only">
                  Trier les résultats
                </label>
                <select
                  id="tri"
                  value={search.tri ?? "pertinence"}
                  onChange={(e) => setSearch({ tri: e.target.value as Sort })}
                  className="focus-rd rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-navy"
                >
                  <option value="pertinence">Pertinence</option>
                  <option value="reference">Référence A-Z</option>
                  <option value="marque">Marque</option>
                </select>
                <ViewToggle view={view} onChange={(v) => setSearch({ vue: v })} />
              </div>
            </div>

            <div className="mt-4 flex justify-end lg:hidden">
              <ViewToggle view={view} onChange={(v) => setSearch({ vue: v })} />
            </div>

            {filtered.length === 0 ? (
              <EmptyState query={search.q ?? ""} />
            ) : (
              <>
                <motion.div
                  layout={!reducedMotion}
                  className={cn(
                    "mt-6 grid gap-5",
                    view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                  )}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {visible.map((product, i) => (
                      <motion.div
                        key={product.reference}
                        layout={!reducedMotion}
                        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: reducedMotion ? 0 : Math.min(i, 8) * 0.03 }}
                      >
                        <ProductCard product={product} view={view} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="focus-rd rounded-lg border border-navy/15 bg-background px-6 py-3 text-sm font-bold text-navy transition-colors hover:border-rouge/40 hover:text-rouge"
                    >
                      Charger plus ({filtered.length - visible.length} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultCount({ count }: { count: number }) {
  return (
    <p aria-live="polite" className="text-sm font-semibold text-slate-ink">
      <motion.span
        key={count}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="inline-block text-navy"
      >
        {count}
      </motion.span>{" "}
      {count > 1 ? "références trouvées" : "référence trouvée"}
    </p>
  );
}

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border p-1">
      <button
        type="button"
        aria-label="Affichage en grille"
        aria-pressed={view === "grid"}
        onClick={() => onChange("grid")}
        className={cn(
          "focus-rd rounded-md p-2 transition-colors",
          view === "grid" ? "bg-navy text-white" : "text-navy/50 hover:text-navy",
        )}
      >
        <LayoutGrid className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Affichage en liste"
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
        className={cn(
          "focus-rd rounded-md p-2 transition-colors",
          view === "list" ? "bg-navy text-white" : "text-navy/50 hover:text-navy",
        )}
      >
        <List className="size-4" />
      </button>
    </div>
  );
}

function FilterPanel({
  search,
  brands,
  subcategories,
  counts,
  onChange,
  onReset,
  hasActiveFilters,
}: {
  search: CatalogueSearch;
  brands: string[];
  subcategories: string[];
  counts: Record<ProductFamily, number>;
  onChange: (patch: Partial<CatalogueSearch>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-navy uppercase">Filtres</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="focus-rd inline-flex items-center gap-1 text-xs font-bold text-rouge hover:underline"
          >
            <X className="size-3.5" />
            Réinitialiser
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
          Famille
        </legend>
        <div className="space-y-1">
          {FAMILIES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ famille: search.famille === f.id ? undefined : f.id })}
              aria-pressed={search.famille === f.id}
              className={cn(
                "focus-rd flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors",
                search.famille === f.id ? "bg-rouge/10 text-rouge" : "text-slate-ink hover:bg-surface",
              )}
            >
              <span>{f.label}</span>
              <span className="text-xs text-muted-foreground">{counts[f.id]}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="filtre-marque" className="mb-3 block text-xs font-bold tracking-wide text-muted-foreground uppercase">
          Marque
        </label>
        <select
          id="filtre-marque"
          value={search.marque ?? ""}
          onChange={(e) => onChange({ marque: e.target.value || undefined })}
          className="focus-rd w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold text-navy"
        >
          <option value="">Toutes les marques</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
          Sous-catégories
        </p>
        <ul className="space-y-1 text-sm text-slate-ink">
          {subcategories.slice(0, 8).map((s) => (
            <li key={s} className="truncate rounded-lg px-3 py-1.5 hover:bg-surface">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center">
      <div className="size-20 text-navy/25">
        <Illustration name="blueprint" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-navy">Aucune référence trouvée</h3>
      <p className="mt-2 max-w-md text-sm text-slate-ink">
        Essayez un autre terme de recherche, ou demandez-nous directement cette pièce : nous
        l'identifions et revenons vers vous rapidement.
      </p>
      <Link
        to="/contact"
        search={{ piece: query }}
        className="focus-rd mt-6 inline-flex items-center gap-2 rounded-lg bg-rouge px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge"
      >
        Demander cette pièce
      </Link>
    </div>
  );
}

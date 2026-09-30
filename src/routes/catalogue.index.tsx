import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, LayoutGrid, List, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/catalogue/ProductCard";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FAMILIES, countByFamily, products, type ProductFamily } from "@/data/products";
import { getFamilyImage } from "@/lib/product-image";
import { cn } from "@/lib/utils";
import catalogueEmpty from "@/assets/catalogue-empty.png";

type View = "grid" | "list";
type Sort = "pertinence" | "reference" | "marque";

interface CatalogueSearch {
  q?: string | undefined;
  famille?: ProductFamily | undefined;
  marque?: string | undefined;
  sous?: string | undefined;
  vue?: View | undefined;
  tri?: Sort | undefined;
}

const FAMILY_IDS = FAMILIES.map((f) => f.id);
const PAGE_SIZE = 24;
const QUICK_SEARCHES = ["6205-2RS", "SPB", "Moteur", "Chaîne"];

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
    const rawSous = search["sous"];
    const rawVue = search["vue"];
    const rawTri = search["tri"];
    const q = typeof rawQ === "string" && rawQ.trim() ? rawQ : undefined;
    const famille =
      typeof rawFamille === "string" && FAMILY_IDS.includes(rawFamille as ProductFamily)
        ? (rawFamille as ProductFamily)
        : undefined;
    const marque = typeof rawMarque === "string" && rawMarque.trim() ? rawMarque : undefined;
    const sous = typeof rawSous === "string" && rawSous.trim() ? rawSous : undefined;
    const vue = rawVue === "list" ? "list" : rawVue === "grid" ? "grid" : undefined;
    const tri =
      rawTri === "reference" || rawTri === "marque" || rawTri === "pertinence"
        ? (rawTri as Sort)
        : undefined;
    const result: CatalogueSearch = {};
    if (q !== undefined) result.q = q;
    if (famille !== undefined) result.famille = famille;
    if (marque !== undefined) result.marque = marque;
    if (sous !== undefined) result.sous = sous;
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
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const settleRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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
  }, [search.q, search.famille, search.marque, search.sous, search.tri]);

  const brands = useMemo(() => {
    const base = search.famille ? products.filter((p) => p.family === search.famille) : products;
    return Array.from(new Set(base.map((p) => p.brand))).sort((a, b) => a.localeCompare(b, "fr"));
  }, [search.famille]);

  const subcategories = useMemo(() => {
    const base = search.famille ? products.filter((p) => p.family === search.famille) : products;
    return Array.from(new Set(base.map((p) => p.subcategory))).sort((a, b) =>
      a.localeCompare(b, "fr"),
    );
  }, [search.famille]);

  const filtered = useMemo(() => {
    const q = normalize(search.q ?? "");
    let list = products.filter((p) => {
      if (search.famille && p.family !== search.famille) return false;
      if (search.marque && normalize(p.brand) !== normalize(search.marque)) return false;
      if (search.sous && p.subcategory !== search.sous) return false;
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
  }, [search.q, search.famille, search.marque, search.sous, search.tri]);

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

  const hasActiveFilters = Boolean(search.q || search.famille || search.marque || search.sous);
  const familyLabel = FAMILIES.find((f) => f.id === search.famille)?.label;

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];
  if (search.q) {
    activeChips.push({
      key: "q",
      label: `« ${search.q} »`,
      onRemove: () => setInputValue(""),
    });
  }
  if (familyLabel) {
    activeChips.push({
      key: "famille",
      label: familyLabel,
      onRemove: () => setSearch({ famille: undefined, marque: undefined, sous: undefined }),
    });
  }
  if (search.marque) {
    activeChips.push({
      key: "marque",
      label: search.marque,
      onRemove: () => setSearch({ marque: undefined }),
    });
  }
  if (search.sous) {
    activeChips.push({
      key: "sous",
      label: search.sous,
      onRemove: () => setSearch({ sous: undefined }),
    });
  }

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

          {/* quick searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-white/55">Essayez :</span>
            {QUICK_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setInputValue(term)}
                className="focus-rd mono-ref rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-rouge hover:bg-rouge hover:text-white"
              >
                {term}
              </button>
            ))}
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

            {/* active filter chips */}
            <AnimatePresence initial={false}>
              {activeChips.length > 0 && (
                <motion.div
                  key="chips"
                  initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-wrap items-center gap-2 pt-4">
                    {activeChips.map((chip) => (
                      <li key={chip.key}>
                        <button
                          type="button"
                          onClick={chip.onRemove}
                          aria-label={`Retirer le filtre ${chip.label}`}
                          className="focus-rd group inline-flex items-center gap-1.5 rounded-full border border-rouge/30 bg-rouge/8 py-1.5 pr-2 pl-3.5 text-xs font-bold text-rouge transition-colors duration-300 hover:bg-rouge hover:text-white"
                        >
                          {chip.label}
                          <X className="size-3.5" />
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="focus-rd px-2 text-xs font-bold text-slate-ink underline-offset-2 hover:text-navy hover:underline"
                      >
                        Tout effacer
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {filtered.length === 0 ? (
              <EmptyState query={search.q ?? ""} />
            ) : (
              <>
                <motion.div
                  layout={!reducedMotion}
                  aria-busy={isSettling}
                  className={cn(
                    "mt-6 grid gap-5 transition-opacity duration-300",
                    isSettling && "opacity-70",
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
                        transition={{
                          duration: 0.35,
                          delay: reducedMotion ? 0 : Math.min(i, 8) * 0.03,
                        }}
                      >
                        <ProductCard product={product} view={view} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filtered.length > PAGE_SIZE && (
                  <div className="mt-10 flex flex-col items-center gap-3">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Affichage de {visible.length} sur {filtered.length}
                    </p>
                    <div className="h-1 w-48 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-rouge transition-all duration-500"
                        style={{ width: `${(visible.length / filtered.length) * 100}%` }}
                      />
                    </div>
                    {hasMore && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="focus-rd mt-2 rounded-lg border border-navy/15 bg-background px-6 py-3 text-sm font-bold text-navy transition-colors hover:border-rouge/40 hover:text-rouge"
                      >
                        Charger plus ({filtered.length - visible.length} restantes)
                      </button>
                    )}
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

      {/* Family: image tiles */}
      <fieldset>
        <legend className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
          Famille
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {FAMILIES.map((f) => {
            const active = search.famille === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() =>
                  onChange({
                    famille: active ? undefined : f.id,
                    marque: undefined,
                    sous: undefined,
                  })
                }
                aria-pressed={active}
                className={cn(
                  "group focus-rd relative aspect-[4/3] overflow-hidden rounded-lg border-2 text-left transition-colors duration-300",
                  active ? "border-rouge" : "border-transparent hover:border-navy/25",
                )}
              >
                <img
                  src={getFamilyImage(f.id)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-2">
                  <span className="block text-xs leading-tight font-bold text-white">
                    {f.label}
                  </span>
                  <span className="text-[11px] text-white/70">{counts[f.id]} réf.</span>
                </span>
                {active && (
                  <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-rouge text-white">
                    <Check className="size-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="filtre-marque"
          className="mb-3 block text-xs font-bold tracking-wide text-muted-foreground uppercase"
        >
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
        <ul className="max-h-60 space-y-1 overflow-y-auto pr-1 text-sm">
          {subcategories.map((s) => {
            const active = search.sous === s;
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => onChange({ sous: active ? undefined : s })}
                  aria-pressed={active}
                  className={cn(
                    "focus-rd flex w-full items-center justify-between gap-2 truncate rounded-lg px-3 py-1.5 text-left font-semibold transition-colors",
                    active ? "bg-rouge/10 text-rouge" : "text-slate-ink hover:bg-surface",
                  )}
                >
                  <span className="truncate">{s}</span>
                  {active && <Check className="size-3.5 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-border bg-surface/60 px-6 py-14 text-center">
      <img
        src={catalogueEmpty}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-40 rounded-2xl object-cover shadow-lift"
      />
      <h3 className="mt-7 text-xl font-bold text-navy">Aucune référence trouvée</h3>
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
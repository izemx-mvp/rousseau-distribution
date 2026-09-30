import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PostCard, PostCover, categoryLabel, formatDate } from "@/components/blog/PostCard";
import { Reveal } from "@/components/motion/Reveal";
import { CATEGORIES, readingTime, type Post, type PostCategory } from "@/data/posts";

const PAGE_SIZE = 9;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

interface PillTarget {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string | undefined>;
}

export interface BlogListingProps {
  allPosts: Post[];
  activeCategory: PostCategory | null;
  query: string;
  onQueryChange: (q: string) => void;
  pillHref: (id: PostCategory | null) => PillTarget;
  showFeatured?: boolean;
}

export function BlogListing({
  allPosts,
  activeCategory,
  query,
  onQueryChange,
  pillHref,
  showFeatured = false,
}: BlogListingProps) {
  const reduced = useReducedMotion();
  const [inputValue, setInputValue] = useState(query);
  const [page, setPage] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onQueryChange(inputValue);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, query]);

  const featured = useMemo(() => {
    if (!showFeatured) return null;
    const featuredPosts = allPosts.filter((p) => p.featured);
    if (featuredPosts.length > 0) {
      return [...featuredPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
    }
    return [...allPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0] ?? null;
  }, [allPosts, showFeatured]);

  const filtered = useMemo(() => {
    let list = allPosts;
    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }
    const q = normalize(query.trim());
    if (q) {
      list = list.filter((p) => {
        const haystack = normalize([p.title, p.excerpt, ...p.tags].join(" "));
        return haystack.includes(q);
      });
    }
    return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [allPosts, activeCategory, query]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  return (
    <div>
      {featured && (
        <Reveal className="mb-14">
          <article className="card-rd group grid overflow-hidden md:grid-cols-2">
            <div className="overflow-hidden">
              <div className="h-full transition-transform duration-700 group-hover:scale-[1.04]">
                <PostCover
                  variant={featured.coverVariant}
                  className="blueprint-light relative flex h-full min-h-[16rem] items-center justify-center overflow-hidden bg-surface"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="w-fit rounded-full bg-rouge/10 px-3 py-1 text-[11px] font-bold tracking-wide text-rouge uppercase">
                À la une · {categoryLabel(featured.category)}
              </span>
              <h2 className="mt-4 text-2xl leading-tight font-bold text-navy md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-ink md:text-base">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{formatDate(featured.publishedAt)}</span>
                <span>{readingTime(featured.content)} min de lecture</span>
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="focus-rd group/l mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Lire l'article
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/l:translate-x-1" />
              </Link>
            </div>
          </article>
        </Reveal>
      )}

      <div className="mb-10 flex flex-col gap-6">
        <div className="relative flex flex-wrap gap-2">
          <PillLink active={activeCategory === null} target={pillHref(null)}>
            Tous
          </PillLink>
          {CATEGORIES.map((c) => (
            <PillLink key={c.id} active={activeCategory === c.id} target={pillHref(c.id)}>
              {c.label}
            </PillLink>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative w-full sm:max-w-xs">
            <span className="sr-only">Rechercher un article</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Rechercher un article…"
              className="focus-rd w-full rounded-lg border border-border bg-background py-2.5 pr-3 pl-9 text-sm text-navy placeholder:text-muted-foreground"
            />
          </label>
          <p aria-live="polite" className="text-xs font-semibold text-muted-foreground">
            {filtered.length} article{filtered.length > 1 ? "s" : ""} trouvé
            {filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? {} : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="focus-rd rounded-lg border border-navy/15 px-6 py-3 text-sm font-bold text-navy transition-colors duration-300 hover:bg-navy/5"
              >
                Charger plus
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-lg font-bold text-navy">Aucun article trouvé</p>
          <p className="max-w-sm text-sm text-slate-ink">
            Essayez un autre mot-clé ou réinitialisez les filtres pour retrouver tous nos articles.
          </p>
          <Link
            to="/blog"
            className="focus-rd inline-flex items-center gap-2 rounded-lg bg-rouge px-5 py-2.5 text-sm font-bold text-white"
          >
            <RotateCcw className="size-4" />
            Réinitialiser
          </Link>
        </div>
      )}
    </div>
  );
}

function PillLink({
  active,
  target,
  children,
}: {
  active: boolean;
  target: PillTarget;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={target.to}
      {...(target.params ? { params: target.params } : {})}
      {...(target.search ? { search: target.search } : {})}
      aria-current={active ? "true" : undefined}
      className={`focus-rd relative rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300 ${
        active ? "text-white" : "text-navy hover:bg-navy/5"
      }`}
    >
      {active && (
        <motion.span
          layoutId="blog-pill-active"
          className="absolute inset-0 rounded-full bg-rouge"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative">{children}</span>
    </Link>
  );
}

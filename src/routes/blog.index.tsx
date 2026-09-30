import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogCatalogueLinks } from "@/components/blog/BlogCatalogueLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { CATEGORIES, posts, type PostCategory } from "@/data/posts";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface BlogSearch {
  q?: string;
  categorie?: PostCategory;
}

const CATEGORY_IDS = CATEGORIES.map((c) => c.id);
const QUICK_TOPICS = ["Roulements", "Courroies", "Moteurs", "Stock"];

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const rawQ = search["q"];
    const rawCategorie = search["categorie"];
    const result: BlogSearch = {};
    if (typeof rawQ === "string" && rawQ.trim()) result.q = rawQ;
    if (typeof rawCategorie === "string" && CATEGORY_IDS.includes(rawCategorie as PostCategory)) {
      result.categorie = rawCategorie as PostCategory;
    }
    return result;
  },
  head: () => ({
    meta: [
      { title: `Blog | ${site.name}` },
      {
        name: "description",
        content:
          "Guides techniques, conseils de maintenance et actualités des pièces industrielles : roulements, courroies, moteurs et transmission.",
      },
      { property: "og:title", content: `Blog | ${site.name}` },
      {
        property: "og:description",
        content:
          "Guides techniques, conseils de maintenance et actualités des pièces industrielles.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndexRoute,
});

function BlogIndexRoute() {
  const { q, categorie } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const setQuery = (value: string) => {
    navigate({
      search: (prev) => {
        const next: BlogSearch = { ...prev };
        if (value.trim()) next.q = value;
        else delete next.q;
        return next;
      },
      replace: true,
    });
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `Blog ${site.name}`,
      url: `${site.url}/blog`,
      description:
        "Guides techniques, conseils de maintenance et actualités des pièces industrielles.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      ],
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        title="Blog"
        subtitle="Guides techniques, conseils de maintenance et actualités des pièces industrielles"
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Blog" }]}
      >
        {/* Topic shortcuts: fill the article search */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-white/55">Sujets :</span>
          {QUICK_TOPICS.map((topic) => {
            const isActive = q?.toLowerCase() === topic.toLowerCase();
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setQuery(isActive ? "" : topic)}
                aria-pressed={isActive}
                className={cn(
                  "focus-rd rounded-full border px-3.5 py-1.5 text-xs font-bold backdrop-blur-sm transition-colors duration-300",
                  isActive
                    ? "border-rouge bg-rouge text-white"
                    : "border-white/20 bg-white/5 text-white/85 hover:border-rouge hover:bg-rouge hover:text-white",
                )}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </PageHero>

      <div className="section-y">
        <div className="container-rd">
          <BlogListing
            allPosts={posts}
            activeCategory={categorie ?? null}
            query={q ?? ""}
            showFeatured
            onQueryChange={setQuery}
            pillHref={(id) =>
              id === null
                ? { to: "/blog", search: { q, categorie: undefined } }
                : { to: "/blog/categorie/$category", params: { category: id }, search: { q } }
            }
          />
        </div>
      </div>

      <BlogCatalogueLinks />
      <CtaBand title="Une pièce à identifier ?" />
    </div>
  );
}
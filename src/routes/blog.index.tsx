import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/blog/BlogListing";
import { CtaBand } from "@/components/sections/CtaBand";
import { CATEGORIES, posts, type PostCategory } from "@/data/posts";
import { site } from "@/config/site";

interface BlogSearch {
  q?: string;
  categorie?: PostCategory;
}

const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const q = typeof search.q === "string" && search.q.trim() ? search.q : undefined;
    const categorie =
      typeof search.categorie === "string" &&
      CATEGORY_IDS.includes(search.categorie as PostCategory)
        ? (search.categorie as PostCategory)
        : undefined;
    return { q, categorie };
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
      />
      <div className="section-y">
        <div className="container-rd">
          <BlogListing
            allPosts={posts}
            activeCategory={categorie ?? null}
            query={q ?? ""}
            showFeatured
            onQueryChange={(value) => {
              navigate({
                search: (prev) => ({ ...prev, q: value.trim() ? value : undefined }),
                replace: true,
              });
            }}
            pillHref={(id) =>
              id === null
                ? { to: "/blog", search: { q, categorie: undefined } }
                : { to: "/blog/categorie/$category", params: { category: id }, search: { q } }
            }
          />
        </div>
      </div>
      <CtaBand title="Une pièce à identifier ?" />
    </div>
  );
}

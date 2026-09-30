import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogCatalogueLinks } from "@/components/blog/BlogCatalogueLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { CATEGORIES, posts, type PostCategory } from "@/data/posts";
import { site } from "@/config/site";
import catalogueEmpty from "@/assets/catalogue-empty.png";

const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

const CATEGORY_INTROS: Record<PostCategory, string> = {
  "guides-techniques":
    "Méthodes et critères de sélection pour bien choisir vos pièces de rechange industrielles.",
  maintenance:
    "Conseils pratiques pour anticiper l'usure et planifier vos opérations de maintenance.",
  sourcing: "Approvisionnement, équivalences et gestion des stocks de pièces critiques.",
  secteurs: "Retours d'expérience et besoins spécifiques par secteur d'activité.",
  actualites: "Actualités et informations de Rousseau Distribution.",
};

export const Route = createFileRoute("/blog/categorie/$category")({
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.id === params.category);
    const label = cat?.label ?? "Catégorie";
    return {
      meta: [
        { title: `${label} | Blog | ${site.name}` },
        {
          name: "description",
          content: cat
            ? `${CATEGORY_INTROS[cat.id]} Tous nos articles ${label.toLowerCase()}.`
            : "Catégorie du blog introuvable.",
        },
        { property: "og:title", content: `${label} | Blog | ${site.name}` },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: BlogCategoryRoute,
});

function BlogCategoryRoute() {
  const { category } = Route.useParams();
  const [query, setQuery] = useState("");

  const isValid = CATEGORY_IDS.includes(category as PostCategory);
  const cat = CATEGORIES.find((c) => c.id === category);

  if (!isValid || !cat) {
    return (
      <div className="section-y">
        <div className="container-rd flex flex-col items-center gap-4 py-24 text-center">
          <img
            src={catalogueEmpty}
            alt=""
            decoding="async"
            className="size-36 rounded-2xl object-cover shadow-lift"
          />
          <h1 className="mt-4 text-3xl font-bold text-navy">Catégorie introuvable</h1>
          <p className="max-w-md text-sm text-slate-ink">
            Cette catégorie n'existe pas ou n'est plus disponible. Retrouvez tous nos articles sur
            le blog.
          </p>
          <Link
            to="/blog"
            className="focus-rd inline-flex items-center gap-2 rounded-lg bg-rouge px-5 py-3 text-sm font-bold text-white"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const titleByCategory: Record<PostCategory, string> = {
    "guides-techniques": "Guides techniques",
    maintenance: "Maintenance",
    sourcing: "Sourcing",
    secteurs: "Secteurs",
    actualites: "Actualités",
  };

  const count = posts.filter((p) => p.category === cat.id).length;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `Blog ${site.name} — ${cat.label}`,
      url: `${site.url}/blog/categorie/${cat.id}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        {
          "@type": "ListItem",
          position: 3,
          name: cat.label,
          item: `${site.url}/blog/categorie/${cat.id}`,
        },
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
        title={titleByCategory[cat.id]}
        subtitle={CATEGORY_INTROS[cat.id]}
        breadcrumb={[
          { label: "Accueil", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: cat.label },
        ]}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="mono-ref text-sm font-bold text-white/70">
            {count} {count > 1 ? "articles" : "article"}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <Link
                to="/blog"
                className="focus-rd rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-rouge hover:bg-rouge hover:text-white"
              >
                Tous les articles
              </Link>
            </li>
            {CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
              <li key={c.id}>
                <Link
                  to="/blog/categorie/$category"
                  params={{ category: c.id }}
                  className="focus-rd rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-rouge hover:bg-rouge hover:text-white"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <div className="section-y">
        <div className="container-rd">
          <BlogListing
            allPosts={posts}
            activeCategory={cat.id}
            query={query}
            onQueryChange={setQuery}
            pillHref={(id) =>
              id === null
                ? { to: "/blog" }
                : { to: "/blog/categorie/$category", params: { category: id } }
            }
          />
        </div>
      </div>

      <BlogCatalogueLinks />
      <CtaBand title="Une pièce à identifier ?" />
    </div>
  );
}
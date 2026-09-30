import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageCircle, User } from "lucide-react";
import {
  ArticleMarkdown,
  extractHeadings,
  splitMarkdownInHalf,
} from "@/components/blog/ArticleMarkdown";
import { categoryLabel, formatDate, PostCard, PostCover } from "@/components/blog/PostCard";
import { ShareBar } from "@/components/blog/ShareBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AddToQuoteButton } from "@/components/catalogue/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { site, whatsappLink } from "@/config/site";
import { getPost, getRelatedPosts, posts, readingTime } from "@/data/posts";
import { getProduct } from "@/data/products";
import { getFamilyImage, getProductImage } from "@/lib/product-image";
import { getPostImage } from "@/lib/post-image";
import { cn } from "@/lib/utils";
import catalogueEmpty from "@/assets/catalogue-empty.png";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) {
      return { meta: [{ title: `Article introuvable | ${site.name}` }] };
    }
    return {
      meta: [
        { title: post.seoTitle },
        { name: "description", content: post.seoDescription },
        { property: "og:title", content: post.seoTitle },
        { property: "og:description", content: post.seoDescription },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPostRoute,
});

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-40 h-[3px] origin-left bg-rouge"
    />
  );
}

function BlogPostRoute() {
  const { slug } = Route.useParams();
  const post = getPost(slug);
  const reduced = useReducedMotion();

  if (!post) {
    return (
      <div className="section-y">
        <div className="container-rd flex flex-col items-center gap-4 py-24 text-center">
          <img
            src={catalogueEmpty}
            alt=""
            decoding="async"
            className="size-36 rounded-2xl object-cover shadow-lift"
          />
          <h1 className="mt-4 text-3xl font-bold text-navy">Article introuvable</h1>
          <p className="max-w-md text-sm text-slate-ink">
            Cet article n'existe pas ou a été déplacé. Retrouvez l'ensemble de nos contenus sur le
            blog.
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

  const headings = extractHeadings(post.content);
  const [firstHalf, secondHalf] = splitMarkdownInHalf(post.content);
  const url = `${site.url}/blog/${post.slug}`;
  const cover = getPostImage(post);

  const relatedProducts = post.relatedProducts
    .map((ref) => getProduct(ref))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedPosts = getRelatedPosts(post.slug, 3);

  const sorted = [...posts].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const prevPost = idx > 0 ? sorted[idx - 1] : null;
  const nextPost = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

  // The mid-article CTA borrows the family render of the first related product.
  const ctaFamily = relatedProducts[0]?.family ?? "roulements";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      author: { "@type": "Organization", name: post.author },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      url,
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
          name: categoryLabel(post.category),
          item: `${site.url}/blog/categorie/${post.category}`,
        },
        { "@type": "ListItem", position: 4, name: post.title, item: url },
      ],
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {!reduced && <ReadingProgressBar />}

      {/* ---------------------------------------------------------- */}
      {/* Hero: text left, cover image right                          */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-navy-deep pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_30%,oklch(0.585_0.232_27.5/0.18),transparent_70%)]"
          aria-hidden
        />
        <div className="container-rd relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav
              aria-label="Fil d'Ariane"
              className="flex flex-wrap items-center gap-1.5 text-xs text-white/55"
            >
              <Link to="/" className="focus-rd hover:text-white">
                Accueil
              </Link>
              <span>/</span>
              <Link to="/blog" className="focus-rd hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <Link
                to="/blog/categorie/$category"
                params={{ category: post.category }}
                className="focus-rd hover:text-white"
              >
                {categoryLabel(post.category)}
              </Link>
            </nav>

            <Link
              to="/blog/categorie/$category"
              params={{ category: post.category }}
              className="focus-rd mt-6 inline-block w-fit rounded-full bg-rouge/15 px-3 py-1 text-[11px] font-bold tracking-wide text-rouge uppercase transition-colors duration-300 hover:bg-rouge hover:text-white"
            >
              {categoryLabel(post.category)}
            </Link>

            <h1 className="mt-4 text-3xl leading-tight text-white md:text-5xl">{post.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              {post.excerpt}
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
              <li className="flex items-center gap-2">
                <User className="size-4 text-rouge" />
                {post.author}
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="size-4 text-rouge" />
                {formatDate(post.publishedAt)}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-rouge" />
                {readingTime(post.content)} min de lecture
              </li>
            </ul>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span
              className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border-2 border-rouge/40"
              aria-hidden
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lift">
              {cover ? (
                <img
                  src={cover}
                  alt={post.title}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <PostCover variant={post.coverVariant} />
              )}
              <span className="absolute bottom-0 left-0 h-[3px] w-full bg-rouge" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Article body                                                */}
      {/* ---------------------------------------------------------- */}
      <div className="section-y">
        <div className="container-rd grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,720px)_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          <article className="mx-auto w-full max-w-[720px]">
            <ArticleMarkdown content={firstHalf} />

            {secondHalf && (
              <div className="relative my-12 overflow-hidden rounded-2xl bg-navy-deep p-7 md:p-9">
                <div className="blueprint absolute inset-0 opacity-60" aria-hidden />
                <div
                  className="absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_0%,oklch(0.585_0.232_27.5/0.22),transparent_70%)]"
                  aria-hidden
                />
                <img
                  src={getFamilyImage(ctaFamily)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-y-0 right-0 hidden h-full w-2/5 object-cover opacity-50 [mask-image:linear-gradient(to_left,black,transparent)] md:block"
                  aria-hidden
                />
                <div className="relative md:max-w-[60%]">
                  <h3 className="text-xl font-bold text-white">Besoin de cette référence ?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Notre équipe identifie et sourcing votre pièce de rechange, même pour des
                    références spécifiques ou peu courantes.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="group focus-rd inline-flex items-center gap-2 rounded-lg bg-rouge px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge"
                    >
                      Demander un devis
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-rd inline-flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
                    >
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {secondHalf && <ArticleMarkdown content={secondHalf} />}

            {relatedProducts.length > 0 && (
              <div className="mt-14 border-t border-border pt-10">
                <h2 className="flex items-center gap-3 text-xl font-bold text-navy">
                  <span className="h-5 w-1 rounded-full bg-rouge" aria-hidden />
                  Références liées
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {relatedProducts.map((product) => {
                    const img = getProductImage(product);
                    return (
                      <div
                        key={product.reference}
                        className="card-rd group flex flex-col overflow-hidden !p-0"
                      >
                        <div
                          className={cn(
                            "relative aspect-[4/3] overflow-hidden",
                            img.specific ? "bg-surface" : "bg-navy-deep",
                          )}
                        >
                          <img
                            src={img.src}
                            alt={`${product.designation} — ${product.reference}`}
                            loading="lazy"
                            decoding="async"
                            className={cn(
                              "h-full w-full transition-transform duration-500 group-hover:scale-105",
                              img.specific ? "object-contain p-5" : "object-cover",
                            )}
                          />
                          <span className="absolute top-0 left-0 h-[3px] w-0 bg-rouge transition-all duration-500 group-hover:w-full" />
                        </div>
                        <div className="flex flex-1 flex-col gap-2 p-5">
                          <span className="mono-ref w-fit rounded bg-rouge/10 px-2 py-0.5 font-bold text-rouge">
                            {product.reference}
                          </span>
                          <p className="text-sm font-bold text-navy">{product.designation}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                            <AddToQuoteButton product={product} size="sm" />
                            <Link
                              to="/catalogue/$reference"
                              params={{ reference: encodeURIComponent(product.reference) }}
                              className="focus-rd text-xs font-bold text-navy hover:text-rouge"
                            >
                              Détails
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-14 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {prevPost ? (
                <PostNavCard post={prevPost} direction="prev" />
              ) : (
                <span />
              )}
              {nextPost && <PostNavCard post={nextPost} direction="next" />}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ShareBar title={post.title} url={url} />
            </div>
          </aside>
        </div>

        <div className="container-rd mt-6 flex flex-wrap gap-2 lg:hidden">
          <ShareBar title={post.title} url={url} />
        </div>

        {relatedPosts.length > 0 && (
          <div className="container-rd mt-20 border-t border-border pt-14">
            <h2 className="text-2xl font-bold text-navy">Articles similaires</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <CtaBand />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Previous / next article card with thumbnail                         */
/* ------------------------------------------------------------------ */

function PostNavCard({
  post,
  direction,
}: {
  post: { slug: string; title: string };
  direction: "prev" | "next";
}) {
  const image = getPostImage(post);
  const isNext = direction === "next";

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={cn(
        "focus-rd card-rd group flex items-stretch overflow-hidden !p-0",
        isNext && "flex-row-reverse text-right",
      )}
    >
      {image && (
        <span className="relative hidden w-24 shrink-0 overflow-hidden sm:block">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </span>
      )}
      <span className="flex flex-1 items-center gap-3 p-5">
        {!isNext && <ArrowLeft className="size-4 shrink-0 text-rouge" />}
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold text-muted-foreground">
            {isNext ? "Suivant" : "Précédent"}
          </span>
          <span className="mt-1 line-clamp-2 text-sm font-bold text-navy">{post.title}</span>
        </span>
        {isNext && <ArrowRight className="size-4 shrink-0 text-rouge" />}
      </span>
    </Link>
  );
}
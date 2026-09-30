import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { Illustration, type IllustrationName } from "@/components/illustrations/Tech";
import { CATEGORIES, readingTime, type Post } from "@/data/posts";

export function categoryLabel(id: Post["category"]) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCover({
  variant,
  className,
}: {
  variant: Post["coverVariant"];
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        "blueprint-light relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-surface"
      }
    >
      <div className="absolute -right-6 -bottom-8 w-40 text-navy/10">
        <Illustration name={variant as IllustrationName} />
      </div>
      <div className="relative w-28 text-navy/35 transition-transform duration-700 group-hover:scale-105">
        <Illustration name={variant as IllustrationName} strokeWidth={1.4} />
      </div>
      <span className="absolute bottom-0 left-0 h-1 w-16 bg-rouge" />
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="card-rd group flex h-full flex-col">
      <PostCover variant={post.coverVariant} />
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-navy/6 px-2.5 py-1 text-[11px] font-bold tracking-wide text-navy uppercase">
          {categoryLabel(post.category)}
        </span>
        <h3 className="mt-3 line-clamp-2 text-lg leading-snug font-bold text-navy">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-ink">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-3">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {readingTime(post.content)} min
            </span>
          </span>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="focus-rd inline-flex items-center gap-1 font-bold text-navy"
          >
            Lire
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="absolute inset-0"
        aria-label={post.title}
      />
    </article>
  );
}

import { useEffect, useState } from "react";
import type { Heading } from "@/components/blog/ArticleMarkdown";
import { cn } from "@/lib/utils";

/** Sticky article outline that highlights the section currently in view. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Sommaire de l'article">
      <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Sommaire</p>
      <ul className="mt-4 space-y-1 border-l border-border">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "focus-rd -ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors duration-300",
                  h.depth === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-rouge font-bold text-navy"
                    : "border-transparent text-slate-ink hover:text-navy",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

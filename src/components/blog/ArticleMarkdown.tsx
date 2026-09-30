import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    if (h2) {
      const text = h2[1].trim();
      headings.push({ depth: 2, text, id: slugify(text) });
    } else if (h3) {
      const text = h3[1].trim();
      headings.push({ depth: 3, text, id: slugify(text) });
    }
  }
  return headings;
}

/** Splits markdown roughly in half at a `## ` boundary, for mid-article CTA insertion. */
export function splitMarkdownInHalf(markdown: string): [string, string] {
  const sections = markdown.split(/\n(?=##\s+)/);
  if (sections.length < 3) return [markdown, ""];
  const mid = Math.ceil(sections.length / 2);
  return [sections.slice(0, mid).join("\n"), sections.slice(mid).join("\n")];
}

const markdownComponents: Components = {
  h2: ({ children }) => {
    const text = String(children);
    return (
      <h2 id={slugify(text)} className="relative mt-12 mb-4 pl-4 text-2xl font-bold text-navy first:mt-0">
        <span className="absolute top-1 left-0 h-6 w-1 rounded-full bg-rouge" />
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = String(children);
    return (
      <h3 id={slugify(text)} className="mt-8 mb-3 text-lg font-bold text-navy">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p className="mt-4 text-[18px] leading-[1.75] text-slate-ink">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-[18px] leading-[1.75] text-slate-ink marker:text-rouge">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-[18px] leading-[1.75] text-slate-ink marker:font-bold marker:text-rouge">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-rouge bg-surface py-3 pl-5 text-base leading-relaxed text-navy italic">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a href={href} className="focus-rd font-semibold text-rouge underline underline-offset-2">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-navy">{children}</strong>,
  code: ({ children }) => (
    <code className="mono-ref rounded bg-surface px-1.5 py-0.5 text-navy">{children}</code>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-navy text-white">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-3 text-left text-xs font-bold tracking-wide uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-3 text-slate-ink even:bg-transparent">
      {children}
    </td>
  ),
  tr: ({ children }) => <tr className="odd:bg-background even:bg-surface/60">{children}</tr>,
  hr: () => <hr className="my-10 border-border" />,
};

export function ArticleMarkdown({ content }: { content: string }) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

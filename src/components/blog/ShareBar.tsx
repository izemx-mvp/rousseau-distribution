import { Check, Linkedin, Link2, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

/** Share links for an article: LinkedIn, WhatsApp, email and copy-to-clipboard. */
export function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Partager sur LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "Partager sur WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: MessageCircle,
    },
    {
      label: "Partager par e-mail",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or denied): nothing to do.
    }
  }

  const buttonClass =
    "focus-rd inline-flex size-10 items-center justify-center rounded-full border border-border text-navy transition-colors duration-300 hover:border-rouge hover:bg-rouge hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-start">
      <p className="mr-2 text-xs font-bold tracking-wide text-muted-foreground uppercase lg:mr-0 lg:mb-2">
        Partager
      </p>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={buttonClass}
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Lien copié" : "Copier le lien"}
        title={copied ? "Lien copié" : "Copier le lien"}
        className={buttonClass}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}

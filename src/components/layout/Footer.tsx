import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { navigation, site } from "@/config/site";
import { FAMILIES } from "@/data/products";
import { posts } from "@/data/posts";

export function Footer() {
  const latest = [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <footer className="relative bg-navy-deep">
      <div className="h-1 w-full bg-rouge" style={{ clipPath: "polygon(0 0, 100% 0, 99% 100%, 0 100%)" }} />
      <div className="blueprint relative">
        <div className="container-rd relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div>
            <Logo variant="light" className="mb-6" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-rouge" />
                {site.contact.phoneDisplay}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-rouge" />
                {site.contact.email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-rouge" />
                <span>
                  {site.contact.address}
                  <br />
                  {site.contact.city}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white uppercase">Navigation</h3>
            <span className="swoosh mt-3" />
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="focus-rd text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white uppercase">Catalogue</h3>
            <span className="swoosh mt-3" />
            <ul className="mt-5 space-y-2.5">
              {FAMILIES.map((f) => (
                <li key={f.id}>
                  <Link
                    to="/catalogue"
                    search={{ famille: f.id }}
                    className="focus-rd text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Derniers articles
            </h3>
            <span className="swoosh mt-3" />
            <ul className="mt-5 space-y-4">
              {latest.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="focus-rd text-sm leading-snug text-white/65 transition-colors hover:text-white"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-rd flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <span>Mentions légales</span>
              <span>Politique de confidentialité</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

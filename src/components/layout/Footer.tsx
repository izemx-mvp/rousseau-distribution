import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { formatDate } from "@/components/blog/PostCard";
import { GearOutline } from "@/components/illustrations/Tech";
import { navigation, site, whatsappLink } from "@/config/site";
import { FAMILIES } from "@/data/products";
import { posts } from "@/data/posts";
import { getFamilyImage } from "@/lib/product-image";
import { getPostImage } from "@/lib/post-image";
import heroBg from "@/assets/hero-bg.png";

export function Footer() {
  const reduced = useReducedMotion();
  const latest = [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-navy-deep">
      <div
        className="relative z-10 h-1 w-full bg-rouge"
        style={{ clipPath: "polygon(0 0, 100% 0, 99% 100%, 0 100%)" }}
      />

      {/* faint background image + oversized rotating gear */}
      <img
        src={heroBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 -bottom-40 w-[32rem] text-white/5"
        aria-hidden
      >
        <div className="spin-slower">
          <GearOutline strokeWidth={0.8} />
        </div>
      </div>

      <div className="blueprint relative">
        <div className="container-rd relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
          {/* Brand + contact */}
          <div>
            <Logo variant="light" className="mb-6" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">{site.description}</p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-rouge" />
                <a href={`tel:${site.contact.phone}`} className="focus-rd hover:text-white">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-rouge" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="focus-rd break-all hover:text-white"
                >
                  {site.contact.email}
                </a>
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
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-rd mt-6 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:border-rouge hover:bg-rouge"
            >
              <MessageCircle className="size-4" />
              Écrire sur WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Navigation
            </h3>
            <span className="swoosh mt-3" />
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="focus-rd inline-block text-sm text-white/65 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalogue families with thumbnails */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Catalogue
            </h3>
            <span className="swoosh mt-3" />
            <ul className="mt-5 space-y-3">
              {FAMILIES.map((f) => (
                <li key={f.id}>
                  <Link
                    to="/catalogue"
                    search={{ famille: f.id }}
                    className="group focus-rd flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    <img
                      src={getFamilyImage(f.id)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-9 shrink-0 rounded-md object-cover opacity-80 ring-1 ring-white/15 transition-all duration-300 group-hover:opacity-100 group-hover:ring-rouge"
                    />
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest articles with covers */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Derniers articles
            </h3>
            <span className="swoosh mt-3" />
            <ul className="mt-5 space-y-4">
              {latest.map((p) => {
                const image = getPostImage(p);
                return (
                  <li key={p.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group focus-rd flex items-start gap-3"
                    >
                      {image && (
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="size-12 shrink-0 rounded-md object-cover opacity-80 ring-1 ring-white/15 transition-all duration-300 group-hover:opacity-100 group-hover:ring-rouge"
                        />
                      )}
                      <span className="min-w-0">
                        <span className="line-clamp-2 text-sm leading-snug text-white/70 transition-colors group-hover:text-white">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-xs text-white/40">
                          {formatDate(p.publishedAt)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-rd flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>Mentions légales</span>
              <span>Politique de confidentialité</span>
              <button
                type="button"
                onClick={backToTop}
                aria-label="Retour en haut de la page"
                className="focus-rd inline-flex items-center gap-1.5 font-semibold text-white/70 transition-colors hover:text-white"
              >
                Haut de page
                <ArrowUp className="size-3.5 text-rouge" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
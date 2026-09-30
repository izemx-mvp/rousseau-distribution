import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getProduct } from "@/data/products";
import { getProductImage } from "@/lib/product-image";
import { useQuote } from "@/lib/quote-store";
import { site, sectors, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.png";

const contactSearchSchema = z.object({
  piece: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: contactSearchSchema,
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: "description",
        content:
          "Contactez Rousseau Distribution pour une demande de devis sur une pièce de rechange industrielle : roulements, courroies, moteurs, transmission.",
      },
      { property: "og:title", content: `Contact — ${site.name}` },
      {
        property: "og:description",
        content: "Demandez un devis pour vos pièces de rechange industrielles.",
      },
    ],
  }),
  component: ContactPage,
});

interface FormValues {
  nom: string;
  societe: string;
  email: string;
  telephone: string;
  secteur: string;
  references: string;
  message: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

// Envoie la demande de devis. Peut être ultérieurement raccordée à une table
// backend (ex. Supabase / API interne) pour la persistance des demandes.
async function submitQuoteRequest(payload: FormValues & { items: string[] }): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info("Demande de devis simulée :", payload);
}

const initialValues: FormValues = {
  nom: "",
  societe: "",
  email: "",
  telephone: "",
  secteur: "",
  references: "",
  message: "",
  consent: false,
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.nom.trim()) errors.nom = "Votre nom est requis.";
  if (!values.email.trim()) {
    errors.email = "Votre email est requis.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Format d'email invalide.";
  }
  if (!values.message.trim()) errors.message = "Merci de préciser votre demande.";
  if (!values.consent) errors.consent = "Merci d'accepter d'être recontacté.";
  return errors;
}

const steps = [
  {
    title: "Vous nous écrivez",
    text: "Référence, photo ou caractéristiques de la pièce recherchée.",
  },
  {
    title: "Nous identifions",
    text: "Notre équipe technique retrouve la référence ou son équivalence.",
  },
  {
    title: "Nous vous répondons",
    text: "Vous recevez une proposition adaptée à votre besoin.",
  },
];

const faqItems = [
  {
    q: "Quels sont les délais de livraison ?",
    a: "Les délais dépendent de la disponibilité de la pièce et de son origine. Nous vous communiquons une estimation dès l'analyse de votre demande.",
  },
  {
    q: "Comment fonctionne votre sourcing international ?",
    a: "Nous mobilisons un réseau de partenaires et de fabricants à l'international pour identifier la pièce correspondant à votre besoin, avec un contrôle avant expédition.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Envoyez-nous la référence, une photo ou les caractéristiques de la pièce via ce formulaire ou WhatsApp : nous revenons vers vous avec une proposition.",
  },
  {
    q: "Je ne trouve pas ma référence, que faire ?",
    a: "Transmettez-nous une photo, un plan ou la plaque signalétique de votre machine : notre équipe technique identifie la pièce ou son équivalence.",
  },
];

function ContactPage() {
  const search = Route.useSearch();
  const { items, remove, clear } = useQuote();
  const reduced = useReducedMotion();

  const referencesFromQuote = useMemo(() => {
    const quoteLines = items.map(
      (i) => `${i.reference} — ${i.designation} (${i.brand}) × ${i.quantity}`,
    );
    const lines = [...quoteLines];
    if (search.piece) lines.push(search.piece);
    return lines.join("\n");
  }, [items, search.piece]);

  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    references: referencesFromQuote,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedItems, setSubmittedItems] = useState<string[]>([]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, references: referencesFromQuote }));
  }, [referencesFromQuote]);

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      nom: true,
      societe: true,
      email: true,
      telephone: true,
      secteur: true,
      references: true,
      message: true,
      consent: true,
    });
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const quoteItemLabels = items.map((i) => `${i.reference} — ${i.designation}`);
    try {
      await submitQuoteRequest({ ...values, items: quoteItemLabels });
      setSubmittedItems(quoteItemLabels);
      setSuccess(true);
      clear();
    } finally {
      setSubmitting(false);
    }
  }

  const contactRows = [
    {
      icon: Phone,
      label: "Téléphone",
      content: (
        <a href={`tel:${site.contact.phone}`} className="focus-rd hover:underline">
          {site.contact.phoneDisplay}
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      content: (
        <a href={`mailto:${site.contact.email}`} className="focus-rd break-all hover:underline">
          {site.contact.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      label: "Adresse",
      content: (
        <span>
          {site.contact.address}
          <br />
          {site.contact.city}
        </span>
      ),
    },
    {
      icon: Clock,
      label: "Horaires",
      content: <span>{site.contact.hours}</span>,
    },
  ];

  return (
    <div>
      <PageHero
        title="Contact"
        subtitle="Demande de devis"
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Contact" }]}
      >
        {/* fast paths for people who prefer not to fill the form */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${site.contact.phone}`}
            className="focus-rd inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-navy"
          >
            <Phone className="size-4" />
            Appeler
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="focus-rd inline-flex items-center gap-2 rounded-lg bg-rouge px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="section-y bg-background">
        {/* process: what happens after sending */}
        <RevealGroup
          className="container-rd mb-12 grid gap-4 md:grid-cols-3"
          stagger={0.1}
        >
          {steps.map((step, i) => (
            <RevealItem key={step.title}>
              <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-surface/60 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-ink">
                    {step.text}
                  </span>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="container-rd grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="card-rd relative overflow-visible p-7 md:p-10">
            <span className="absolute top-0 left-0 h-[3px] w-24 bg-rouge" aria-hidden />
            <AnimatePresence mode="wait">
              {success ? (
                <SuccessState key="success" items={submittedItems} />
              ) : (
                <motion.form
                  key="form"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl leading-tight text-navy">Décrivez votre besoin</h2>
                    <p className="mt-2 text-sm text-slate-ink">
                      Les champs marqués d'un astérisque sont obligatoires.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FloatingField
                      id="nom"
                      label="Nom complet"
                      value={values.nom}
                      onChange={(v) => updateField("nom", v)}
                      onBlur={() => handleBlur("nom")}
                      error={touched.nom ? errors.nom : undefined}
                      required
                    />
                    <FloatingField
                      id="societe"
                      label="Société"
                      value={values.societe}
                      onChange={(v) => updateField("societe", v)}
                      onBlur={() => handleBlur("societe")}
                    />
                    <FloatingField
                      id="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={(v) => updateField("email", v)}
                      onBlur={() => handleBlur("email")}
                      error={touched.email ? errors.email : undefined}
                      required
                    />
                    <FloatingField
                      id="telephone"
                      label="Téléphone"
                      type="tel"
                      value={values.telephone}
                      onChange={(v) => updateField("telephone", v)}
                      onBlur={() => handleBlur("telephone")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="secteur"
                      className="mb-2 block text-xs font-bold tracking-wide text-slate-ink uppercase"
                    >
                      Secteur d'activité
                    </label>
                    <select
                      id="secteur"
                      value={values.secteur}
                      onChange={(e) => updateField("secteur", e.target.value)}
                      onBlur={() => handleBlur("secteur")}
                      className="focus-rd w-full rounded-lg border border-surface-line bg-background px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-rouge"
                    >
                      <option value="">Sélectionner un secteur</option>
                      {sectors.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* items coming from the quote list, with thumbnails */}
                  <AnimatePresence initial={false}>
                    {items.length > 0 && (
                      <motion.div
                        key="quote-items"
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mb-2 text-xs font-bold tracking-wide text-slate-ink uppercase">
                          Pièces ajoutées à votre demande
                        </p>
                        <ul className="space-y-2">
                          {items.map((item) => {
                            const product = getProduct(item.reference);
                            const img = product ? getProductImage(product) : null;
                            return (
                              <li
                                key={item.reference}
                                className="flex items-center gap-3 rounded-lg border border-surface-line bg-surface p-2.5 pr-3"
                              >
                                {img && (
                                  <span
                                    className={cn(
                                      "size-12 shrink-0 overflow-hidden rounded-md",
                                      img.specific ? "bg-background" : "bg-navy-deep",
                                    )}
                                  >
                                    <img
                                      src={img.src}
                                      alt=""
                                      loading="lazy"
                                      decoding="async"
                                      className={cn(
                                        "size-full",
                                        img.specific ? "object-contain p-1" : "object-cover",
                                      )}
                                    />
                                  </span>
                                )}
                                <span className="min-w-0 flex-1">
                                  <span className="mono-ref block text-xs font-bold text-navy">
                                    {item.reference}
                                  </span>
                                  <span className="block truncate text-xs text-slate-ink">
                                    {item.designation} × {item.quantity}
                                  </span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => remove(item.reference)}
                                  aria-label={`Retirer ${item.reference} de la demande`}
                                  className="focus-rd rounded-md p-1.5 text-slate-ink transition-colors hover:bg-rouge/10 hover:text-rouge"
                                >
                                  <X className="size-4" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <FloatingTextarea
                    id="references"
                    label="Références / pièces recherchées"
                    value={values.references}
                    onChange={(v) => updateField("references", v)}
                    onBlur={() => handleBlur("references")}
                    rows={3}
                  />

                  <FloatingTextarea
                    id="message"
                    label="Votre message"
                    value={values.message}
                    onChange={(v) => updateField("message", v)}
                    onBlur={() => handleBlur("message")}
                    error={touched.message ? errors.message : undefined}
                    rows={4}
                    required
                  />

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-ink">
                      <input
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                        onBlur={() => handleBlur("consent")}
                        aria-invalid={touched.consent && Boolean(errors.consent)}
                        aria-describedby={
                          touched.consent && errors.consent ? "consent-error" : undefined
                        }
                        className="focus-rd mt-0.5 size-4 rounded border-surface-line text-rouge accent-rouge"
                      />
                      <span>
                        J'accepte d'être recontacté(e) par Rousseau Distribution au sujet de ma
                        demande.
                      </span>
                    </label>
                    <AnimatePresence>
                      {touched.consent && errors.consent && (
                        <motion.p
                          id="consent-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 text-xs text-rouge"
                        >
                          {errors.consent}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group focus-rd inline-flex w-full items-center justify-center gap-2 rounded-lg bg-rouge px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rouge disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <span
                          className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                          aria-hidden
                        />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Coordinates panel */}
          <div className="relative overflow-hidden rounded-2xl bg-navy-deep p-8 text-white md:p-10 lg:sticky lg:top-28">
            <img
              src={heroBg}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/80 to-navy-deep" />
            <div className="blueprint absolute inset-0 opacity-60" />
            <div className="relative">
              <h2 className="text-2xl leading-tight">Nos coordonnées</h2>
              <span className="swoosh mt-4" />

              <ul className="mt-8 space-y-2 text-sm">
                {contactRows.map((row) => (
                  <li
                    key={row.label}
                    className="-mx-3 flex items-start gap-4 rounded-xl p-3 transition-colors duration-300 hover:bg-white/5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-rouge">
                      <row.icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold tracking-wide text-white/50 uppercase">
                        {row.label}
                      </span>
                      <span className="mt-0.5 block leading-relaxed text-white/90">
                        {row.content}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* map placeholder with a pulsing pin */}
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-xl border border-white/15">
                <div className="blueprint absolute inset-0" />
                <div className="absolute inset-0 bg-navy-deep/40" />
                <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-rouge/60" />
                  <span className="relative inline-flex size-3 rounded-full bg-rouge" />
                </span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[130%]">
                  <MapPin className="size-9 text-rouge drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" />
                </div>
                <span className="absolute right-3 bottom-3 text-[11px] tracking-wide text-white/50 uppercase">
                  Localisation à confirmer
                </span>
              </div>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="focus-rd mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/20"
              >
                <MessageCircle className="size-4" />
                Écrire sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: heading on the left, card-style accordion on the right */}
      <section className="section-y bg-surface">
        <div className="container-rd grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl text-navy md:text-4xl">Questions fréquentes</h2>
            <span className="swoosh mt-5" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-ink">
              Une question qui n'est pas listée ? Écrivez-nous directement, nous vous répondons avec
              plaisir.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-rd mt-6 inline-flex items-center gap-2 rounded-lg border border-navy/20 px-5 py-3 text-sm font-bold text-navy transition-colors duration-300 hover:border-rouge/40 hover:text-rouge"
            >
              <MessageCircle className="size-4" />
              Poser une question
            </a>
          </Reveal>

          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="mb-3 rounded-xl border border-border bg-background px-5 transition-all duration-300 data-[state=open]:border-rouge/40 data-[state=open]:shadow-soft"
              >
                <AccordionTrigger className="text-left text-navy hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-slate-ink">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function SuccessState({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-10 text-center"
    >
      <svg viewBox="0 0 80 80" className="size-20" aria-hidden>
        <motion.circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="var(--rouge)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.path
          d="M24 41 L35 52 L57 28"
          fill="none"
          stroke="var(--rouge)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
        />
      </svg>

      <h2 className="mt-6 text-2xl text-navy">Merci, nous revenons vers vous rapidement</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-ink">
        Votre demande a bien été transmise à notre équipe technique. Nous l'analysons et vous
        recontactons dans les meilleurs délais.
      </p>

      {items.length > 0 && (
        <div className="mt-6 w-full max-w-sm rounded-lg border border-surface-line bg-surface p-4 text-left">
          <p className="mb-2 text-xs font-bold tracking-wide text-slate-ink uppercase">
            Pièces demandées
          </p>
          <ul className="space-y-1 text-sm text-navy">
            {items.map((it) => (
              <li key={it} className="mono-ref">
                {it}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/catalogue"
          className="focus-rd inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
        >
          Retour au catalogue
        </Link>
        <Link
          to="/blog"
          className="focus-rd inline-flex items-center justify-center rounded-lg border border-navy/20 px-6 py-3.5 text-sm font-bold text-navy transition-colors duration-300 hover:border-rouge/40 hover:text-rouge"
        >
          Lire nos guides
        </Link>
      </div>
    </motion.div>
  );
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string | undefined;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "focus-rd peer w-full rounded-lg border bg-background px-4 pt-5 pb-2 text-sm text-navy outline-none transition-colors",
          error ? "border-rouge" : "border-surface-line focus:border-rouge",
        )}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-[11px] font-medium text-slate-ink transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-ink/70 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-rouge"
      >
        {label}
        {required && " *"}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-rouge"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  rows = 4,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string | undefined;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        placeholder=" "
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "focus-rd peer w-full resize-none rounded-lg border bg-background px-4 pt-6 pb-2 text-sm text-navy outline-none transition-colors",
          error ? "border-rouge" : "border-surface-line focus:border-rouge",
        )}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-[11px] font-medium text-slate-ink transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-ink/70 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-rouge"
      >
        {label}
        {required && " *"}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-rouge"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
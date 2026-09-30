// Tous les éléments à personnaliser sont centralisés ici.
// PLACEHOLDERS À REMPLACER par les informations réelles de l'entreprise.

export const site = {
  name: "Rousseau Distribution",
  baseline: "Pièces de rechange industrielles",
  url: "https://rousseau-distribution.fr", // PLACEHOLDER
  description:
    "Distributeur de pièces de rechange industrielles : roulements, courroies, moteurs électriques et transmission mécanique. Sourcing international et conseil technique.",

  contact: {
    phone: "+33 0 00 00 00 00", // PLACEHOLDER
    phoneDisplay: "00 00 00 00 00", // PLACEHOLDER
    whatsapp: "33600000000", // PLACEHOLDER (format international sans +)
    whatsappMessage: "Bonjour, je recherche une pièce…",
    email: "contact@rousseau-distribution.fr", // PLACEHOLDER
    address: "Adresse à compléter", // PLACEHOLDER
    city: "Ville, France", // PLACEHOLDER
    hours: "Horaires à compléter", // PLACEHOLDER
  },

  figures: [
    { value: 5000, suffix: "+", label: "références disponibles", icon: "boxes" }, // PLACEHOLDER
    { value: 8, suffix: "", label: "secteurs servis", icon: "factory" }, // PLACEHOLDER
    { value: 15, suffix: " ans", label: "d'expérience", icon: "award" }, // PLACEHOLDER
    { value: 48, suffix: "h", label: "délai moyen indicatif", icon: "truck" }, // PLACEHOLDER
  ],

  foundingYear: "XXXX", // PLACEHOLDER

  brands: [
    "Marque 1",
    "Marque 2",
    "Marque 3",
    "Marque 4",
    "Marque 5",
    "Marque 6",
    "Marque 7",
    "Marque 8",
  ], // PLACEHOLDER — à remplacer par les logos des marques distribuées
} as const;

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${site.contact.whatsapp}?text=${text}`;
}

export const navigation = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/a-propos" },
  { label: "Catalogue", to: "/catalogue" },
  { label: "Secteurs", to: "/secteurs" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export const sectors = [
  {
    id: "agroalimentaire",
    label: "Agroalimentaire",
    caption: "Roulements inox, courroies alimentaires, motoréducteurs de convoyage.",
    text: "Les lignes agroalimentaires imposent des contraintes de nettoyage, d'humidité et de cadence. Nous intervenons sur les organes de convoyage, de dosage et de conditionnement.",
    parts: [
      "Roulements et paliers inox ou étanches",
      "Courroies de convoyage et poly-V",
      "Motoréducteurs et variateurs",
      "Accouplements et pignons",
    ],
  },
  {
    id: "pharmaceutique",
    label: "Pharmaceutique",
    caption: "Transmissions précises, pièces propres, traçabilité des références.",
    text: "Les équipements pharmaceutiques demandent une identification rigoureuse des références et des pièces adaptées aux environnements contrôlés.",
    parts: [
      "Roulements de précision",
      "Courroies synchrones",
      "Moteurs IE3 faible bruit",
      "Accouplements sans jeu",
    ],
  },
  {
    id: "manufacturiere",
    label: "Industrie manufacturière",
    caption: "Moteurs, réducteurs, roulements de broche et de convoyeur.",
    text: "Machines-outils, lignes d'assemblage et convoyeurs : nous couvrons les organes mécaniques et électriques les plus sollicités.",
    parts: [
      "Moteurs triphasés 0,75 à 11 kW",
      "Roulements à billes et à rouleaux",
      "Chaînes et pignons",
      "Poulies et moyeux amovibles",
    ],
  },
  {
    id: "emballage",
    label: "Emballage",
    caption: "Courroies synchrones, poulies, roulements de guidage.",
    text: "Les machines d'emballage combinent cadences élevées et synchronisation fine. Les organes de transmission y sont critiques.",
    parts: [
      "Courroies HTD et AT",
      "Poulies dentées",
      "Roulements de galets",
      "Accouplements élastiques",
    ],
  },
  {
    id: "energie",
    label: "Énergie",
    caption: "Roulements de forte capacité, moteurs, transmissions robustes.",
    text: "Installations de production et de distribution : les pièces doivent supporter des charges continues et des environnements exigeants.",
    parts: [
      "Roulements à rouleaux cylindriques",
      "Paliers appliques",
      "Moteurs IP55",
      "Réducteurs",
    ],
  },
  {
    id: "autres",
    label: "Autres secteurs",
    caption: "Une pièce à identifier ? Nous recherchons la référence pour vous.",
    text: "Nous travaillons avec des industriels de tous secteurs. Si votre besoin ne figure pas dans cette liste, transmettez-nous la référence ou une photo de la pièce.",
    parts: [
      "Recherche de référence sur photo ou plan",
      "Équivalences entre marques",
      "Sourcing international",
      "Conseil technique",
    ],
  },
] as const;

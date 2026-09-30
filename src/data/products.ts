// CONTENU EXEMPLE À REMPLACER — catalogue de démonstration
// Ce fichier simule une source de données (à remplacer plus tard par un appel API / une base de données).

export type ProductFamily = "roulements" | "courroies" | "moteurs" | "transmission";

export interface Product {
  reference: string;
  designation: string;
  brand: string;
  family: ProductFamily;
  subcategory: string;
  specs: { label: string; value: string }[];
  description: string;
}

export const FAMILIES: { id: ProductFamily; label: string; slug: string; description: string }[] = [
  {
    id: "roulements",
    label: "Roulements",
    slug: "roulements",
    description:
      "Roulements à billes, à rouleaux et paliers pour applications industrielles courantes et exigeantes.",
  },
  {
    id: "courroies",
    label: "Courroies",
    slug: "courroies",
    description:
      "Courroies trapézoïdales, poly-V et synchrones pour la transmission de puissance par lien flexible.",
  },
  {
    id: "moteurs",
    label: "Moteurs électriques",
    slug: "moteurs",
    description:
      "Moteurs asynchrones triphasés IE3, toutes puissances et formats de fixation, pour usage industriel.",
  },
  {
    id: "transmission",
    label: "Organes de transmission",
    slug: "transmission",
    description:
      "Accouplements, chaînes, pignons, poulies et réducteurs pour la transmission mécanique de puissance.",
  },
];

export const products: Product[] = [
  // ---------------------- ROULEMENTS (16) ----------------------
  {
    reference: "6205-2RS",
    designation: "Roulement à billes à contact radial étanche",
    brand: "Rousseau Select",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "25 mm" },
      { label: "Diamètre extérieur", value: "52 mm" },
      { label: "Largeur", value: "15 mm" },
      { label: "Étanchéité", value: "2RS (double joint)" },
      { label: "Vitesse limite", value: "14000 tr/min" },
    ],
    description:
      "Roulement rigide à billes à une rangée, étanchéité intégrale par joints de contact, adapté aux applications générales de mécanique et de manutention.",
  },
  {
    reference: "6305-ZZ",
    designation: "Roulement à billes à flasques métalliques",
    brand: "RollFit",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "25 mm" },
      { label: "Diamètre extérieur", value: "62 mm" },
      { label: "Largeur", value: "17 mm" },
      { label: "Étanchéité", value: "ZZ (flasques métalliques)" },
      { label: "Vitesse limite", value: "12000 tr/min" },
    ],
    description:
      "Roulement rigide à billes protégé par flasques métalliques, destiné aux environnements peu chargés en contamination.",
  },
  {
    reference: "6206-2RS",
    designation: "Roulement à billes à contact radial étanche",
    brand: "Rousseau Select",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "30 mm" },
      { label: "Diamètre extérieur", value: "62 mm" },
      { label: "Largeur", value: "16 mm" },
      { label: "Étanchéité", value: "2RS (double joint)" },
      { label: "Vitesse limite", value: "11000 tr/min" },
    ],
    description:
      "Roulement rigide à billes à double étanchéité, utilisé couramment sur ventilateurs, pompes et convoyeurs légers.",
  },
  {
    reference: "6008-2RS",
    designation: "Roulement à billes à section fine étanche",
    brand: "RollFit",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "40 mm" },
      { label: "Diamètre extérieur", value: "68 mm" },
      { label: "Largeur", value: "15 mm" },
      { label: "Étanchéité", value: "2RS" },
      { label: "Vitesse limite", value: "9500 tr/min" },
    ],
    description:
      "Roulement de série fine à faible encombrement radial, adapté aux logements de diamètre extérieur restreint.",
  },
  {
    reference: "32010-X",
    designation: "Roulement à rouleaux coniques",
    brand: "Indus Line",
    family: "roulements",
    subcategory: "Roulement à rouleaux coniques",
    specs: [
      { label: "Diamètre intérieur", value: "50 mm" },
      { label: "Diamètre extérieur", value: "80 mm" },
      { label: "Largeur", value: "20 mm" },
      { label: "Angle de contact", value: "13°" },
      { label: "Charge dynamique de base", value: "68 kN" },
    ],
    description:
      "Roulement à rouleaux coniques supportant des charges radiales et axiales combinées, typique des moyeux et réducteurs.",
  },
  {
    reference: "22210-E1",
    designation: "Roulement à rotule sur rouleaux",
    brand: "Indus Line",
    family: "roulements",
    subcategory: "Roulement à rotule",
    specs: [
      { label: "Diamètre intérieur", value: "50 mm" },
      { label: "Diamètre extérieur", value: "90 mm" },
      { label: "Largeur", value: "23 mm" },
      { label: "Auto-alignement", value: "± 1,5°" },
      { label: "Charge dynamique de base", value: "94 kN" },
    ],
    description:
      "Roulement à rotule sur deux rangées de rouleaux, tolérant les désalignements angulaires et les charges élevées.",
  },
  {
    reference: "UCP205",
    designation: "Palier à semelle avec roulement à billes",
    brand: "Rousseau Select",
    family: "roulements",
    subcategory: "Palier",
    specs: [
      { label: "Alésage", value: "25 mm" },
      { label: "Type de fixation", value: "Semelle 2 trous" },
      { label: "Matériau du corps", value: "Fonte" },
      { label: "Blocage", value: "Vis pointeau" },
    ],
    description:
      "Palier complet à semelle intégrant un roulement à billes auto-aligneur, prêt à monter sur bâti pour arbres horizontaux.",
  },
  {
    reference: "UCFL206",
    designation: "Palier ovale avec roulement à billes",
    brand: "RollFit",
    family: "roulements",
    subcategory: "Palier",
    specs: [
      { label: "Alésage", value: "30 mm" },
      { label: "Type de fixation", value: "Ovale 2 trous" },
      { label: "Matériau du corps", value: "Fonte" },
      { label: "Blocage", value: "Vis pointeau" },
    ],
    description:
      "Palier ovale destiné aux fixations en applique, utilisé sur convoyeurs et arbres de transmission légers.",
  },
  {
    reference: "NU309-E",
    designation: "Roulement à rouleaux cylindriques",
    brand: "Indus Line",
    family: "roulements",
    subcategory: "Roulement à rouleaux cylindriques",
    specs: [
      { label: "Diamètre intérieur", value: "45 mm" },
      { label: "Diamètre extérieur", value: "100 mm" },
      { label: "Largeur", value: "25 mm" },
      { label: "Bague intérieure", value: "Amovible" },
      { label: "Charge dynamique de base", value: "112 kN" },
    ],
    description:
      "Roulement à rouleaux cylindriques à bague intérieure libre en translation axiale, adapté aux charges radiales élevées.",
  },
  {
    reference: "51106",
    designation: "Butée à billes simple effet",
    brand: "RollFit",
    family: "roulements",
    subcategory: "Butée à billes",
    specs: [
      { label: "Diamètre intérieur", value: "30 mm" },
      { label: "Diamètre extérieur", value: "47 mm" },
      { label: "Hauteur", value: "11 mm" },
      { label: "Sens de charge", value: "Axial simple effet" },
    ],
    description:
      "Butée à billes conçue pour reprendre des charges axiales unidirectionnelles à vitesse modérée.",
  },
  {
    reference: "6002-2RS",
    designation: "Roulement à billes miniature étanche",
    brand: "Rousseau Select",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "15 mm" },
      { label: "Diamètre extérieur", value: "32 mm" },
      { label: "Largeur", value: "9 mm" },
      { label: "Étanchéité", value: "2RS" },
    ],
    description:
      "Roulement compact à billes étanche, adapté aux petits moteurs, pompes et mécanismes de faible encombrement.",
  },
  {
    reference: "6407-ZZ",
    designation: "Roulement à billes à série lourde",
    brand: "Indus Line",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "35 mm" },
      { label: "Diamètre extérieur", value: "100 mm" },
      { label: "Largeur", value: "25 mm" },
      { label: "Étanchéité", value: "ZZ" },
      { label: "Charge dynamique de base", value: "58,5 kN" },
    ],
    description:
      "Roulement rigide à billes de série lourde, destiné aux applications à charges radiales importantes.",
  },
  {
    reference: "NJ308-E",
    designation: "Roulement à rouleaux cylindriques à bague amovible",
    brand: "Indus Line",
    family: "roulements",
    subcategory: "Roulement à rouleaux cylindriques",
    specs: [
      { label: "Diamètre intérieur", value: "40 mm" },
      { label: "Diamètre extérieur", value: "90 mm" },
      { label: "Largeur", value: "23 mm" },
      { label: "Guidage axial", value: "Une direction" },
    ],
    description:
      "Roulement à rouleaux cylindriques permettant un guidage axial dans un sens, utilisé sur arbres de broches et réducteurs.",
  },
  {
    reference: "23222-E1",
    designation: "Roulement à rotule sur rouleaux série lourde",
    brand: "Indus Line",
    family: "roulements",
    subcategory: "Roulement à rotule",
    specs: [
      { label: "Diamètre intérieur", value: "110 mm" },
      { label: "Diamètre extérieur", value: "200 mm" },
      { label: "Largeur", value: "69,8 mm" },
      { label: "Auto-alignement", value: "± 1,5°" },
    ],
    description:
      "Roulement à rotule de forte capacité destiné aux applications lourdes telles que broyeurs et convoyeurs industriels.",
  },
  {
    reference: "UCT210",
    designation: "Palier à cartouche avec roulement à billes",
    brand: "Rousseau Select",
    family: "roulements",
    subcategory: "Palier",
    specs: [
      { label: "Alésage", value: "50 mm" },
      { label: "Type de fixation", value: "Cartouche cylindrique" },
      { label: "Matériau du corps", value: "Fonte" },
      { label: "Blocage", value: "Vis pointeau" },
    ],
    description:
      "Palier à cartouche pour montage dans un logement usiné, avec roulement à billes auto-aligneur intégré.",
  },
  {
    reference: "16008-2RS",
    designation: "Roulement à billes à section extra-fine étanche",
    brand: "RollFit",
    family: "roulements",
    subcategory: "Roulement à billes",
    specs: [
      { label: "Diamètre intérieur", value: "40 mm" },
      { label: "Diamètre extérieur", value: "68 mm" },
      { label: "Largeur", value: "9 mm" },
      { label: "Étanchéité", value: "2RS" },
    ],
    description:
      "Roulement à section extra-fine, employé dans les mécanismes nécessitant un faible encombrement axial.",
  },

  // ---------------------- COURROIES (16) ----------------------
  {
    reference: "SPB 1600",
    designation: "Courroie trapézoïdale étroite section SPB",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "SPB" },
      { label: "Longueur primitive", value: "1600 mm" },
      { label: "Largeur", value: "16,3 mm" },
      { label: "Hauteur", value: "13 mm" },
    ],
    description:
      "Courroie trapézoïdale étroite renforcée, destinée aux transmissions de puissance à entraxes courts et moyens.",
  },
  {
    reference: "SPB 2120",
    designation: "Courroie trapézoïdale étroite section SPB",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "SPB" },
      { label: "Longueur primitive", value: "2120 mm" },
      { label: "Largeur", value: "16,3 mm" },
      { label: "Hauteur", value: "13 mm" },
    ],
    description:
      "Courroie trapézoïdale étroite de grande longueur, utilisée sur transmissions industrielles à fort entraxe.",
  },
  {
    reference: "XPB 1250",
    designation: "Courroie trapézoïdale étroite crantée section XPB",
    brand: "TransmiPro",
    family: "courroies",
    subcategory: "Courroie trapézoïdale crantée",
    specs: [
      { label: "Section", value: "XPB" },
      { label: "Longueur primitive", value: "1250 mm" },
      { label: "Largeur", value: "16,3 mm" },
      { label: "Construction", value: "Crantée" },
    ],
    description:
      "Courroie crantée à haute flexibilité réduisant les pertes par flexion, adaptée aux poulies de petit diamètre.",
  },
  {
    reference: "SPA 1320",
    designation: "Courroie trapézoïdale étroite section SPA",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "SPA" },
      { label: "Longueur primitive", value: "1320 mm" },
      { label: "Largeur", value: "12,7 mm" },
      { label: "Hauteur", value: "10 mm" },
    ],
    description:
      "Courroie trapézoïdale étroite de section SPA, adaptée aux transmissions de puissance moyenne.",
  },
  {
    reference: "PJ 508",
    designation: "Courroie poly-V section PJ",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie poly-V",
    specs: [
      { label: "Section", value: "PJ" },
      { label: "Nombre de nervures", value: "6" },
      { label: "Longueur", value: "508 mm" },
    ],
    description:
      "Courroie poly-V multi-nervures à faible bruit de fonctionnement, utilisée sur entraînements auxiliaires et ventilateurs.",
  },
  {
    reference: "8PJ 1016",
    designation: "Courroie poly-V section PJ 8 nervures",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie poly-V",
    specs: [
      { label: "Section", value: "PJ" },
      { label: "Nombre de nervures", value: "8" },
      { label: "Longueur", value: "1016 mm" },
    ],
    description:
      "Courroie poly-V à huit nervures offrant une capacité de transmission élevée pour un encombrement réduit.",
  },
  {
    reference: "HTD 8M-1600",
    designation: "Courroie synchrone dentée profil HTD",
    brand: "TransmiPro",
    family: "courroies",
    subcategory: "Courroie synchrone",
    specs: [
      { label: "Profil", value: "HTD 8M" },
      { label: "Pas", value: "8 mm" },
      { label: "Longueur", value: "1600 mm" },
      { label: "Largeur disponible", value: "20 à 85 mm" },
    ],
    description:
      "Courroie synchrone à profil HTD assurant une transmission sans glissement, adaptée aux mouvements synchronisés précis.",
  },
  {
    reference: "AT10-1000",
    designation: "Courroie synchrone dentée profil AT",
    brand: "TransmiPro",
    family: "courroies",
    subcategory: "Courroie synchrone",
    specs: [
      { label: "Profil", value: "AT10" },
      { label: "Pas", value: "10 mm" },
      { label: "Longueur", value: "1000 mm" },
      { label: "Largeur disponible", value: "25 à 50 mm" },
    ],
    description:
      "Courroie synchrone renforcée profil AT, destinée aux applications de forte charge nécessitant un positionnement précis.",
  },
  {
    reference: "SPC 3000",
    designation: "Courroie trapézoïdale étroite section SPC",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "SPC" },
      { label: "Longueur primitive", value: "3000 mm" },
      { label: "Largeur", value: "22 mm" },
      { label: "Hauteur", value: "18 mm" },
    ],
    description:
      "Courroie trapézoïdale de forte section destinée aux transmissions de puissance élevée sur grands entraxes.",
  },
  {
    reference: "Z 850",
    designation: "Courroie trapézoïdale classique section Z",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "Z" },
      { label: "Longueur primitive", value: "850 mm" },
      { label: "Largeur", value: "10 mm" },
      { label: "Hauteur", value: "6 mm" },
    ],
    description:
      "Courroie trapézoïdale classique de petite section, utilisée sur petits moteurs et machines agricoles.",
  },
  {
    reference: "A 1180",
    designation: "Courroie trapézoïdale classique section A",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "A" },
      { label: "Longueur primitive", value: "1180 mm" },
      { label: "Largeur", value: "13 mm" },
      { label: "Hauteur", value: "8 mm" },
    ],
    description:
      "Courroie trapézoïdale de section classique A, adaptée aux transmissions industrielles standard.",
  },
  {
    reference: "B 2500",
    designation: "Courroie trapézoïdale classique section B",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie trapézoïdale",
    specs: [
      { label: "Section", value: "B" },
      { label: "Longueur primitive", value: "2500 mm" },
      { label: "Largeur", value: "17 mm" },
      { label: "Hauteur", value: "11 mm" },
    ],
    description:
      "Courroie trapézoïdale classique de section B, utilisée sur compresseurs et ventilateurs industriels.",
  },
  {
    reference: "HTD 5M-450",
    designation: "Courroie synchrone dentée profil HTD",
    brand: "TransmiPro",
    family: "courroies",
    subcategory: "Courroie synchrone",
    specs: [
      { label: "Profil", value: "HTD 5M" },
      { label: "Pas", value: "5 mm" },
      { label: "Longueur", value: "450 mm" },
      { label: "Largeur disponible", value: "15 à 25 mm" },
    ],
    description:
      "Courroie synchrone de petit pas HTD, adaptée aux mécanismes compacts de positionnement.",
  },
  {
    reference: "XPA 1000",
    designation: "Courroie trapézoïdale étroite crantée section XPA",
    brand: "TransmiPro",
    family: "courroies",
    subcategory: "Courroie trapézoïdale crantée",
    specs: [
      { label: "Section", value: "XPA" },
      { label: "Longueur primitive", value: "1000 mm" },
      { label: "Largeur", value: "12,7 mm" },
      { label: "Construction", value: "Crantée" },
    ],
    description:
      "Courroie crantée section XPA offrant une bonne flexibilité et une réduction de l'échauffement en fonctionnement.",
  },
  {
    reference: "PK 1270",
    designation: "Courroie poly-V section PK",
    brand: "BeltCore",
    family: "courroies",
    subcategory: "Courroie poly-V",
    specs: [
      { label: "Section", value: "PK" },
      { label: "Nombre de nervures", value: "5" },
      { label: "Longueur", value: "1270 mm" },
    ],
    description:
      "Courroie poly-V de section PK utilisée sur les entraînements d'accessoires automobiles et industriels légers.",
  },
  {
    reference: "AT5-660",
    designation: "Courroie synchrone dentée profil AT",
    brand: "TransmiPro",
    family: "courroies",
    subcategory: "Courroie synchrone",
    specs: [
      { label: "Profil", value: "AT5" },
      { label: "Pas", value: "5 mm" },
      { label: "Longueur", value: "660 mm" },
      { label: "Largeur disponible", value: "10 à 25 mm" },
    ],
    description:
      "Courroie synchrone légère profil AT5, destinée aux mécanismes de faible puissance nécessitant précision et fiabilité.",
  },

  // ---------------------- MOTEURS (14) ----------------------
  {
    reference: "MT-IE3-0.75-B3-4P",
    designation: "Moteur triphasé asynchrone IE3 0,75 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "0,75 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B3" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur asynchrone triphasé à haut rendement IE3, carcasse B3 sur pieds, adapté aux applications de pompage et ventilation légères.",
  },
  {
    reference: "MT-IE3-1.1-B5-4P",
    designation: "Moteur triphasé asynchrone IE3 1,1 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "1,1 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B5" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur triphasé IE3 à bride B5, conçu pour montage direct sur réducteur ou machine sans support pied.",
  },
  {
    reference: "MT-IE3-1.5-B3-2P",
    designation: "Moteur triphasé asynchrone IE3 1,5 kW rapide",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "1,5 kW" },
      { label: "Vitesse", value: "3000 tr/min (2 pôles)" },
      { label: "Forme de fixation", value: "B3" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur rapide bipolaire IE3 destiné aux applications nécessitant une vitesse de rotation élevée telles que pompes centrifuges.",
  },
  {
    reference: "MT-IE3-2.2-B14-4P",
    designation: "Moteur triphasé asynchrone IE3 2,2 kW petite bride",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "2,2 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B14" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur IE3 à petite bride B14, compact, destiné aux motoréducteurs et équipements de faible encombrement.",
  },
  {
    reference: "MT-IE3-3-B35-4P",
    designation: "Moteur triphasé asynchrone IE3 3 kW pieds-bride",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "3 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B35" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur triphasé combiné pieds et bride B35, offrant une flexibilité de montage sur bâti ou réducteur.",
  },
  {
    reference: "MT-IE3-4-B3-4P",
    designation: "Moteur triphasé asynchrone IE3 4 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "4 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B3" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur triphasé IE3 de puissance moyenne, sur pieds, utilisé couramment sur convoyeurs et agitateurs industriels.",
  },
  {
    reference: "MT-IE3-5.5-B5-4P",
    designation: "Moteur triphasé asynchrone IE3 5,5 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "5,5 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B5" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur triphasé IE3 à bride, adapté aux applications de compression et de pompage de moyenne puissance.",
  },
  {
    reference: "MT-IE3-7.5-B3-4P",
    designation: "Moteur triphasé asynchrone IE3 7,5 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "7,5 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B3" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur triphasé IE3 haute performance, sur pieds, destiné aux entraînements industriels de puissance intermédiaire.",
  },
  {
    reference: "MT-IE3-9.2-B5-4P",
    designation: "Moteur triphasé asynchrone IE3 9,2 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "9,2 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B5" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "400 V" },
    ],
    description:
      "Moteur triphasé IE3 de forte puissance à bride, conçu pour un couplage direct sur des réducteurs industriels.",
  },
  {
    reference: "MT-IE3-11-B3-4P",
    designation: "Moteur triphasé asynchrone IE3 11 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "11 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B3" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "400 V" },
    ],
    description:
      "Moteur triphasé IE3 haut de gamme sur pieds, adapté aux applications lourdes telles que compresseurs et broyeurs.",
  },
  {
    reference: "MT-IE3-1.5-B14-2P",
    designation: "Moteur triphasé asynchrone IE3 1,5 kW rapide petite bride",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "1,5 kW" },
      { label: "Vitesse", value: "3000 tr/min (2 pôles)" },
      { label: "Forme de fixation", value: "B14" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur rapide IE3 à petite bride, compact, adapté aux applications de pompage centrifuge de faible débit.",
  },
  {
    reference: "MT-IE3-0.37-B3-4P",
    designation: "Moteur triphasé asynchrone IE3 0,37 kW",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "0,37 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B3" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "230/400 V" },
    ],
    description:
      "Moteur triphasé de faible puissance, sur pieds, destiné aux petits équipements et systèmes auxiliaires.",
  },
  {
    reference: "MT-IE3-5.5-B34-4P",
    designation: "Moteur triphasé asynchrone IE3 5,5 kW pieds-bride",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "5,5 kW" },
      { label: "Vitesse", value: "1500 tr/min (4 pôles)" },
      { label: "Forme de fixation", value: "B34" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "400 V" },
    ],
    description:
      "Moteur triphasé IE3 combiné pieds-bride, permettant un montage polyvalent selon les contraintes de l'installation.",
  },
  {
    reference: "MT-IE3-7.5-B5-2P",
    designation: "Moteur triphasé asynchrone IE3 7,5 kW rapide",
    brand: "MotorTech",
    family: "moteurs",
    subcategory: "Moteur triphasé IE3",
    specs: [
      { label: "Puissance", value: "7,5 kW" },
      { label: "Vitesse", value: "3000 tr/min (2 pôles)" },
      { label: "Forme de fixation", value: "B5" },
      { label: "Indice de protection", value: "IP55" },
      { label: "Tension", value: "400 V" },
    ],
    description:
      "Moteur triphasé IE3 rapide à bride, adapté aux pompes centrifuges et compresseurs à haute vitesse.",
  },

  // ---------------------- TRANSMISSION (14) ----------------------
  {
    reference: "ACM-28-ELAST",
    designation: "Accouplement élastique à mâchoires",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Accouplement",
    specs: [
      { label: "Alésage maximal", value: "28 mm" },
      { label: "Couple nominal", value: "95 Nm" },
      { label: "Type d'élément élastique", value: "Étoile polyuréthane" },
      { label: "Désalignement admissible", value: "Angulaire et radial" },
    ],
    description:
      "Accouplement élastique à mâchoires avec élément intermédiaire amortissant, compensant les légers désalignements d'arbres.",
  },
  {
    reference: "ACM-42-ELAST",
    designation: "Accouplement élastique à mâchoires",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Accouplement",
    specs: [
      { label: "Alésage maximal", value: "42 mm" },
      { label: "Couple nominal", value: "270 Nm" },
      { label: "Type d'élément élastique", value: "Étoile polyuréthane" },
      { label: "Désalignement admissible", value: "Angulaire et radial" },
    ],
    description:
      "Accouplement élastique de taille moyenne destiné aux transmissions entre moteur et réducteur en environnement industriel.",
  },
  {
    reference: "CH-08B-1",
    designation: "Chaîne à rouleaux simple 08B-1",
    brand: "Indus Line",
    family: "transmission",
    subcategory: "Chaîne à rouleaux",
    specs: [
      { label: "Pas", value: "12,7 mm" },
      { label: "Type", value: "Simple rangée" },
      { label: "Charge à la rupture", value: "17,8 kN" },
      { label: "Matériau", value: "Acier traité" },
    ],
    description:
      "Chaîne à rouleaux de pas standard 08B, utilisée dans les entraînements mécaniques légers à moyens.",
  },
  {
    reference: "CH-12B-1",
    designation: "Chaîne à rouleaux simple 12B-1",
    brand: "Indus Line",
    family: "transmission",
    subcategory: "Chaîne à rouleaux",
    specs: [
      { label: "Pas", value: "19,05 mm" },
      { label: "Type", value: "Simple rangée" },
      { label: "Charge à la rupture", value: "28,9 kN" },
      { label: "Matériau", value: "Acier traité" },
    ],
    description:
      "Chaîne à rouleaux de pas 12B pour transmissions de puissance moyenne, compatible avec pignons standards ISO.",
  },
  {
    reference: "CH-16B-2",
    designation: "Chaîne à rouleaux double 16B-2",
    brand: "Indus Line",
    family: "transmission",
    subcategory: "Chaîne à rouleaux",
    specs: [
      { label: "Pas", value: "25,4 mm" },
      { label: "Type", value: "Double rangée" },
      { label: "Charge à la rupture", value: "106 kN" },
      { label: "Matériau", value: "Acier traité" },
    ],
    description:
      "Chaîne à rouleaux double rangée, destinée à la transmission de puissances élevées sur machines industrielles lourdes.",
  },
  {
    reference: "PIG-08B-19D",
    designation: "Pignon simple denture pour chaîne 08B",
    brand: "Indus Line",
    family: "transmission",
    subcategory: "Pignon",
    specs: [
      { label: "Nombre de dents", value: "19" },
      { label: "Pas", value: "12,7 mm" },
      { label: "Alésage", value: "Finition à aléser" },
      { label: "Type", value: "Simple denture" },
    ],
    description:
      "Pignon pour chaîne à rouleaux 08B, livré à aléser pour adaptation sur mesure au diamètre de l'arbre.",
  },
  {
    reference: "PIG-12B-21D",
    designation: "Pignon simple denture pour chaîne 12B avec moyeu Taper Lock",
    brand: "Indus Line",
    family: "transmission",
    subcategory: "Pignon",
    specs: [
      { label: "Nombre de dents", value: "21" },
      { label: "Pas", value: "19,05 mm" },
      { label: "Fixation", value: "Moyeu amovible Taper Lock" },
      { label: "Type", value: "Simple denture" },
    ],
    description:
      "Pignon à moyeu amovible compatible douille Taper Lock, facilitant le montage et démontage sans usinage sur site.",
  },
  {
    reference: "POU-SPB-224-4G",
    designation: "Poulie SPB à moyeu amovible 4 gorges",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Poulie",
    specs: [
      { label: "Section", value: "SPB" },
      { label: "Diamètre primitif", value: "224 mm" },
      { label: "Nombre de gorges", value: "4" },
      { label: "Fixation", value: "Moyeu amovible Taper Lock" },
    ],
    description:
      "Poulie multi-gorges section SPB à moyeu amovible, permettant un changement rapide de diamètre d'alésage.",
  },
  {
    reference: "POU-SPA-160-2G",
    designation: "Poulie SPA à moyeu amovible 2 gorges",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Poulie",
    specs: [
      { label: "Section", value: "SPA" },
      { label: "Diamètre primitif", value: "160 mm" },
      { label: "Nombre de gorges", value: "2" },
      { label: "Fixation", value: "Moyeu amovible Taper Lock" },
    ],
    description:
      "Poulie bi-gorge de section SPA à moyeu amovible, adaptée aux transmissions par courroies trapézoïdales étroites.",
  },
  {
    reference: "MOY-TL-1610",
    designation: "Moyeu amovible Taper Lock 1610",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Moyeu Taper Lock",
    specs: [
      { label: "Référence normalisée", value: "1610" },
      { label: "Alésage maximal", value: "42 mm" },
      { label: "Matériau", value: "Fonte" },
      { label: "Fixation", value: "Vis de serrage coniques" },
    ],
    description:
      "Moyeu amovible standardisé Taper Lock assurant une fixation sans jeu sur arbre par serrage conique.",
  },
  {
    reference: "MOY-TL-2012",
    designation: "Moyeu amovible Taper Lock 2012",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Moyeu Taper Lock",
    specs: [
      { label: "Référence normalisée", value: "2012" },
      { label: "Alésage maximal", value: "50 mm" },
      { label: "Matériau", value: "Fonte" },
      { label: "Fixation", value: "Vis de serrage coniques" },
    ],
    description:
      "Moyeu amovible de taille intermédiaire, compatible avec poulies et pignons à moyeu Taper Lock de la même référence.",
  },
  {
    reference: "RED-RV030",
    designation: "Réducteur roue et vis sans fin RV030",
    brand: "MotorTech",
    family: "transmission",
    subcategory: "Réducteur",
    specs: [
      { label: "Rapport de réduction", value: "1:30" },
      { label: "Entraxe", value: "30 mm" },
      { label: "Couple de sortie", value: "12 Nm" },
      { label: "Montage moteur", value: "Bride IEC 63" },
    ],
    description:
      "Réducteur à roue et vis sans fin compact, offrant un fort rapport de réduction avec fonction d'irréversibilité.",
  },
  {
    reference: "RED-RV063",
    designation: "Réducteur roue et vis sans fin RV063",
    brand: "MotorTech",
    family: "transmission",
    subcategory: "Réducteur",
    specs: [
      { label: "Rapport de réduction", value: "1:40" },
      { label: "Entraxe", value: "63 mm" },
      { label: "Couple de sortie", value: "85 Nm" },
      { label: "Montage moteur", value: "Bride IEC 90" },
    ],
    description:
      "Réducteur roue et vis de taille moyenne, destiné aux applications de manutention et convoyage nécessitant un couple élevé.",
  },
  {
    reference: "ACM-19-DENT",
    designation: "Accouplement à denture bombée",
    brand: "TransmiPro",
    family: "transmission",
    subcategory: "Accouplement",
    specs: [
      { label: "Alésage maximal", value: "19 mm" },
      { label: "Couple nominal", value: "60 Nm" },
      { label: "Type", value: "Denture bombée lubrifiée" },
      { label: "Désalignement admissible", value: "Angulaire élevé" },
    ],
    description:
      "Accouplement à denture bombée capable de transmettre un couple élevé tout en tolérant d'importants désalignements angulaires.",
  },
];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getProduct(reference: string): Product | undefined {
  const target = normalize(reference);
  return products.find((p) => normalize(p.reference) === target);
}

export function countByFamily(): Record<ProductFamily, number> {
  const counts: Record<ProductFamily, number> = {
    roulements: 0,
    courroies: 0,
    moteurs: 0,
    transmission: 0,
  };
  for (const product of products) {
    counts[product.family] += 1;
  }
  return counts;
}

export function searchProducts(
  query: string,
  opts?: { family?: ProductFamily; brand?: string; subcategory?: string }
): Product[] {
  const normalizedQuery = normalize(query ?? "");

  return products.filter((p) => {
    if (opts?.family && p.family !== opts.family) return false;
    if (opts?.brand && normalize(p.brand) !== normalize(opts.brand)) return false;
    if (opts?.subcategory && normalize(p.subcategory) !== normalize(opts.subcategory)) return false;

    if (!normalizedQuery) return true;

    return (
      normalize(p.reference).includes(normalizedQuery) ||
      normalize(p.designation).includes(normalizedQuery) ||
      normalize(p.brand).includes(normalizedQuery) ||
      normalize(p.subcategory).includes(normalizedQuery)
    );
  });
}

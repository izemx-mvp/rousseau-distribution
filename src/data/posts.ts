// CONTENU EXEMPLE À REMPLACER — articles de démonstration

export type PostCategory = "guides-techniques" | "maintenance" | "sourcing" | "secteurs" | "actualites";

export const CATEGORIES: { id: PostCategory; label: string }[] = [
  { id: "guides-techniques", label: "Guides techniques" },
  { id: "maintenance", label: "Maintenance" },
  { id: "sourcing", label: "Sourcing" },
  { id: "secteurs", label: "Secteurs" },
  { id: "actualites", label: "Actualités" },
];

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  tags: string[];
  coverVariant: "bearing" | "belt" | "motor" | "gear" | "blueprint" | "chain";
  publishedAt: string;
  updatedAt: string;
  author: string;
  featured: boolean;
  relatedProducts: string[];
  seoTitle: string;
  seoDescription: string;
}

export const posts: Post[] = [
  {
    slug: "choisir-bon-roulement-machine",
    title: "Comment choisir le bon roulement pour sa machine",
    excerpt: "Charge, vitesse, environnement, précision : les critères essentiels pour sélectionner un roulement adapté à votre application industrielle.",
    content: `## Pourquoi le choix d'un roulement ne s'improvise pas

Un roulement est un composant a priori simple, mais son bon fonctionnement dépend de nombreux paramètres qui interagissent : charge appliquée, vitesse de rotation, température, présence de contaminants, alignement des arbres, etc. Un roulement mal choisi peut entraîner un échauffement prématuré, un bruit anormal, voire une casse pouvant immobiliser toute une ligne de production.

Cet article présente une méthode simple pour orienter votre choix, sans prétendre remplacer l'avis d'un spécialiste pour les cas complexes.

## Étape 1 : identifier le type de charge

Les roulements doivent supporter deux grandes familles de charges :

- **Charge radiale** : perpendiculaire à l'axe de l'arbre (poids, tension de courroie, etc.).
- **Charge axiale** : dans le sens de l'axe (poussée d'une vis sans fin, d'une pompe, etc.).

Selon la proportion de charge radiale et axiale, on orientera le choix vers :

| Type de charge | Roulement adapté |
|---|---|
| Radiale pure ou dominante | Roulement rigide à billes (ex. \`6205-2RS\`) |
| Axiale pure | Butée à billes ou à rouleaux |
| Combinée modérée | Roulement à contact oblique (ex. \`7208 B\`) |
| Combinée avec fortes charges | Roulement à rouleaux coniques (ex. \`30208\`) |
| Charges lourdes, vitesses modérées | Roulement à rouleaux cylindriques (ex. \`NU 2208\`) |

## Étape 2 : évaluer la vitesse de rotation

Chaque roulement possède une vitesse limite, indiquée par le fabricant, au-delà de laquelle l'échauffement et l'usure du lubrifiant deviennent problématiques. Cette limite dépend :

1. Du type de cage (acier, laiton, polymère).
2. Du mode de lubrification (graisse ou huile).
3. De la précision de fabrication (classe de tolérance).

> En règle générale, plus la vitesse est élevée, plus il est recommandé de privilégier une lubrification à l'huile et une cage usinée plutôt qu'emboutie.

## Étape 3 : tenir compte de l'environnement

L'environnement de fonctionnement conditionne fortement le choix de l'étanchéité et du matériau :

- **Poussières et particules abrasives** : privilégier des roulements étanches (suffixe \`2RS\` ou \`2RZ\`).
- **Humidité ou lavage fréquent** : envisager des roulements en acier inoxydable ou des joints renforcés.
- **Températures élevées** : vérifier la compatibilité de la graisse et, si nécessaire, opter pour des cages métalliques.
- **Charges chocs / vibrations** : les roulements à rouleaux tolèrent généralement mieux les chocs que les roulements à billes.

## Étape 4 : respecter les dimensions et tolérances

Le remplacement d'un roulement doit respecter scrupuleusement :

- Le diamètre d'alésage (intérieur).
- Le diamètre extérieur.
- La largeur.
- La classe de jeu interne (C3, C4, etc.) si l'application le nécessite.

Il est utile de relever la référence complète gravée sur la bague avant toute commande, car deux roulements de dimensions identiques peuvent différer par leur jeu interne, leur cage ou leur étanchéité.

### Lire une référence normalisée

Une référence type \`6205-2RS\` se décompose ainsi :

- \`62\` : série (dimensions et capacité de charge).
- \`05\` : diamètre d'alésage (05 × 5 = 25 mm).
- \`2RS\` : étanchéité par joints des deux côtés.

## Étape 5 : anticiper le montage

Un roulement techniquement adapté peut néanmoins être endommagé par un montage inapproprié. Quelques bonnes pratiques :

- Ne jamais transmettre l'effort de montage par les billes ou rouleaux, mais toujours par la bague concernée (intérieure pour un montage sur arbre, extérieure pour un montage dans un logement).
- Chauffer légèrement les roulements pour un montage à chaud sur arbre, plutôt que de forcer à froid.
- Vérifier l'alignement de l'arbre et du logement pour éviter les contraintes parasites.
- Utiliser une graisse compatible avec les joints et la température de service.

## Synthèse

Le choix d'un roulement repose sur un compromis entre charge, vitesse, environnement et contraintes de montage. En cas de doute, il est toujours préférable de comparer la référence exacte du roulement d'origine avec les caractéristiques techniques du fabricant avant de procéder au remplacement.

Une bonne pratique consiste à conserver un historique des références utilisées sur chaque machine, afin de fiabiliser les futurs remplacements et de réduire les délais d'intervention en cas de panne.
`,
    category: "guides-techniques",
    tags: ["roulements", "selection", "maintenance industrielle", "mecanique"],
    coverVariant: "bearing",
    publishedAt: "2026-01-08",
    updatedAt: "2026-01-15",
    author: "Équipe Rousseau Distribution",
    featured: false,
    relatedProducts: ["6205-2RS", "6304-ZZ", "NU 2208", "22208 E", "UCP 205"],
    seoTitle: "Comment choisir le bon roulement pour sa machine | Rousseau Distribution",
    seoDescription: "Charge, vitesse, environnement, précision : les critères essentiels pour sélectionner un roulement adapté à votre application industrielle.",
  },
  {
    slug: "courroies-trapezoidales-synchrones-poly-v-differences",
    title: "Courroies trapézoïdales, synchrones, poly-V : comprendre les différences",
    excerpt: "Panorama des principales familles de courroies de transmission et de leurs usages typiques pour bien orienter votre choix technique.",
    content: `## Un même besoin, plusieurs technologies

Transmettre une puissance mécanique d'un arbre moteur vers un arbre récepteur peut se faire de plusieurs façons : engrenages, chaînes, ou courroies. Parmi les courroies elles-mêmes, il existe plusieurs familles aux profils et usages très différents. Confondre ces technologies peut conduire à un mauvais dimensionnement, une usure prématurée, voire une incompatibilité totale avec les poulies existantes.

## Les courroies trapézoïdales (profil en V)

Les courroies trapézoïdales, ou courroies en V, sont sans doute les plus répandues dans l'industrie généraliste. Leur profil trapézoïdal se loge dans une gorge de poulie de forme correspondante, ce qui génère un effet de coin augmentant l'adhérence.

Principales caractéristiques :

- Transmission par friction (pas d'engrènement).
- Tolère un léger désalignement des poulies.
- Existe en plusieurs sections normalisées : \`Z\`, \`A\`, \`B\`, \`C\`, \`SPZ\`, \`SPA\`, \`SPB\`, \`SPC\`.
- Les sections dites "étroites" (\`SPZ\`, \`SPA\`, \`SPB\`, \`SPC\`) transmettent davantage de puissance pour un encombrement réduit par rapport aux sections classiques.

### Lecture d'une référence

Une référence telle que \`SPB 1600\` indique :

- \`SPB\` : la section (profil et largeur).
- \`1600\` : la longueur primitive en millimètres.

## Les courroies synchrones (crantées)

Contrairement aux courroies trapézoïdales, les courroies synchrones possèdent des dents qui s'engrènent avec des poulies crantées correspondantes. Cela supprime tout glissement et garantit un rapport de vitesse constant entre les deux arbres.

Elles sont particulièrement adaptées lorsque :

- Une synchronisation précise est nécessaire (axes liés, positionnement).
- Le glissement est proscrit pour des raisons de précision ou de sécurité.
- Le rendement énergétique doit être optimisé (moins de pertes par frottement).

Le pas (distance entre deux dents) est un paramètre déterminant : les profils \`MXL\`, \`XL\`, \`L\`, \`H\`, \`T5\`, \`T10\`, \`AT5\`, \`AT10\` ou encore \`HTD 8M\` et \`HTD 14M\` ne sont pas interchangeables entre eux. Une référence comme \`HTD 8M-1600\` signifie un profil HTD à pas de 8 mm et une longueur de 1600 mm.

> Il ne faut jamais monter une courroie crantée sur une poulie dont le pas ne correspond pas exactement, même si le montage semble physiquement possible : cela accélère l'usure des dents.

## Les courroies poly-V

Les courroies poly-V (ou multi-V) combinent plusieurs nervures trapézoïdales fines sur une même courroie plate. Elles sont fréquemment utilisées pour transmettre de la puissance à grande vitesse tout en conservant une bonne flexibilité, par exemple sur des systèmes à plusieurs poulies ou avec de petits diamètres.

Les profils les plus courants sont \`PH\`, \`PJ\`, \`PK\`, \`PL\` et \`PM\`, classés selon la taille des nervures. Une référence \`PJ 610\` correspond ainsi à un profil PJ d'une longueur de 610 mm.

## Tableau comparatif

| Critère | Trapézoïdale | Synchrone | Poly-V |
|---|---|---|---|
| Principe de transmission | Friction | Engrènement | Friction |
| Glissement possible | Oui, léger | Non | Oui, très faible |
| Tolérance au désalignement | Bonne | Faible | Moyenne |
| Usage typique | Transmission générale | Synchronisation précise | Vitesse élevée, faible encombrement |
| Entretien tension | Régulier | Modéré | Régulier |

## Comment identifier la bonne technologie sur une installation existante

Avant tout remplacement, plusieurs indices permettent de confirmer le type de courroie :

1. Observer le profil de la gorge des poulies (en V, crantée, ou striée).
2. Relever la référence imprimée sur la courroie existante si elle est encore lisible.
3. Mesurer la longueur extérieure et, si possible, le pas ou la largeur.
4. Compter le nombre de nervures pour une courroie poly-V.

### Ce qu'il ne faut jamais faire

- Remplacer une courroie synchrone par une trapézoïdale « qui semble aller » : les poulies ne sont pas compatibles.
- Mélanger différentes marques de courroies trapézoïdales sur un même jeu multi-courroies, sauf indication explicite de compatibilité.
- Négliger la tension après remplacement, quelle que soit la technologie.

## En résumé

Le choix d'une courroie dépend avant tout du type de transmission recherché : friction simple, synchronisation stricte, ou compacité à haute vitesse. Une identification rigoureuse du profil et des dimensions, avant toute commande de remplacement, évite les erreurs de compatibilité et les arrêts de production inutiles.
`,
    category: "guides-techniques",
    tags: ["courroies", "transmission", "selection", "mecanique"],
    coverVariant: "belt",
    publishedAt: "2026-02-12",
    updatedAt: "2026-02-20",
    author: "Équipe Rousseau Distribution",
    featured: false,
    relatedProducts: ["SPB 1600", "HTD 8M-1600", "PJ 610", "A 1250", "XPA 1250"],
    seoTitle: "Courroies trapézoïdales, synchrones, poly-V : comprendre les différences | Rousseau Distribution",
    seoDescription: "Panorama des principales familles de courroies de transmission et de leurs usages typiques pour bien orienter votre choix technique.",
  },
  {
    slug: "signes-usure-courroie-quand-remplacer",
    title: "Les signes d'usure d'une courroie et quand la remplacer",
    excerpt: "Fissures, glissement, bruit, effritement : apprenez à repérer les signaux d'alerte pour anticiper le remplacement d'une courroie.",
    content: `## Pourquoi surveiller l'état d'une courroie

Une courroie de transmission est un consommable : même correctement dimensionnée et montée, elle subit une usure progressive liée aux flexions répétées, à la chaleur, aux frottements et au vieillissement du matériau. Une casse imprévue peut provoquer un arrêt de production, voire endommager d'autres composants (poulies, roulements, moteur). Savoir reconnaître les signes précurseurs permet de planifier un remplacement avant la panne.

## Les signes visuels d'usure

### Fissures transversales

Les fissures perpendiculaires au sens de la courroie apparaissent généralement sur la face intérieure, là où la flexion est la plus importante. Quelques fissures superficielles peuvent être normales avec l'âge, mais des fissures profondes ou nombreuses annoncent une rupture prochaine.

### Effritement et perte de matière

Un effritement du caoutchouc, visible sous forme de petits débris noirs autour des poulies, indique une dégradation du matériau, souvent liée à la chaleur ou à un contact avec des huiles et graisses.

### Vitrification de la surface

Une surface de contact devenue lisse et brillante ("vitrifiée") réduit fortement l'adhérence. Ce phénomène est souvent causé par un glissement prolongé, lui-même provoqué par une tension insuffisante.

### Effilochage des flancs

Sur les courroies trapézoïdales, un effilochage des flancs ou une déformation du profil en V signale une usure avancée ou un désalignement de poulies.

### Dents endommagées (courroies synchrones)

Pour les courroies crantées, il faut surveiller :

- L'arrondissement ou la cassure des dents.
- Des marques d'usure irrégulières indiquant un défaut d'alignement.
- Une fissuration à la base des dents.

## Les signes auditifs et sensoriels

| Symptôme | Cause probable |
|---|---|
| Grincement aigu au démarrage | Tension insuffisante ou glissement |
| Bruit sourd et régulier | Désalignement des poulies |
| Claquement rythmé | Fissure localisée ou corps étranger |
| Vibration anormale | Usure inégale ou poulie endommagée |
| Odeur de caoutchouc chaud | Frottement excessif, glissement prolongé |

> Une courroie qui « chante » au démarrage n'est pas nécessairement défectueuse : il s'agit souvent d'un simple problème de tension, à vérifier avant tout remplacement.

## Mesurer objectivement l'usure

Au-delà de l'inspection visuelle, quelques vérifications complémentaires permettent d'objectiver le diagnostic :

1. **Contrôle de la tension** à l'aide d'un tensiomètre, en comparant à la valeur recommandée par le fabricant.
2. **Mesure de la flèche** (déflexion) de la courroie sous une charge donnée, entre deux poulies.
3. **Contrôle de l'alignement** des poulies à l'aide d'une règle ou d'un outil laser.
4. **Vérification de l'usure des poulies elles-mêmes**, car une gorge usée accélère l'usure d'une courroie neuve.

### Fréquence d'inspection recommandée

- Environnements poussiéreux ou chauds : inspection mensuelle.
- Usage standard en atelier : inspection trimestrielle.
- Applications critiques (lignes automatisées) : intégrer un contrôle visuel dans les rondes de maintenance hebdomadaires.

## Faut-il remplacer une seule courroie ou tout le jeu ?

Sur les transmissions à plusieurs courroies en parallèle, il est recommandé de remplacer l'ensemble du jeu simultanément, même si une seule courroie présente des signes d'usure. En effet, des courroies d'âges différents n'ont pas la même élasticité résiduelle, ce qui entraîne une répartition inégale de la charge et une usure accélérée de l'ensemble.

## Bonnes pratiques après remplacement

- Retendre la courroie après quelques heures de fonctionnement (période de rodage).
- Vérifier à nouveau l'alignement des poulies.
- Conserver la référence exacte de la courroie remplacée (profil, longueur, marque) pour faciliter les commandes futures.
- Noter la date de remplacement dans le carnet de maintenance de la machine.

## Conclusion

Anticiper le remplacement d'une courroie repose sur une observation régulière combinant inspection visuelle, écoute des bruits anormaux et contrôle de la tension. Un remplacement planifié, plutôt que subi, reste toujours moins coûteux en temps d'arrêt qu'une casse imprévue.
`,
    category: "maintenance",
    tags: ["courroies", "maintenance preventive", "usure", "diagnostic"],
    coverVariant: "belt",
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-10",
    author: "Équipe Rousseau Distribution",
    featured: false,
    relatedProducts: ["SPA 1250", "A 1400", "PJ 610", "HTD 5M-450"],
    seoTitle: "Les signes d'usure d'une courroie et quand la remplacer | Rousseau Distribution",
    seoDescription: "Fissures, glissement, bruit, effritement : apprenez à repérer les signaux d'alerte pour anticiper le remplacement d'une courroie.",
  },
  {
    slug: "lire-plaque-signaletique-moteur-electrique-triphase",
    title: "Bien lire la plaque signalétique d'un moteur électrique triphasé",
    excerpt: "Puissance, tension, courant, vitesse, indice de protection : décryptage complet des informations gravées sur la plaque d'un moteur triphasé.",
    content: `## Une carte d'identité indispensable

La plaque signalétique d'un moteur électrique triphasé regroupe l'ensemble des informations nécessaires à son identification, à son raccordement correct et à sa protection. La lire correctement évite des erreurs de câblage, des surcharges, ou le choix d'un moteur de remplacement inadapté.

## Les informations générales

### Constructeur, type et numéro de série

En haut de la plaque figurent généralement le nom du fabricant, la référence commerciale (type) et un numéro de série unique permettant, au besoin, d'obtenir la fiche technique complète auprès du fabricant.

### Norme de fabrication

La mention d'une norme (par exemple CEI/IEC 60034) indique le référentiel utilisé pour les essais et les classes de performance du moteur.

## Les grandeurs électriques

| Grandeur | Symbole | Exemple | Signification |
|---|---|---|---|
| Tension | U | 230/400 V | Tension selon couplage étoile/triangle |
| Courant | I | 14,5/8,4 A | Courant nominal absorbé par couplage |
| Puissance | P | 4 kW | Puissance mécanique utile |
| Fréquence | Hz | 50 Hz | Fréquence du réseau d'alimentation |
| Facteur de puissance | cos φ | 0,84 | Rapport entre puissance active et apparente |
| Rendement | η | 89,5 % | Efficacité énergétique du moteur |

### Comprendre le couple tension/courant

Une plaque indiquant \`230/400 V\` et \`14,5/8,4 A\` signifie que le moteur peut être couplé de deux façons :

- **Couplage triangle** sous 230 V, avec un courant plus élevé (14,5 A).
- **Couplage étoile** sous 400 V, avec un courant plus faible (8,4 A).

> Le mauvais choix de couplage par rapport à la tension du réseau disponible peut endommager gravement le moteur dès la mise sous tension. Il convient toujours de vérifier la correspondance entre la tension réseau et le couplage indiqué sur la plaque, ainsi que sur le schéma de la boîte à bornes.

## La vitesse et le nombre de pôles

La vitesse nominale, exprimée en tr/min, dépend du nombre de pôles du moteur et de la fréquence du réseau. À 50 Hz, les vitesses de synchronisme théoriques sont :

- 2 pôles : 3000 tr/min
- 4 pôles : 1500 tr/min
- 6 pôles : 1000 tr/min
- 8 pôles : 750 tr/min

La vitesse réelle indiquée sur la plaque est toujours légèrement inférieure à la vitesse de synchronisme, en raison du glissement propre aux moteurs asynchrones (par exemple 1450 tr/min pour un moteur 4 pôles).

## L'indice de protection (IP)

L'indice IP, composé de deux chiffres, indique le niveau de protection du moteur contre les corps solides et les liquides :

- Premier chiffre : protection contre les corps solides (0 à 6).
- Deuxième chiffre : protection contre les liquides (0 à 9).

Un indice \`IP55\` signifie une protection contre les poussières (protection quasi totale) et contre les jets d'eau de toutes directions, ce qui correspond à un usage industriel courant.

## La classe d'isolation et la classe thermique

La classe d'isolation (F, H...) indique la température maximale que peut supporter l'isolant des enroulements avant dégradation. La classe F, très répandue, tolère un échauffement plus élevé que la classe B.

## La forme de construction (IM)

Le code IM (par exemple \`IM B3\`, \`IM B5\`, \`IM B35\`) décrit la position de montage du moteur (sur pattes, à bride, ou les deux) ainsi que l'orientation de l'arbre. Ce code est essentiel lors du remplacement d'un moteur pour garantir la compatibilité mécanique avec le support existant.

## Le service et le facteur de service

- **Service S1** : fonctionnement continu à charge constante.
- **Service S2 à S9** : services intermittents ou variables, définis selon des durées et cycles précis.

Le facteur de service (FS), lorsqu'il est indiqué, précise la marge de surcharge admissible par rapport à la puissance nominale, sur une durée limitée.

## Exemple de synthèse

Pour un moteur affichant :

\`\`\`
4 kW - 400/690 V - 8,4/4,9 A - 1450 tr/min - IP55 - Cl. F - IM B3
\`\`\`

On peut en déduire : une puissance de 4 kW, un couplage possible en étoile (690 V) ou triangle (400 V) selon le réseau, une vitesse d'environ 1450 tr/min correspondant à un moteur 4 pôles, un bon niveau de protection contre poussières et eau, une isolation classe F, et un montage sur pattes.

## Conclusion

La plaque signalétique concentre en quelques lignes toutes les informations nécessaires au raccordement, à la protection et au remplacement d'un moteur électrique. Une lecture attentive, avant toute intervention, permet d'éviter des erreurs de branchement et de sélectionner un moteur de remplacement réellement compatible.
`,
    category: "guides-techniques",
    tags: ["moteurs electriques", "plaque signaletique", "electrotechnique"],
    coverVariant: "motor",
    publishedAt: "2026-04-02",
    updatedAt: "2026-04-09",
    author: "Équipe Rousseau Distribution",
    featured: false,
    relatedProducts: ["IE3 4kW 1500tr", "IE3 7.5kW 3000tr", "B3-B5"],
    seoTitle: "Bien lire la plaque signalétique d'un moteur électrique triphasé | Rousseau Distribution",
    seoDescription: "Puissance, tension, courant, vitesse, indice de protection : décryptage complet des informations gravées sur la plaque d'un moteur triphasé.",
  },
  {
    slug: "identifier-reference-plaque-illisible",
    title: "Comment identifier une référence quand la plaque est illisible",
    excerpt: "Plaque effacée, pièce ancienne, marquage disparu : méthodes pratiques pour retrouver la référence exacte d'un composant industriel.",
    content: `## Un problème fréquent en maintenance industrielle

Sur des machines anciennes, exposées à la chaleur, à l'huile ou aux frottements, il n'est pas rare que la plaque signalétique ou le marquage d'un composant devienne partiellement ou totalement illisible. Pourtant, identifier la référence exacte reste indispensable pour commander la bonne pièce de remplacement. Voici une méthode structurée pour reconstituer cette information à partir d'indices indirects.

## Étape 1 : exploiter les traces résiduelles du marquage

Même très effacé, un marquage laisse parfois des indices exploitables :

- **Éclairage rasant** : une lampe orientée en biais sur la surface fait souvent ressortir un relief de gravure encore invisible sous un éclairage direct.
- **Frottement léger** avec un crayon à papier sur une feuille de papier fin posée sur la gravure, technique classique de « frottis » qui révèle le relief.
- **Nettoyage doux** à l'aide d'un chiffon et d'un solvant compatible, sans abraser la surface, pour retirer la couche de graisse ou de peinture qui masque le marquage.
- **Photographie macro** avec un fort contraste et un traitement d'image (augmentation du contraste, conversion en noir et blanc) pour faire apparaître des caractères à peine visibles.

## Étape 2 : mesurer directement la pièce

Lorsque le marquage reste illisible, la mesure physique du composant permet souvent de restreindre fortement les références possibles.

### Pour un roulement

- Diamètre intérieur (alésage).
- Diamètre extérieur.
- Largeur.
- Nombre et diamètre approximatif des billes ou rouleaux, si démontable.
- Présence de joints, de gorge de circlips, ou d'un épaulement.

Ces dimensions, croisées avec des tables de correspondance normalisées (séries 62, 63, 64, 622, 623...), permettent souvent de retrouver une référence unique ou un nombre restreint de candidats.

### Pour une courroie

- Longueur extérieure ou primitive, mesurée avec un mètre ruban souple posé sur son contour.
- Largeur et hauteur du profil, si trapézoïdale.
- Pas et largeur, si synchrone (le comptage du nombre de dents sur une longueur donnée aide à déterminer le pas).
- Nombre de nervures, si poly-V.

### Pour un moteur électrique

- Distance entre trous de fixation (entraxe des pattes ou de la bride).
- Hauteur d'axe (distance entre le sol du châssis et l'axe de l'arbre).
- Diamètre et longueur de l'arbre de sortie.
- Puissance estimée à partir de la taille de la carcasse (à titre indicatif uniquement, à confirmer si possible).

## Étape 3 : s'appuyer sur le contexte de l'installation

L'environnement dans lequel se trouve la pièce fournit souvent des informations précieuses :

1. **Documentation technique de la machine** (manuel constructeur, schéma électrique, nomenclature de pièces détachées), même partielle.
2. **Pièces identiques ailleurs sur le même site**, sur une machine similaire ou une ligne jumelle.
3. **Historique de maintenance**, si des interventions précédentes ont été consignées (bons de commande, rapports d'intervention).
4. **Date de construction approximative de la machine**, qui peut orienter vers des standards ou des unités de mesure (métrique ou impérial) selon l'origine du fabricant.

> Comparer une pièce suspectée avec un composant neuf de référence connue, en superposant les dimensions, reste souvent le moyen le plus fiable de confirmer une identification incertaine.

## Étape 4 : formaliser l'identification avant de commander

Une fois les indices rassemblés, il est utile de les synthétiser dans un tableau simple avant tout achat :

| Élément mesuré | Valeur relevée | Référence(s) candidate(s) |
|---|---|---|
| Alésage | 25 mm | Série 62xx, 63xx, 622xx |
| Diamètre extérieur | 52 mm | \`6205\` compatible |
| Largeur | 15 mm | Confirme \`6205\` plutôt que \`6305\` |
| Étanchéité observée | Joints des deux côtés | Suffixe \`2RS\` ou \`2RZ\` |

Dans cet exemple, le recoupement des trois dimensions et de l'observation de l'étanchéité permet d'aboutir avec un bon niveau de confiance à la référence \`6205-2RS\`.

## Étape 5 : vérifier avant de valider

Avant de finaliser une commande à partir d'une identification indirecte, quelques vérifications supplémentaires limitent le risque d'erreur :

- Comparer le poids approximatif de la pièce avec les données constructeur.
- Vérifier la cohérence de la référence supposée avec l'usage de la machine (vitesse, charge).
- En cas de doute persistant, conserver l'ancienne pièce comme référence physique jusqu'à confirmation.

## Conclusion

L'identification d'une référence à partir d'un marquage effacé repose sur une combinaison de méthodes : révélation du marquage résiduel, mesures précises, recoupement documentaire et comparaison physique. Une démarche méthodique, même sans plaque lisible, permet dans la grande majorité des cas de retrouver une référence fiable avant commande.
`,
    category: "sourcing",
    tags: ["sourcing", "identification", "roulements", "moteurs electriques"],
    coverVariant: "blueprint",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-20",
    author: "Équipe Rousseau Distribution",
    featured: false,
    relatedProducts: ["6205-2RS", "SPB 1600", "IE3 4kW 1500tr"],
    seoTitle: "Comment identifier une référence quand la plaque est illisible | Rousseau Distribution",
    seoDescription: "Plaque effacée, pièce ancienne, marquage disparu : méthodes pratiques pour retrouver la référence exacte d'un composant industriel.",
  },
  {
    slug: "pieces-rechange-stock-limiter-arrets-production",
    title: "Quelles pièces de rechange garder en stock pour limiter les arrêts de production",
    excerpt: "Méthode pour constituer un stock de pièces critiques cohérent, sans immobiliser inutilement du capital dans des références peu utiles.",
    content: `## Le dilemme du stock de pièces détachées

Constituer un stock de pièces de rechange répond à un objectif clair : réduire la durée des arrêts de production en cas de panne. Mais un stock mal pensé peut aussi immobiliser inutilement des ressources sur des références rarement utilisées, tout en manquant les pièces réellement critiques. Une approche méthodique permet d'arbitrer entre disponibilité et rationalisation.

## Étape 1 : identifier les équipements critiques

Toutes les machines n'ont pas le même impact en cas de panne. Une analyse simple consiste à classer les équipements selon deux critères :

- **Criticité fonctionnelle** : l'arrêt de cet équipement bloque-t-il toute la production, une partie seulement, ou peut-il être contourné temporairement ?
- **Fréquence de sollicitation** : l'équipement fonctionne-t-il en continu, par intermittence, ou en secours ?

Cette analyse permet de concentrer l'effort de stockage sur les équipements dont l'arrêt aurait les conséquences les plus lourdes, plutôt que de chercher à couvrir uniformément l'ensemble du parc machines.

## Étape 2 : distinguer les familles de pièces

### Pièces d'usure prévisible

Roulements, courroies, joints, filtres : ces composants s'usent de façon relativement prévisible avec le temps ou les heures de fonctionnement. Leur remplacement peut souvent être planifié, ce qui réduit le besoin de stock d'urgence si la maintenance préventive est bien organisée.

### Pièces à défaillance aléatoire

Certains composants électriques ou électroniques peuvent tomber en panne de façon plus difficile à anticiper. Pour ces éléments, un stock de sécurité est souvent plus justifié, en particulier lorsque le délai de remplacement est long.

### Pièces standards vs pièces spécifiques

| Type de pièce | Exemple | Stratégie de stock recommandée |
|---|---|---|
| Standard, largement diffusée | Roulement \`6205-2RS\` | Stock modéré, réapprovisionnement rapide possible |
| Standard mais dimension particulière | Courroie \`SPB 1600\` | Stock ciblé selon criticité de la machine |
| Spécifique à un équipement | Moteur \`IE3 4kW 1500tr\` monté sur bride spéciale | Stock dédié si équipement critique et délai long |
| Consommable générique | Graisse, joints toriques standards | Stock permanent, faible coût, forte rotation |

## Étape 3 : croiser criticité et disponibilité fournisseur

Le niveau de stock à constituer dépend fortement du délai d'obtention d'une pièce de remplacement. Une pièce standard, disponible rapidement, justifie un stock plus faible qu'une pièce spécifique nécessitant une fabrication ou un délai d'importation long.

> La question à se poser n'est pas seulement « cette pièce est-elle critique ? » mais « en cas de panne, combien de temps faudrait-il pour l'obtenir, et quel est le coût d'un arrêt pendant ce délai ? »

## Étape 4 : constituer une liste de pièces critiques documentée

Pour chaque équipement jugé critique, il est recommandé de documenter :

1. La référence exacte des composants stratégiques (roulements, courroies, moteur, éléments d'étanchéité).
2. Les dimensions et caractéristiques techniques associées.
3. La quantité recommandée en stock.
4. Le délai habituel d'approvisionnement.
5. La date de dernier remplacement, si connue, pour estimer la durée de vie résiduelle des pièces en service.

Cette liste, tenue à jour, facilite non seulement les commandes de stock mais aussi les interventions d'urgence, en évitant de devoir identifier une référence dans l'urgence face à une machine arrêtée.

## Étape 5 : réévaluer régulièrement le stock

Un stock de pièces critiques n'est pas figé : il doit être révisé périodiquement pour tenir compte :

- Des évolutions du parc machines (ajout, retrait, modification d'équipements).
- Des retours d'expérience sur les pannes survenues.
- De l'évolution des délais fournisseurs.
- Des pièces jamais consommées depuis plusieurs années, candidates à un retrait du stock critique.

### Indicateurs utiles à suivre

- Taux de disponibilité des pièces critiques lors des pannes survenues.
- Durée moyenne d'arrêt liée à une indisponibilité de pièce.
- Rotation du stock par référence.

## Conclusion

Un stock de pièces de rechange efficace ne consiste pas à tout stocker, mais à identifier avec rigueur les équipements et composants dont l'indisponibilité aurait l'impact le plus lourd sur la production, puis à dimensionner le stock en fonction de la criticité réelle et des délais d'approvisionnement. Cette démarche, revue régulièrement, permet de limiter les arrêts de production tout en maîtrisant le volume de stock immobilisé.
`,
    category: "maintenance",
    tags: ["maintenance preventive", "gestion de stock", "arrets de production"],
    coverVariant: "gear",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    author: "Équipe Rousseau Distribution",
    featured: true,
    relatedProducts: ["6205-2RS", "SPB 1600", "HTD 8M-1600", "IE3 4kW 1500tr"],
    seoTitle: "Quelles pièces de rechange garder en stock pour limiter les arrêts de production | Rousseau Distribution",
    seoDescription: "Méthode pour constituer un stock de pièces critiques cohérent, sans immobiliser inutilement du capital dans des références peu utiles.",
  },
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(c: PostCategory): Post[] {
  return posts.filter((p) => p.category === c);
}

export function searchPosts(query: string): Post[] {
  const q = normalize(query.trim());
  if (!q) return [];
  return posts.filter((p) => {
    const haystack = normalize(
      [p.title, p.excerpt, ...p.tags].join(" ")
    );
    return haystack.includes(q);
  });
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = posts.filter((p) => p.slug !== slug);
  const scored = others
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = p.category === current.category ? 1 : 0;
      return { post: p, score: sharedTags * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

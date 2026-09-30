import type { Product, ProductFamily } from "@/data/products";
import familyMoteurs from "@/assets/family-moteurs.png";
import familyCourroies from "@/assets/family-courroies.png";
import familyTransmission from "@/assets/family-transmission.png";
import familyRoulements from "@/assets/family-roulements.png";

const familyImages: Record<ProductFamily, string> = {
  roulements: familyRoulements,
  courroies: familyCourroies,
  moteurs: familyMoteurs,
  transmission: familyTransmission,
};

export function getFamilyImage(family: ProductFamily): string {
  return familyImages[family];
}

/**
 * Product-specific images live in src/assets/products/ (p-roulement-billes.png, ...).
 * The glob returns an empty object when the folder does not exist yet, so the build never
 * breaks: missing files simply fall back to the family render.
 */
const files = import.meta.glob("/src/assets/products/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byName: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [
    path.split("/").pop()!.replace(/\.png$/, ""),
    url,
  ]),
);

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

type Rule = [RegExp, string];

/** First matching rule wins; the last entry of each family is its default. */
const rules: Record<ProductFamily, Rule[]> = {
  roulements: [
    [/conique/, "p-roulement-rouleaux-coniques"],
    [/cylindrique/, "p-roulement-rouleaux-cylindriques"],
    [/butee/, "p-roulement-butee"],
    [/palier/, "p-palier"],
    [/.*/, "p-roulement-billes"],
  ],
  courroies: [
    [/synchron|denture|htd/, "p-courroie-synchrone"],
    [/poly/, "p-courroie-poly-v"],
    [/.*/, "p-courroie-trapezoidale"],
  ],
  moteurs: [
    [/motoreducteur|reducteur/, "p-motoreducteur"],
    [/bride|\bb5\b|\bb14\b/, "p-moteur-bride"],
    [/.*/, "p-moteur-triphase"],
  ],
  transmission: [
    [/accouplement|manchon/, "p-accouplement"],
    [/chaine/, "p-chaine-rouleaux"],
    [/pignon/, "p-pignon"],
    [/poulie.*synchron|synchron.*poulie/, "p-poulie-synchrone"],
    [/poulie/, "p-poulie"],
    [/reducteur/, "p-reducteur"],
    [/.*/, "p-generic"],
  ],
};

export interface ProductImage {
  src: string;
  /** true = dedicated product photo (light background); false = dark family render. */
  specific: boolean;
}

export function getProductImage(product: Product): ProductImage {
  const text = normalize(`${product.subcategory} ${product.designation}`);
  const match = rules[product.family].find(([test]) => test.test(text));
  const file = match?.[1];
  const src = file ? byName[file] : undefined;
  if (src) return { src, specific: true };
  return { src: familyImages[product.family], specific: false };
}
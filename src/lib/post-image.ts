import blogChoisirRoulement from "@/assets/blog-choisir-roulement.png";
import blogTypesCourroies from "@/assets/blog-types-courroies.png";
import blogUsureCourroie from "@/assets/blog-usure-courroie.png";
import blogPlaqueMoteur from "@/assets/blog-plaque-moteur.png";
import blogIdentifierReference from "@/assets/blog-identifier-reference.png";
import blogStockPieces from "@/assets/blog-stock-pieces.png";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * First match wins, so the order matters:
 * "identifier ... plaque illisible" must be tested before "plaque".
 */
const rules: Array<[RegExp, string]> = [
  [/usure|remplac/, blogUsureCourroie],
  [/identifi|illisible/, blogIdentifierReference],
  [/plaque|signaletique/, blogPlaqueMoteur],
  [/stock|arret/, blogStockPieces],
  [/trapezo|synchron|poly|difference/, blogTypesCourroies],
  [/roulement|choisir/, blogChoisirRoulement],
];

/**
 * Returns the cover image of a post, or null when none matches
 * (callers then fall back to the SVG PostCover).
 * If the post has an explicit `coverImage` URL, it always wins.
 */
export function getPostImage(post: {
  slug: string;
  title: string;
  coverImage?: string;
}): string | null {
  if (post.coverImage) return post.coverImage;
  const text = normalize(`${post.slug} ${post.title}`);
  const match = rules.find(([test]) => test.test(text));
  return match ? match[1] : null;
}
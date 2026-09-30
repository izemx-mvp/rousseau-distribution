import sectorAgro from "@/assets/sector-agroalimentaire.png";
import sectorPharma from "@/assets/sector-pharmaceutique.png";
import sectorIndustrie from "@/assets/sector-industrie.png";
import sectorEmballage from "@/assets/sector-emballage.png";
import sectorEnergie from "@/assets/sector-energie.png";
import sectorAutres from "@/assets/sector-autres.png";

/** Resolves a sector image from its id, whatever the exact id spelling in site.ts. */
export function sectorImage(id: string): string {
  const key = id.toLowerCase();
  if (key.includes("agro")) return sectorAgro;
  if (key.includes("pharma")) return sectorPharma;
  if (key.includes("emball")) return sectorEmballage;
  if (key.includes("energ")) return sectorEnergie;
  if (key.includes("indus")) return sectorIndustrie;
  return sectorAutres;
}
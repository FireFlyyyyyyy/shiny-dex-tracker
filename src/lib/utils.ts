import { type ClassValue, clsx } from "clsx";
import type { Language } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateTime(iso: string, language: Language = "fr"): string {
  const date = new Date(iso);
  return date.toLocaleString(language === "en" ? "en-US" : "fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateShort(iso: string, language: Language = "fr"): string {
  const date = new Date(iso);
  return date.toLocaleDateString(language === "en" ? "en-US" : "fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Nom français si dispo (peuplé par prisma/seed.ts), sinon repli sur l'anglais. */
export function pokemonDisplayName(
  pokemon: { name: string; nameFr: string | null },
  language: Language
): string {
  return language === "fr" && pokemon.nameFr ? pokemon.nameFr : pokemon.name;
}

export type SpriteStyle = "pixel" | "home";

/** Sprite normal (non-shiny), pixel-art ou rendu 3D "Home" selon la préférence choisie. */
export function spriteUrlFor(
  pokemon: { spriteUrl: string; homeSpriteUrl: string | null },
  style: SpriteStyle
): string {
  return style === "home" && pokemon.homeSpriteUrl ? pokemon.homeSpriteUrl : pokemon.spriteUrl;
}

/** Sprite shiny, pixel-art ou rendu 3D "Home" selon la préférence choisie. */
export function shinySpriteUrlFor(
  pokemon: { shinySpriteUrl: string; homeShinySpriteUrl: string | null },
  style: SpriteStyle
): string {
  return style === "home" && pokemon.homeShinySpriteUrl ? pokemon.homeShinySpriteUrl : pokemon.shinySpriteUrl;
}

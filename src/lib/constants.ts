export interface GenerationMeta {
  id: number;
  label: string;
}

// Métadonnées d'affichage des onglets — la table Pokemon en base (peuplée
// par prisma/seed.ts depuis PokeAPI) reste la source de vérité pour savoir
// quels Pokémon existent réellement dans chaque génération.
export const GENERATIONS: GenerationMeta[] = [
  { id: 1, label: "1G" },
  { id: 2, label: "2G" },
  { id: 3, label: "3G" },
  { id: 4, label: "4G" },
  { id: 5, label: "5G" },
  { id: 6, label: "6G" },
  { id: 7, label: "7G" },
  { id: 8, label: "8G" },
  { id: 9, label: "9G" },
];

export const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

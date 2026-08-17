export interface GameOption {
  id: string;
  fr: string;
  en: string;
}

// Jeux proposés sur la fiche de capture — ordre chronologique de sortie.
// L'id (stable, indépendant de la langue) est ce qui est stocké en base ;
// fr/en ne servent qu'à l'affichage (voir translateGame).
export const GAME_OPTIONS: GameOption[] = [
  { id: "red", fr: "Pokémon Rouge", en: "Pokémon Red" },
  { id: "blue", fr: "Pokémon Bleu", en: "Pokémon Blue" },
  { id: "yellow", fr: "Pokémon Jaune", en: "Pokémon Yellow" },
  { id: "gold", fr: "Pokémon Or", en: "Pokémon Gold" },
  { id: "silver", fr: "Pokémon Argent", en: "Pokémon Silver" },
  { id: "crystal", fr: "Pokémon Cristal", en: "Pokémon Crystal" },
  { id: "ruby", fr: "Pokémon Rubis", en: "Pokémon Ruby" },
  { id: "sapphire", fr: "Pokémon Saphir", en: "Pokémon Sapphire" },
  { id: "emerald", fr: "Pokémon Émeraude", en: "Pokémon Emerald" },
  { id: "firered", fr: "Pokémon Rouge Feu", en: "Pokémon FireRed" },
  { id: "leafgreen", fr: "Pokémon Vert Feuille", en: "Pokémon LeafGreen" },
  { id: "diamond", fr: "Pokémon Diamant", en: "Pokémon Diamond" },
  { id: "pearl", fr: "Pokémon Perle", en: "Pokémon Pearl" },
  { id: "platinum", fr: "Pokémon Platine", en: "Pokémon Platinum" },
  { id: "heartgold", fr: "Pokémon HeartGold", en: "Pokémon HeartGold" },
  { id: "soulsilver", fr: "Pokémon SoulSilver", en: "Pokémon SoulSilver" },
  { id: "black", fr: "Pokémon Noir", en: "Pokémon Black" },
  { id: "white", fr: "Pokémon Blanc", en: "Pokémon White" },
  { id: "black2", fr: "Pokémon Noir 2", en: "Pokémon Black 2" },
  { id: "white2", fr: "Pokémon Blanc 2", en: "Pokémon White 2" },
  { id: "x", fr: "Pokémon X", en: "Pokémon X" },
  { id: "y", fr: "Pokémon Y", en: "Pokémon Y" },
  { id: "omegaruby", fr: "Pokémon Rubis Oméga", en: "Pokémon Omega Ruby" },
  { id: "alphasapphire", fr: "Pokémon Saphir Alpha", en: "Pokémon Alpha Sapphire" },
  { id: "sun", fr: "Pokémon Soleil", en: "Pokémon Sun" },
  { id: "moon", fr: "Pokémon Lune", en: "Pokémon Moon" },
  { id: "ultrasun", fr: "Pokémon Ultra-Soleil", en: "Pokémon Ultra Sun" },
  { id: "ultramoon", fr: "Pokémon Ultra-Lune", en: "Pokémon Ultra Moon" },
  { id: "letsgopikachu", fr: "Pokémon Let's Go Pikachu", en: "Pokémon Let's Go, Pikachu!" },
  { id: "letsgoeevee", fr: "Pokémon Let's Go Évoli", en: "Pokémon Let's Go, Eevee!" },
  { id: "sword", fr: "Pokémon Épée", en: "Pokémon Sword" },
  { id: "shield", fr: "Pokémon Bouclier", en: "Pokémon Shield" },
  { id: "bd", fr: "Pokémon Diamant Étincelant", en: "Pokémon Brilliant Diamond" },
  { id: "sp", fr: "Pokémon Perle Scintillante", en: "Pokémon Shining Pearl" },
  { id: "arceus", fr: "Pokémon Légendes Arceus", en: "Pokémon Legends: Arceus" },
  { id: "scarlet", fr: "Pokémon Écarlate", en: "Pokémon Scarlet" },
  { id: "violet", fr: "Pokémon Violet", en: "Pokémon Violet" },
  { id: "za", fr: "Pokémon Légendes Z-A", en: "Pokémon Legends: Z-A" },
];

export interface MethodOption {
  id: string;
  fr: string;
  en: string;
}

// Méthodes de chasse — strictement celles listées par ShinyHunters
// (https://www.shinyhunters.com/fr/guides), avec les jeux exacts tagués sur
// chaque fiche méthode (vérifié page par page). "Masuda / Oeufs" regroupe
// l'élevage et la méthode Masuda comme sur le site (un seul guide là-bas).
export const METHOD_OPTIONS: MethodOption[] = [
  { id: "classiques", fr: "Rencontres classiques", en: "Classic encounters" },
  { id: "reset", fr: "Reset", en: "Soft reset" },
  { id: "masudaOeufs", fr: "Masuda / Oeufs", en: "Masuda / Eggs" },
  { id: "radar", fr: "Poké Radar", en: "Poké Radar" },
  { id: "peche6G", fr: "Pêche (6G)", en: "Fishing (Gen 6)" },
  { id: "hordes", fr: "Hordes", en: "Horde encounters" },
  { id: "safariAmis", fr: "Safari des amis", en: "Friend Safari" },
  { id: "navidex", fr: "Navidex", en: "DexNav" },
  { id: "sos", fr: "Appel SOS", en: "SOS Battle" },
  { id: "comboCapture", fr: "Combo captures", en: "Catch combo" },
  { id: "ultraBreches", fr: "Ultra brèches", en: "Ultra Wormholes" },
  { id: "expeditionDynamax", fr: "Expédition Dynamax", en: "Dynamax Adventure" },
  { id: "raid8G", fr: "Raid (8G)", en: "Max Raid Battle" },
  { id: "raidTeracristal", fr: "Raid Téracristal", en: "Tera Raid Battle" },
  { id: "apparitionsMassives", fr: "Apparitions massives", en: "Mass Outbreaks" },
  { id: "grandsSouterrains", fr: "Grands Souterrains", en: "Grand Underground" },
];

const GEN1_METHODS = ["classiques", "reset"];
const GEN2_3_METHODS = ["classiques", "reset", "masudaOeufs"];
const GEN4_METHODS = ["classiques", "reset", "masudaOeufs", "radar"];
const GEN4_REMAKE_METHODS = ["classiques", "reset", "masudaOeufs"]; // HGSS : pas de Poké Radar tagué
const GEN5_METHODS = ["classiques", "reset", "masudaOeufs"];

// Méthodes réellement disponibles selon le jeu choisi (par id) — évite par
// exemple de proposer le Poké Radar sur un jeu qui ne l'a jamais eu. Un jeu
// non listé ici retombe sur METHOD_OPTIONS en entier (voir CatchDetailModal).
export const GAME_METHODS: Record<string, string[]> = {
  red: GEN1_METHODS,
  blue: GEN1_METHODS,
  yellow: GEN1_METHODS,
  gold: GEN2_3_METHODS,
  silver: GEN2_3_METHODS,
  crystal: GEN2_3_METHODS,
  ruby: GEN2_3_METHODS,
  sapphire: GEN2_3_METHODS,
  emerald: GEN2_3_METHODS,
  firered: GEN2_3_METHODS,
  leafgreen: GEN2_3_METHODS,
  diamond: GEN4_METHODS,
  pearl: GEN4_METHODS,
  platinum: GEN4_METHODS,
  heartgold: GEN4_REMAKE_METHODS,
  soulsilver: GEN4_REMAKE_METHODS,
  black: GEN5_METHODS,
  white: GEN5_METHODS,
  black2: GEN5_METHODS,
  white2: GEN5_METHODS,
  x: ["classiques", "reset", "masudaOeufs", "radar", "hordes", "safariAmis", "peche6G"],
  y: ["classiques", "reset", "masudaOeufs", "radar", "hordes", "safariAmis", "peche6G"],
  omegaruby: ["classiques", "reset", "masudaOeufs", "hordes", "navidex", "peche6G"],
  alphasapphire: ["classiques", "reset", "masudaOeufs", "hordes", "navidex", "peche6G"],
  sun: ["classiques", "reset", "masudaOeufs", "sos"],
  moon: ["classiques", "reset", "masudaOeufs", "sos"],
  ultrasun: ["classiques", "reset", "masudaOeufs", "sos", "ultraBreches"],
  ultramoon: ["classiques", "reset", "masudaOeufs", "sos", "ultraBreches"],
  letsgopikachu: ["classiques", "reset", "comboCapture"],
  letsgoeevee: ["classiques", "reset", "comboCapture"],
  sword: ["classiques", "reset", "masudaOeufs", "raid8G", "expeditionDynamax"],
  shield: ["classiques", "reset", "masudaOeufs", "raid8G", "expeditionDynamax"],
  bd: ["classiques", "reset", "masudaOeufs", "radar", "grandsSouterrains"],
  sp: ["classiques", "reset", "masudaOeufs", "radar", "grandsSouterrains"],
  arceus: ["classiques", "apparitionsMassives"],
  scarlet: ["classiques", "apparitionsMassives", "raidTeracristal"],
  violet: ["classiques", "apparitionsMassives", "raidTeracristal"],
  za: ["classiques", "apparitionsMassives"],
};

export type Language = "fr" | "en";

export function translateGame(gameId: string, language: Language): string {
  const found = GAME_OPTIONS.find((g) => g.id === gameId);
  return found ? found[language] : gameId; // fallback : anciennes valeurs enregistrées en texte brut
}

export function translateMethod(methodId: string, language: Language): string {
  const found = METHOD_OPTIONS.find((m) => m.id === methodId);
  return found ? found[language] : methodId;
}

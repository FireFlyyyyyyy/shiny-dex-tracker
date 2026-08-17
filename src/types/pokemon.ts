export interface Pokemon {
  id: number;
  name: string;
  nameFr: string | null;
  generation: number;
  spriteUrl: string;
  shinySpriteUrl: string;
  homeSpriteUrl: string | null;
  homeShinySpriteUrl: string | null;
  evolutionChainId: number | null;
  types: string[];
}

export interface CatchDetails {
  caughtAt: string;
  game: string | null;
  method: string | null;
  resets: number | null;
}

export interface PokemonWithCatchStatus extends Pokemon {
  caught: boolean;
  catchDetails: CatchDetails | null;
}

import "server-only";
import { prisma } from "@/database/prisma";
import { PokemonWithCatchStatus } from "@/types";

/**
 * Service server-only : lit tous les Pokémon et leurs éventuels détails de
 * capture (date, jeu, méthode, resets) pour un utilisateur donné, en un
 * seul aller-retour DB. Ne jamais importer ce fichier dans un composant "use client".
 */
export async function getPokemonWithCatchStatus(userId: string): Promise<PokemonWithCatchStatus[]> {
  const [pokemon, catches] = await Promise.all([
    prisma.pokemon.findMany({ orderBy: { id: "asc" } }),
    prisma.shinyCatch.findMany({ where: { userId } }),
  ]);

  const catchByPokemonId = new Map(catches.map((c) => [c.pokemonId, c]));

  return pokemon.map((p) => {
    const shinyCatch = catchByPokemonId.get(p.id);
    return {
      id: p.id,
      name: p.name,
      nameFr: p.nameFr,
      generation: p.generation,
      spriteUrl: p.spriteUrl,
      shinySpriteUrl: p.shinySpriteUrl,
      homeSpriteUrl: p.homeSpriteUrl,
      homeShinySpriteUrl: p.homeShinySpriteUrl,
      evolutionChainId: p.evolutionChainId,
      types: p.types.split(",").filter(Boolean),
      caught: !!shinyCatch,
      catchDetails: shinyCatch
        ? {
            caughtAt: shinyCatch.caughtAt.toISOString(),
            game: shinyCatch.game,
            method: shinyCatch.method,
            resets: shinyCatch.resets,
          }
        : null,
    };
  });
}

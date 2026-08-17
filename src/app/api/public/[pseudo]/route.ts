import { NextResponse } from "next/server";
import { prisma } from "@/database/prisma";
import { getPokemonWithCatchStatus } from "@/services/pokemon.service";
import { getHuntedGenerationIds } from "@/services/huntedGeneration.service";

/**
 * GET /api/public/[pseudo] — même donnée que la page publique /u/[pseudo],
 * mais en JSON et sans authentification (c'est le but de cette page : être
 * consultable par n'importe qui). Utilisée par PublicShinyDexView pour
 * sonder les mises à jour en direct (ex. un streamer qui chasse en live) —
 * aucune donnée de plus que ce que la page affiche déjà n'est exposée ici.
 */
export async function GET(_request: Request, { params }: { params: { pseudo: string } }) {
  const user = await prisma.user.findUnique({ where: { pseudo: params.pseudo } });
  if (!user) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  const [pokemon, huntedGenerationIds] = await Promise.all([
    getPokemonWithCatchStatus(user.id),
    getHuntedGenerationIds(user.id),
  ]);

  return NextResponse.json({ pokemon, huntedGenerationIds });
}

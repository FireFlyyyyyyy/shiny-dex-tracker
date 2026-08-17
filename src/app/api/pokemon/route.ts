import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPokemonWithCatchStatus } from "@/services/pokemon.service";

/**
 * GET /api/pokemon — tous les Pokémon + statut capturé pour l'utilisateur
 * connecté. Un seul appel pour toutes les générations : le filtrage par
 * onglet se fait ensuite côté client, sans nouvelle requête.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const pokemon = await getPokemonWithCatchStatus(session.user.id);
  return NextResponse.json({ pokemon });
}

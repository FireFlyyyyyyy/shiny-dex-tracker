import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { markCaught, unmarkCaught } from "@/services/shinyCatch.service";

/**
 * POST/DELETE /api/shiny-catches/[pokemonId] — marque/démarque un Pokémon
 * comme capturé en shiny, avec des détails optionnels (jeu, méthode, resets).
 * Toujours scopé à session.user.id (jamais à un userId fourni par le
 * client) : c'est la frontière de sécurité par utilisateur.
 */
async function requireUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id ?? null;
}

export async function POST(request: NextRequest, { params }: { params: { pokemonId: string } }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const pokemonId = Number(params.pokemonId);
  if (!Number.isInteger(pokemonId)) {
    return NextResponse.json({ error: "pokemonId invalide" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const game = typeof body?.game === "string" && body.game.trim() ? body.game.trim() : null;
  const method = typeof body?.method === "string" && body.method.trim() ? body.method.trim() : null;
  const resets =
    typeof body?.resets === "number" && Number.isFinite(body.resets) && body.resets >= 0
      ? Math.round(body.resets)
      : null;

  await markCaught(userId, pokemonId, { game, method, resets });
  return NextResponse.json({ caught: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: { pokemonId: string } }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const pokemonId = Number(params.pokemonId);
  if (!Number.isInteger(pokemonId)) {
    return NextResponse.json({ error: "pokemonId invalide" }, { status: 400 });
  }

  await unmarkCaught(userId, pokemonId);
  return NextResponse.json({ caught: false });
}

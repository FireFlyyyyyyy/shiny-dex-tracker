import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getHuntedGenerationIds } from "@/services/huntedGeneration.service";

/**
 * GET /api/hunted-generations — générations marquées "chasse en cours"
 * pour l'utilisateur connecté. Stocké en base (pas en localStorage) car la
 * page publique /u/[pseudo] doit pouvoir les lire côté serveur, pour
 * n'importe quel visiteur non connecté.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const generationIds = await getHuntedGenerationIds(session.user.id);
  return NextResponse.json({ generationIds });
}

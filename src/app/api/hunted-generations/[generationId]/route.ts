import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { markGenerationHunted, unmarkGenerationHunted } from "@/services/huntedGeneration.service";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id ?? null;
}

export async function POST(_request: NextRequest, { params }: { params: { generationId: string } }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const generationId = Number(params.generationId);
  if (!Number.isInteger(generationId)) {
    return NextResponse.json({ error: "generationId invalide" }, { status: 400 });
  }

  await markGenerationHunted(userId, generationId);
  return NextResponse.json({ hunted: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: { generationId: string } }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const generationId = Number(params.generationId);
  if (!Number.isInteger(generationId)) {
    return NextResponse.json({ error: "generationId invalide" }, { status: 400 });
  }

  await unmarkGenerationHunted(userId, generationId);
  return NextResponse.json({ hunted: false });
}

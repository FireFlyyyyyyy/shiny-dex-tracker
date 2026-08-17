import "server-only";
import { prisma } from "@/database/prisma";

export async function getHuntedGenerationIds(userId: string): Promise<number[]> {
  const rows = await prisma.huntedGeneration.findMany({
    where: { userId },
    select: { generationId: true },
  });
  return rows.map((r) => r.generationId);
}

export async function markGenerationHunted(userId: string, generationId: number) {
  return prisma.huntedGeneration.upsert({
    where: { userId_generationId: { userId, generationId } },
    update: {},
    create: { userId, generationId },
  });
}

export async function unmarkGenerationHunted(userId: string, generationId: number) {
  await prisma.huntedGeneration.deleteMany({ where: { userId, generationId } });
}

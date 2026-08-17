import "server-only";
import { prisma } from "@/database/prisma";

export interface CatchDetailsInput {
  game?: string | null;
  method?: string | null;
  resets?: number | null;
}

export async function markCaught(userId: string, pokemonId: number, details: CatchDetailsInput = {}) {
  const data = {
    game: details.game ?? null,
    method: details.method ?? null,
    resets: details.resets ?? null,
  };
  return prisma.shinyCatch.upsert({
    where: { userId_pokemonId: { userId, pokemonId } },
    update: data,
    create: { userId, pokemonId, ...data },
  });
}

export async function unmarkCaught(userId: string, pokemonId: number) {
  await prisma.shinyCatch.deleteMany({ where: { userId, pokemonId } });
}

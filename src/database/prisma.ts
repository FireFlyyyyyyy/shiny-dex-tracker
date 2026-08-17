import { PrismaClient } from "@prisma/client";

// En développement, Next.js recharge les modules à chaque changement de fichier.
// Sans ce pattern singleton, on créerait une nouvelle connexion Prisma à chaque
// rechargement, ce qui finit par épuiser les connexions disponibles.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

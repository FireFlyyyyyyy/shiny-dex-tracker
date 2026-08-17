import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/database/prisma";

// Credentials provider = NextAuth ne peut pas utiliser de sessions en base
// (uniquement JWT), et fait sa propre recherche Prisma dans authorize() —
// pas besoin d'adapter Prisma ici (il ne servirait à rien avec ce flow).
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Identifiants",
      credentials: {
        pseudo: { label: "Pseudo", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.pseudo || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { pseudo: credentials.pseudo },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.pseudo };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
};

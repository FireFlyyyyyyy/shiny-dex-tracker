import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/database/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/register — crée un compte (pseudo + mot de passe, email optionnel).
 * Le mot de passe est haché avant stockage, jamais renvoyé dans la réponse.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const emailInput = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const email = emailInput.length > 0 ? emailInput : null;
  const password = typeof body?.password === "string" ? body.password : "";
  const pseudo = typeof body?.pseudo === "string" ? body.pseudo.trim() : "";

  if (email !== null && !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 8 caractères" },
      { status: 400 }
    );
  }
  if (pseudo.length < 2) {
    return NextResponse.json({ error: "Pseudo trop court" }, { status: 400 });
  }

  if (email !== null) {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: "Un compte existe déjà avec cet email" }, { status: 409 });
    }
  }

  // Le pseudo sert aussi d'identifiant dans l'URL publique /u/[pseudo],
  // il doit donc être unique en plus d'être présentable dans une URL.
  const existingPseudo = await prisma.user.findUnique({ where: { pseudo } });
  if (existingPseudo) {
    return NextResponse.json({ error: "Ce pseudo est déjà pris" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, hashedPassword, pseudo },
  });

  return NextResponse.json(
    { id: user.id, email: user.email, pseudo: user.pseudo },
    { status: 201 }
  );
}

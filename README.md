# Shiny Dex Tracker

Suivi personnel de Pokémon chassés en shiny, avec compte, page publique
partageable et notes de chasse (jeu / méthode / resets), construit en
Next.js (App Router) + TypeScript + Tailwind CSS + Prisma/PostgreSQL.

## Installation locale

```bash
npm install
cp .env.example .env
```

Remplis `.env` :
- `DATABASE_URL` — chaîne de connexion PostgreSQL (ex. un projet gratuit sur
  [neon.tech](https://neon.tech))
- `NEXTAUTH_SECRET` — génère-le avec `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3002` en local

```bash
npx prisma migrate deploy   # crée les tables
npx prisma generate
npm run prisma:seed         # peuple la base depuis PokeAPI (~1025 Pokémon)
npm run dev
```

Le site est disponible sur http://localhost:3002.

## Déploiement (Vercel + Neon)

1. Crée un projet PostgreSQL gratuit sur [neon.tech](https://neon.tech) et
   copie la chaîne de connexion.
2. Sur [vercel.com](https://vercel.com), importe ce dépôt GitHub.
3. Dans les réglages du projet Vercel, ajoute les variables d'environnement :
   - `DATABASE_URL` — la chaîne Neon
   - `NEXTAUTH_SECRET` — un secret généré (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` — l'URL Vercel du site (ex. `https://xxx.vercel.app`)
4. Déploie. Une fois en ligne, exécute une seule fois les migrations et le
   seed contre la base Neon (depuis ta machine, avec `DATABASE_URL` pointant
   vers Neon dans `.env`) :
   ```bash
   npx prisma migrate deploy
   npm run prisma:seed
   ```

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Prisma + PostgreSQL
- NextAuth (Credentials — pseudo + mot de passe)
- Données Pokémon : [PokeAPI](https://pokeapi.co) (gratuite, sans clé)

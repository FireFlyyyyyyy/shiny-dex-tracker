/**
 * Peuple la table Pokemon à partir de PokeAPI (https://pokeapi.co, gratuit,
 * pas de clé requise). Pour chaque génération 1 à 9, on récupère la liste
 * d'espèces via /generation/{id} (jamais de plage de numéros codée en dur :
 * si une génération 10 apparaît un jour, augmenter GENERATION_COUNT suffit).
 * Les sprites (normal + shiny) sont construits directement à partir du
 * numéro de Pokédex, sans requête supplémentaire.
 *
 * Utilisation : npm run prisma:seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const POKEAPI_BASE = "https://pokeapi.co/api/v2";
// jsDelivr met en cache les mêmes fichiers que raw.githubusercontent.com,
// avec une meilleure disponibilité (raw.githubusercontent.com renvoie parfois
// des 503 sous charge).
const SPRITES_BASE = "https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon";
const GENERATION_COUNT = 9;
const BATCH_SIZE = 20;

interface GenerationSpecies {
  name: string;
  url: string;
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) throw new Error(`Impossible d'extraire l'id depuis ${url}`);
  return Number(match[1]);
}

function toDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function fetchTypes(id: number): Promise<string> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error(`pokemon/${id} -> ${res.status}`);
  const data = (await res.json()) as { types: { type: { name: string } }[] };
  return data.types.map((t) => t.type.name).join(",");
}

interface SpeciesInfo {
  nameFr: string | null;
  evolutionChainId: number | null;
}

// Nom officiel français + id de la chaîne d'évolution — /pokemon/{id} n'a
// pas ces infos, il faut la fiche espèce. nameFr est null si l'espèce n'a
// pas de nom fr (très rare) ; evolutionChainId est null pour les quelques
// espèces sans chaîne d'évolution référencée.
async function fetchSpeciesInfo(id: number): Promise<SpeciesInfo> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`);
  if (!res.ok) throw new Error(`pokemon-species/${id} -> ${res.status}`);
  const data = (await res.json()) as {
    names: { name: string; language: { name: string } }[];
    evolution_chain: { url: string } | null;
  };
  return {
    nameFr: data.names.find((n) => n.language.name === "fr")?.name ?? null,
    evolutionChainId: data.evolution_chain ? extractIdFromUrl(data.evolution_chain.url) : null,
  };
}

async function seedGeneration(generationId: number) {
  const res = await fetch(`${POKEAPI_BASE}/generation/${generationId}`);
  if (!res.ok) {
    console.warn(`Génération ${generationId} : réponse ${res.status}, on saute.`);
    return;
  }
  const data = (await res.json()) as { pokemon_species: GenerationSpecies[] };
  const species = data.pokemon_species
    .map((s) => ({ id: extractIdFromUrl(s.url), name: s.name }))
    .sort((a, b) => a.id - b.id);

  console.log(`Génération ${generationId} : ${species.length} Pokémon...`);

  let done = 0;
  for (let i = 0; i < species.length; i += BATCH_SIZE) {
    const batch = species.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async ({ id, name }) => {
        try {
          const [types, species] = await Promise.all([fetchTypes(id), fetchSpeciesInfo(id)]);
          const data = {
            name: toDisplayName(name),
            nameFr: species.nameFr,
            generation: generationId,
            spriteUrl: `${SPRITES_BASE}/${id}.png`,
            shinySpriteUrl: `${SPRITES_BASE}/shiny/${id}.png`,
            homeSpriteUrl: `${SPRITES_BASE}/other/home/${id}.png`,
            homeShinySpriteUrl: `${SPRITES_BASE}/other/home/shiny/${id}.png`,
            evolutionChainId: species.evolutionChainId,
            types,
          };
          await prisma.pokemon.upsert({
            where: { id },
            update: data,
            create: { id, ...data },
          });
          done += 1;
        } catch (err) {
          console.warn(`  Pokémon #${id} (${name}) ignoré :`, err instanceof Error ? err.message : err);
        }
      })
    );
  }
  console.log(`Génération ${generationId} : ${done}/${species.length} enregistrés.`);
}

async function main() {
  for (let genId = 1; genId <= GENERATION_COUNT; genId++) {
    await seedGeneration(genId);
  }
  const total = await prisma.pokemon.count();
  console.log(`Seed terminé. ${total} Pokémon en base.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

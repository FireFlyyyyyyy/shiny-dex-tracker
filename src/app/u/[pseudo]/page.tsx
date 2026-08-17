import { notFound } from "next/navigation";
import { prisma } from "@/database/prisma";
import { getPokemonWithCatchStatus } from "@/services/pokemon.service";
import { getHuntedGenerationIds } from "@/services/huntedGeneration.service";
import { PublicShinyDexView } from "@/components/shinydex/PublicShinyDexView";

interface PublicDexPageProps {
  params: { pseudo: string };
}

/**
 * Page publique en lecture seule (pas d'authentification requise) —
 * partageable, sur le modèle des dex publics de pokemon-element-sh.fr et
 * pokedextracker.com. N'affiche que les générations marquées "chasse en
 * cours" par le joueur : un lien ciblé sur ce qu'il chasse réellement,
 * plutôt qu'un déballage des 9 générations d'un coup.
 *
 * Composant serveur : ne fait que charger la donnée initiale (chargement
 * rapide, sans écran de chargement). PublicShinyDexView (client) prend le
 * relais ensuite : il sonde /api/public/[pseudo] pour rester à jour en
 * direct si le joueur chasse en live, et suit la langue du visiteur.
 */
export default async function PublicDexPage({ params }: PublicDexPageProps) {
  const user = await prisma.user.findUnique({ where: { pseudo: params.pseudo } });
  if (!user) notFound();

  const [pokemon, huntedGenerationIds] = await Promise.all([
    getPokemonWithCatchStatus(user.id),
    getHuntedGenerationIds(user.id),
  ]);

  return (
    <PublicShinyDexView
      pseudo={user.pseudo}
      initialPokemon={pokemon}
      initialHuntedGenerationIds={huntedGenerationIds}
    />
  );
}

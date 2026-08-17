"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Share2 } from "lucide-react";
import { useShinyDex } from "@/hooks/useShinyDex";
import { useHuntedGenerations } from "@/hooks/useHuntedGenerations";
import { useLanguage } from "@/hooks/useLanguage";
import { GENERATIONS } from "@/lib/constants";
import { GenerationCard } from "@/components/shinydex/GenerationCard";
import { ProgressBar, Skeleton } from "@/components/ui";

export default function ShinyDexHubPage() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const { pokemon, isLoaded } = useShinyDex();
  const { hunted, toggle } = useHuntedGenerations();

  const totalCaught = pokemon.filter((p) => p.caught).length;

  function statsFor(generationId: number) {
    const genPokemon = pokemon.filter((p) => p.generation === generationId);
    return { caught: genPokemon.filter((p) => p.caught).length, total: genPokemon.length };
  }

  const huntedGenerations = GENERATIONS.filter((g) => hunted.includes(g.id));
  const otherGenerations = GENERATIONS.filter((g) => !hunted.includes(g.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t.hub.title}</h1>
          <p className="text-muted text-sm">{t.hub.subtitle}</p>
        </div>
        {session?.user?.name && (
          <Link
            href={`/u/${session.user.name}`}
            target="_blank"
            className="self-start flex-shrink-0 flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted hover:text-cream hover:border-accent/30 transition-colors"
          >
            <Share2 size={14} />
            {t.hub.publicPageLink}
          </Link>
        )}
      </div>

      <ProgressBar
        value={totalCaught}
        max={pokemon.length}
        label={t.hub.totalProgress}
        showCaption
      />

      {!isLoaded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <>
          {huntedGenerations.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
                {t.hub.huntedSection}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {huntedGenerations.map((gen) => {
                  const stats = statsFor(gen.id);
                  return (
                    <GenerationCard
                      key={gen.id}
                      generation={gen}
                      caught={stats.caught}
                      total={stats.total}
                      isHunted
                      onToggleHunted={toggle}
                    />
                  );
                })}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
              {huntedGenerations.length > 0 ? t.hub.otherGenerations : t.hub.allGenerations}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherGenerations.map((gen) => {
                const stats = statsFor(gen.id);
                return (
                  <GenerationCard
                    key={gen.id}
                    generation={gen}
                    caught={stats.caught}
                    total={stats.total}
                    isHunted={false}
                    onToggleHunted={toggle}
                  />
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

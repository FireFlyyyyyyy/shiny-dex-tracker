"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useShinyDex } from "@/hooks/useShinyDex";
import { useHuntedGenerations } from "@/hooks/useHuntedGenerations";
import { useLanguage } from "@/hooks/useLanguage";
import { GENERATIONS } from "@/lib/constants";
import { PokemonGrid } from "@/components/shinydex/PokemonGrid";
import { GenerationTabRail } from "@/components/shinydex/GenerationTabRail";
import { CatchDetailModal } from "@/components/shinydex/CatchDetailModal";
import { ProgressBar, Skeleton } from "@/components/ui";
import { PokemonWithCatchStatus } from "@/types";
import { cn } from "@/lib/utils";

interface GenerationDexPageProps {
  params: { generationId: string };
}

export default function GenerationDexPage({ params }: GenerationDexPageProps) {
  const generationId = Number(params.generationId);
  const generation = GENERATIONS.find((g) => g.id === generationId);
  const { t } = useLanguage();

  const { pokemon, isLoaded, catchPokemon, uncatchPokemon } = useShinyDex();
  const { hunted, toggle } = useHuntedGenerations();
  const [hideCaught, setHideCaught] = useState(false);
  const [selected, setSelected] = useState<PokemonWithCatchStatus | null>(null);

  if (!generation) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <p className="text-muted">{t.gen.notFound}</p>
        <Link href="/shinydex" className="text-accent hover:underline">
          {t.gen.backToGenerations}
        </Link>
      </div>
    );
  }

  const genPokemon = pokemon.filter((p) => p.generation === generationId);
  const caughtCount = genPokemon.filter((p) => p.caught).length;
  const isHunted = hunted.includes(generationId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <Link
        href="/shinydex"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-cream transition-colors"
      >
        <ArrowLeft size={16} />
        {t.gen.backLink}
      </Link>

      <div>
        <GenerationTabRail active={generationId} />

        <div className="card page-lines p-5 space-y-5 rounded-tl-none">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{generation.label}</h1>
            <button
              onClick={() => toggle(generationId)}
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                isHunted
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-kraft-border text-kraft-muted hover:text-accent hover:border-accent/40"
              )}
            >
              <Star size={14} fill={isHunted ? "currentColor" : "none"} />
              {isHunted ? t.gen.huntedBadge : t.gen.markHunted}
            </button>
          </div>

          <ProgressBar value={caughtCount} max={genPokemon.length} showCaption tone="onKraft" />

          {!isLoaded ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <Skeleton key={i} className="h-24" tone="onKraft" />
              ))}
            </div>
          ) : (
            <>
              <label className="flex items-center gap-2 text-sm text-kraft-muted select-none w-fit">
                <input
                  type="checkbox"
                  checked={hideCaught}
                  onChange={(e) => setHideCaught(e.target.checked)}
                  className="accent-accent"
                />
                {t.gen.hideCaught}
              </label>
              <p className="text-xs text-kraft-muted">{t.gen.clickHint}</p>
              <PokemonGrid
                pokemon={pokemon}
                activeGeneration={generationId}
                onSelect={setSelected}
                hideCaught={hideCaught}
              />
            </>
          )}
        </div>
      </div>

      <CatchDetailModal
        pokemon={selected}
        allPokemon={pokemon}
        onClose={() => setSelected(null)}
        mode="edit"
        onSave={catchPokemon}
        onRemove={uncatchPokemon}
        onSelectFamilyMember={setSelected}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Link2, Check } from "lucide-react";
import { GENERATIONS } from "@/lib/constants";
import { PokemonGrid } from "@/components/shinydex/PokemonGrid";
import { CatchDetailModal } from "@/components/shinydex/CatchDetailModal";
import { ProgressBar } from "@/components/ui";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { PokemonWithCatchStatus } from "@/types";

const POLL_INTERVAL_MS = 8000;

/** Anchor ids ciblables depuis l'extérieur : /u/pseudo#gen-5 ouvre direct sur la 5G. */
function generationAnchorId(genId: number): string {
  return `gen-${genId}`;
}

/** Bouton qui copie le lien direct vers une section de génération dans le presse-papier. */
function CopyGenerationLinkButton({ pseudo, genId }: { pseudo: string; genId: number }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/u/${encodeURIComponent(pseudo)}#${generationAnchorId(genId)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — clipboard indisponible (contexte non sécurisé, permission refusée, etc.)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors",
        copied
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-kraft-border text-kraft-muted hover:text-accent hover:border-accent/40"
      )}
    >
      {copied ? <Check size={12} className="flex-shrink-0" /> : <Link2 size={12} className="flex-shrink-0" />}
      {copied ? t.public.linkCopied : t.public.copyLink}
    </button>
  );
}

interface PublicShinyDexViewProps {
  pseudo: string;
  initialPokemon: PokemonWithCatchStatus[];
  initialHuntedGenerationIds: number[];
}

/**
 * Partie interactive de la page publique /u/[pseudo]. La première donnée
 * vient du serveur (page.tsx, chargement rapide) puis ce composant sonde
 * /api/public/[pseudo] à intervalles réguliers pour refléter en direct les
 * nouvelles captures — utile si le joueur chasse en live et que des gens
 * suivent le lien pendant la session.
 */
export function PublicShinyDexView({ pseudo, initialPokemon, initialHuntedGenerationIds }: PublicShinyDexViewProps) {
  const { t } = useLanguage();
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [huntedGenerationIds, setHuntedGenerationIds] = useState(initialHuntedGenerationIds);
  const [selected, setSelected] = useState<PokemonWithCatchStatus | null>(null);

  // Le Pokémon ouvert dans la fiche doit lui aussi se rafraîchir s'il a été
  // mis à jour entre-temps (ex. le joueur ajoute la méthode après coup).
  const selectedIdRef = useRef<number | null>(null);
  useEffect(() => {
    selectedIdRef.current = selected?.id ?? null;
  }, [selected]);

  // Lien direct vers une génération (/u/pseudo#gen-5) : scroll jusqu'à la
  // section au premier rendu. Une seule fois — pas à chaque rafraîchissement
  // du sondage, sinon ça arracherait la page au visiteur qui a scrollé ailleurs.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/public/${encodeURIComponent(pseudo)}`);
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as {
          pokemon: PokemonWithCatchStatus[];
          huntedGenerationIds: number[];
        };
        if (cancelled) return;
        setPokemon(data.pokemon);
        setHuntedGenerationIds(data.huntedGenerationIds);
        if (selectedIdRef.current != null) {
          const updated = data.pokemon.find((p) => p.id === selectedIdRef.current);
          if (updated) setSelected(updated);
        }
      } catch {
        // ignore — on retentera au prochain intervalle
      }
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pseudo]);

  const huntedGenerations = GENERATIONS.filter((g) => huntedGenerationIds.includes(g.id));
  const huntedPokemon = pokemon.filter((p) => huntedGenerationIds.includes(p.generation));
  const totalCaught = huntedPokemon.filter((p) => p.caught).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          {t.public.titlePrefix}
          {pseudo}
          {t.public.titleSuffix}
        </h1>
        <p className="text-muted text-sm">{t.public.subtitle}</p>
      </div>

      {huntedGenerations.length === 0 ? (
        <p className="text-muted text-sm">
          {t.public.emptyPrefix}
          {pseudo}
          {t.public.emptySuffix}
        </p>
      ) : (
        <>
          <ProgressBar
            value={totalCaught}
            max={huntedPokemon.length}
            label={t.public.progressLabel}
            showCaption
          />

          {huntedGenerations.map((gen) => {
            const genPokemon = pokemon.filter((p) => p.generation === gen.id);
            const caughtCount = genPokemon.filter((p) => p.caught).length;

            return (
              <section
                key={gen.id}
                id={generationAnchorId(gen.id)}
                className="card page-lines p-5 space-y-3 scroll-mt-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display font-semibold text-lg">{gen.label}</h2>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-kraft-muted">
                      {caughtCount}/{genPokemon.length}
                    </span>
                    <CopyGenerationLinkButton pseudo={pseudo} genId={gen.id} />
                  </div>
                </div>
                <p className="text-xs text-kraft-muted">{t.public.clickHint}</p>
                <PokemonGrid
                  pokemon={pokemon}
                  activeGeneration={gen.id}
                  onSelect={setSelected}
                  selectableWhenUncaught={false}
                />
              </section>
            );
          })}
        </>
      )}

      <CatchDetailModal
        pokemon={selected}
        allPokemon={pokemon}
        onClose={() => setSelected(null)}
        mode="readOnly"
        onSelectFamilyMember={setSelected}
      />
    </div>
  );
}

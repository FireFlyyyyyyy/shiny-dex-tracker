"use client";

import Image from "next/image";
import { PokemonWithCatchStatus } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { useSpriteStyle } from "@/hooks/useSpriteStyle";
import { cn, pokemonDisplayName, spriteUrlFor, shinySpriteUrlFor } from "@/lib/utils";

interface PokemonCellProps {
  pokemon: PokemonWithCatchStatus;
  onSelect?: (pokemon: PokemonWithCatchStatus) => void;
  /** Sur la page publique, un Pokémon non capturé n'a rien à montrer. */
  selectableWhenUncaught?: boolean;
}

export function PokemonCell({ pokemon, onSelect, selectableWhenUncaught = true }: PokemonCellProps) {
  const { t, language } = useLanguage();
  const { spriteStyle } = useSpriteStyle();
  const displayName = pokemonDisplayName(pokemon, language);
  const isInteractive = !!onSelect && (pokemon.caught || selectableWhenUncaught);
  const Tag = isInteractive ? "button" : "div";

  return (
    <Tag
      onClick={isInteractive ? () => onSelect!(pokemon) : undefined}
      title={`#${pokemon.id} ${displayName}`}
      className={cn(
        "group relative flex flex-col items-center rounded-md border p-2 text-kraft-ink transition-all",
        pokemon.caught
          ? "border-accent bg-kraft-dark shadow-glow"
          : "border-kraft-border bg-kraft/70",
        isInteractive && "hover:border-accent/60"
      )}
    >
      {pokemon.caught && (
        <span
          className="pointer-events-none absolute -top-1.5 -right-1 rotate-[-7deg] rounded-sm border-2 border-danger bg-kraft px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-danger shadow-card"
          aria-hidden="true"
        >
          {t.common.foundStamp}
        </span>
      )}

      <div className="relative h-14 w-14 sm:h-16 sm:w-16">
        {/* Les deux sprites sont montés en permanence (donc préchargés dès
            l'affichage de la grille) et on bascule juste leur opacité au
            clic — sinon le sprite shiny doit d'abord finir de charger et
            on voit le sprite normal pendant ce court instant. */}
        <Image
          src={spriteUrlFor(pokemon, spriteStyle)}
          alt={displayName}
          fill
          sizes="64px"
          className={cn(
            "object-contain sepia contrast-75 transition-opacity duration-150",
            pokemon.caught ? "opacity-0" : "opacity-70"
          )}
          unoptimized
        />
        <Image
          src={shinySpriteUrlFor(pokemon, spriteStyle)}
          alt={`${displayName} shiny`}
          fill
          sizes="64px"
          className={cn(
            "object-contain transition-opacity duration-150",
            pokemon.caught ? "opacity-100" : "opacity-0"
          )}
          unoptimized
        />
      </div>
      <span className="text-[10px] text-kraft-muted">#{pokemon.id}</span>
      <span className="text-xs truncate max-w-full">{displayName}</span>
    </Tag>
  );
}

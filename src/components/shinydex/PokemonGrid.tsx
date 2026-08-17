"use client";

import { PokemonWithCatchStatus } from "@/types";
import { PokemonCell } from "./PokemonCell";

interface PokemonGridProps {
  pokemon: PokemonWithCatchStatus[];
  activeGeneration: number;
  onSelect?: (pokemon: PokemonWithCatchStatus) => void;
  hideCaught?: boolean;
  selectableWhenUncaught?: boolean;
}

export function PokemonGrid({
  pokemon,
  activeGeneration,
  onSelect,
  hideCaught,
  selectableWhenUncaught = true,
}: PokemonGridProps) {
  const filtered = pokemon.filter(
    (p) => p.generation === activeGeneration && (!hideCaught || !p.caught)
  );

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
      {filtered.map((p) => (
        <PokemonCell
          key={p.id}
          pokemon={p}
          onSelect={onSelect}
          selectableWhenUncaught={selectableWhenUncaught}
        />
      ))}
    </div>
  );
}

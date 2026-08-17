"use client";

import Link from "next/link";
import { GENERATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GenerationTabRailProps {
  active: number;
}

/**
 * Onglets de génération façon marque-pages de carnet, collés sur la
 * couverture (fond sombre) juste au-dessus de la page ouverte — le
 * marque-page actif reprend la couleur kraft pour indiquer la page tournée.
 */
export function GenerationTabRail({ active }: GenerationTabRailProps) {
  return (
    <nav className="flex gap-1 overflow-x-auto">
      {GENERATIONS.map((gen) => {
        const isActive = gen.id === active;
        return (
          <Link
            key={gen.id}
            href={`/shinydex/${gen.id}`}
            className={cn(
              "flex-shrink-0 font-display text-xs tracking-wide px-3 py-2 rounded-t-md border-t border-x transition-colors",
              isActive
                ? "bg-kraft text-kraft-ink border-kraft-border"
                : "bg-base-800 text-cream/70 border-base-700 hover:bg-base-700 hover:text-cream"
            )}
          >
            {gen.label}
          </Link>
        );
      })}
    </nav>
  );
}

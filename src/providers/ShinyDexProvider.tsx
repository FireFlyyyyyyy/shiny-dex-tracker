"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CatchDetails, PokemonWithCatchStatus } from "@/types";

export interface CatchDetailsInput {
  game?: string | null;
  method?: string | null;
  resets?: number | null;
}

interface ShinyDexState {
  pokemon: PokemonWithCatchStatus[];
  isLoaded: boolean;
  catchPokemon: (pokemonId: number, details?: CatchDetailsInput) => void;
  uncatchPokemon: (pokemonId: number) => void;
}

const ShinyDexContext = createContext<ShinyDexState | null>(null);

/**
 * Charge la liste complète des Pokémon (+ statut et détails de capture) une
 * fois la session authentifiée, puis gère les captures/décaptures avec
 * mise à jour optimiste et rollback si l'appel API échoue.
 */
export function ShinyDexProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [pokemon, setPokemon] = useState<PokemonWithCatchStatus[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Miroir synchrone de `pokemon`, pour lire l'état courant sans effet de
  // bord dans un updater de setState (React StrictMode invoque les
  // updaters deux fois en dev pour détecter les impuretés — un fetch() à
  // l'intérieur y serait donc doublé).
  const pokemonRef = useRef<PokemonWithCatchStatus[]>([]);
  useEffect(() => {
    pokemonRef.current = pokemon;
  }, [pokemon]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;
    fetch("/api/pokemon")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { pokemon: PokemonWithCatchStatus[] }) => {
        if (!cancelled) setPokemon(data.pokemon);
      })
      .catch(() => {
        // ignore — la grille reste vide, l'utilisateur peut recharger la page
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  const catchPokemon = useCallback((pokemonId: number, details: CatchDetailsInput = {}) => {
    const previous = pokemonRef.current.find((p) => p.id === pokemonId)?.catchDetails ?? null;

    const optimisticDetails: CatchDetails = {
      caughtAt: new Date().toISOString(),
      game: details.game ?? null,
      method: details.method ?? null,
      resets: details.resets ?? null,
    };

    setPokemon((prev) =>
      prev.map((p) => (p.id === pokemonId ? { ...p, caught: true, catchDetails: optimisticDetails } : p))
    );

    fetch(`/api/shiny-catches/${pokemonId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    }).then((res) => {
      if (!res.ok) {
        setPokemon((prev) =>
          prev.map((p) =>
            p.id === pokemonId ? { ...p, caught: !!previous, catchDetails: previous } : p
          )
        );
      }
    });
  }, []);

  const uncatchPokemon = useCallback((pokemonId: number) => {
    const previous = pokemonRef.current.find((p) => p.id === pokemonId)?.catchDetails ?? null;

    setPokemon((prev) =>
      prev.map((p) => (p.id === pokemonId ? { ...p, caught: false, catchDetails: null } : p))
    );

    fetch(`/api/shiny-catches/${pokemonId}`, { method: "DELETE" }).then((res) => {
      if (!res.ok) {
        setPokemon((prev) =>
          prev.map((p) =>
            p.id === pokemonId ? { ...p, caught: !!previous, catchDetails: previous } : p
          )
        );
      }
    });
  }, []);

  return (
    <ShinyDexContext.Provider value={{ pokemon, isLoaded, catchPokemon, uncatchPokemon }}>
      {children}
    </ShinyDexContext.Provider>
  );
}

export function useShinyDex(): ShinyDexState {
  const ctx = useContext(ShinyDexContext);
  if (!ctx) {
    throw new Error("useShinyDex doit être utilisé à l'intérieur de <ShinyDexProvider>");
  }
  return ctx;
}

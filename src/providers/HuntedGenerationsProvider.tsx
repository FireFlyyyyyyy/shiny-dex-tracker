"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

interface HuntedGenerationsState {
  hunted: number[];
  isLoaded: boolean;
  toggle: (generationId: number) => void;
}

const HuntedGenerationsContext = createContext<HuntedGenerationsState | null>(null);

/**
 * Générations marquées "chasse en cours", en base (pas en localStorage) —
 * la page publique /u/[pseudo] doit pouvoir les lire côté serveur pour
 * n'importe quel visiteur, y compris non connecté. Même pattern que
 * ShinyDexProvider : chargement une fois authentifié, bascule optimiste.
 */
export function HuntedGenerationsProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [hunted, setHunted] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const huntedRef = useRef<number[]>([]);
  useEffect(() => {
    huntedRef.current = hunted;
  }, [hunted]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;
    fetch("/api/hunted-generations")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { generationIds: number[] }) => {
        if (!cancelled) setHunted(data.generationIds);
      })
      .catch(() => {
        // ignore — la liste reste vide, l'utilisateur peut recharger la page
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  const toggle = useCallback((generationId: number) => {
    const wasHunted = huntedRef.current.includes(generationId);
    const nextHunted = !wasHunted;
    const method = nextHunted ? "POST" : "DELETE";

    setHunted((prev) =>
      nextHunted ? [...prev, generationId] : prev.filter((id) => id !== generationId)
    );

    fetch(`/api/hunted-generations/${generationId}`, { method }).then((res) => {
      if (!res.ok) {
        // rollback en cas d'échec
        setHunted((prev) =>
          wasHunted ? [...prev, generationId] : prev.filter((id) => id !== generationId)
        );
      }
    });
  }, []);

  return (
    <HuntedGenerationsContext.Provider value={{ hunted, isLoaded, toggle }}>
      {children}
    </HuntedGenerationsContext.Provider>
  );
}

export function useHuntedGenerations(): HuntedGenerationsState {
  const ctx = useContext(HuntedGenerationsContext);
  if (!ctx) {
    throw new Error("useHuntedGenerations doit être utilisé à l'intérieur de <HuntedGenerationsProvider>");
  }
  return ctx;
}

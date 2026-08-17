"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SpriteStyle } from "@/lib/utils";

const SPRITE_STYLE_STORAGE_KEY = "pokemon-shiny-tracker:spriteStyle";

interface SpriteStyleState {
  spriteStyle: SpriteStyle;
  setSpriteStyle: (style: SpriteStyle) => void;
}

const SpriteStyleContext = createContext<SpriteStyleState | null>(null);

/**
 * Préférence d'affichage des sprites (pixel-art classique ou rendu 3D
 * "Home"), gardée dans le navigateur — comme la langue, c'est un réglage
 * d'affichage local, pas une donnée de compte.
 */
export function SpriteStyleProvider({ children }: { children: React.ReactNode }) {
  const [spriteStyle, setSpriteStyleState] = useState<SpriteStyle>("pixel");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SPRITE_STYLE_STORAGE_KEY);
      if (stored === "pixel" || stored === "home") setSpriteStyleState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setSpriteStyle = useCallback((next: SpriteStyle) => {
    setSpriteStyleState(next);
    try {
      window.localStorage.setItem(SPRITE_STYLE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  return (
    <SpriteStyleContext.Provider value={{ spriteStyle, setSpriteStyle }}>
      {children}
    </SpriteStyleContext.Provider>
  );
}

export function useSpriteStyle(): SpriteStyleState {
  const ctx = useContext(SpriteStyleContext);
  if (!ctx) {
    throw new Error("useSpriteStyle doit être utilisé à l'intérieur de <SpriteStyleProvider>");
  }
  return ctx;
}

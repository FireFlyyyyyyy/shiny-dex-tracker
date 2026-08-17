"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Language, UI, UiStrings, LANGUAGE_STORAGE_KEY } from "@/lib/i18n";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: UiStrings;
}

const LanguageContext = createContext<LanguageState | null>(null);

/**
 * Préférence de langue (FR par défaut), gardée dans le navigateur — c'est
 * une préférence d'affichage locale, pas une donnée de compte, donc pas
 * besoin de la stocker en base comme les captures ou les générations chassées.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === "fr" || stored === "en") setLanguageState(stored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: UI[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage doit être utilisé à l'intérieur de <LanguageProvider>");
  }
  return ctx;
}

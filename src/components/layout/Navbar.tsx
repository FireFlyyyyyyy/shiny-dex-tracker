"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LogOut, BookOpen, ChevronDown, Grid2x2, Box } from "lucide-react";
import { GENERATIONS } from "@/lib/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useSpriteStyle } from "@/hooks/useSpriteStyle";
import { ShinyDexLogo } from "@/components/layout/ShinyDexLogo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const { language, setLanguage, t } = useLanguage();
  const { spriteStyle, setSpriteStyle } = useSpriteStyle();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Ferme le menu si on clique ailleurs, ou dès qu'on change de page
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const activeGenMatch = pathname?.match(/^\/shinydex\/(\d+)/);
  const activeGeneration = activeGenMatch ? Number(activeGenMatch[1]) : null;

  return (
    <header className="border-b border-border bg-base-800">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-2 gap-y-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link
            href="/shinydex"
            className="flex items-center gap-1.5 font-display font-semibold text-base sm:text-lg whitespace-nowrap flex-shrink-0"
          >
            <ShinyDexLogo size={22} className="flex-shrink-0" />
            <span>
              Shiny Dex<span className="hidden sm:inline">{t.nav.brandSuffix}</span>
            </span>
          </Link>

          {session?.user && (
            <div className="relative flex-shrink-0" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-1 sm:gap-1.5 rounded-md border px-2 sm:px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap transition-colors",
                  menuOpen || activeGeneration
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-cream hover:border-accent/30"
                )}
              >
                <BookOpen size={14} className="flex-shrink-0" />
                {activeGeneration ? `${activeGeneration}G` : t.nav.generationsMenu}
                <ChevronDown size={14} className={cn("transition-transform flex-shrink-0", menuOpen && "rotate-180")} />
              </button>

              {menuOpen && (
                <div className="absolute left-0 top-full mt-2 w-52 rounded-md border border-kraft-border bg-kraft p-2 shadow-card z-20">
                  <div className="grid grid-cols-3 gap-1">
                    {GENERATIONS.map((gen) => (
                      <Link
                        key={gen.id}
                        href={`/shinydex/${gen.id}`}
                        className={cn(
                          "text-center font-display text-xs py-1.5 rounded transition-colors",
                          gen.id === activeGeneration
                            ? "bg-accent text-cream"
                            : "text-kraft-ink hover:bg-kraft-dark"
                        )}
                      >
                        {gen.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/shinydex"
                    className="block text-center text-xs mt-2 pt-2 border-t border-kraft-border text-kraft-muted hover:text-accent transition-colors"
                  >
                    {t.nav.allGenerations}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-sm flex-shrink-0">
          <div className="flex items-center rounded-md border border-border overflow-hidden text-xs">
            <button
              onClick={() => setSpriteStyle("pixel")}
              aria-label={t.nav.spriteStylePixelLabel}
              aria-pressed={spriteStyle === "pixel"}
              className={cn(
                "flex items-center gap-1 px-2 py-1.5 transition-colors",
                spriteStyle === "pixel" ? "bg-accent/15 text-accent" : "text-muted hover:text-cream"
              )}
            >
              <Grid2x2 size={13} className="flex-shrink-0" />
              <span className="hidden sm:inline">Pixel</span>
            </button>
            <button
              onClick={() => setSpriteStyle("home")}
              aria-label={t.nav.spriteStyleHomeLabel}
              aria-pressed={spriteStyle === "home"}
              className={cn(
                "flex items-center gap-1 px-2 py-1.5 border-l border-border transition-colors",
                spriteStyle === "home" ? "bg-accent/15 text-accent" : "text-muted hover:text-cream"
              )}
            >
              <Box size={13} className="flex-shrink-0" />
              <span className="hidden sm:inline">3D</span>
            </button>
          </div>

          <div className="flex items-center rounded-md border border-border overflow-hidden text-xs">
            <button
              onClick={() => setLanguage("fr")}
              aria-label="Français"
              aria-pressed={language === "fr"}
              className={cn(
                "px-2 py-1.5 transition-colors",
                language === "fr" ? "bg-accent/15 text-accent" : "text-muted hover:text-cream"
              )}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("en")}
              aria-label="English"
              aria-pressed={language === "en"}
              className={cn(
                "px-2 py-1.5 border-l border-border transition-colors",
                language === "en" ? "bg-accent/15 text-accent" : "text-muted hover:text-cream"
              )}
            >
              EN
            </button>
          </div>

          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              aria-label={t.nav.signOut}
              title={session.user.name ?? undefined}
              className="flex items-center gap-1.5 rounded-md border border-border px-2 sm:px-3 py-1.5 text-muted hover:text-cream hover:border-accent/40 transition-colors"
            >
              <LogOut size={14} className="flex-shrink-0" />
              <span className="hidden sm:inline">{t.nav.signOut}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

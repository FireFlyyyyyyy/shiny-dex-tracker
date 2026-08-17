import type { Metadata, Viewport } from "next";
import { Special_Elite, Courier_Prime } from "next/font/google";
import "./globals.css";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { ShinyDexProvider } from "@/providers/ShinyDexProvider";
import { HuntedGenerationsProvider } from "@/providers/HuntedGenerationsProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { SpriteStyleProvider } from "@/providers/SpriteStyleProvider";
import { Navbar } from "@/components/layout/Navbar";

// Police "machine à écrire" pour les titres — l'app comme un carnet de terrain
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

// Police monospace pour le corps — cohérente avec l'esprit "notes tapées"
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Shiny Dex Tracker",
  description: "Suivi personnel des Pokémon chassés en shiny",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E2818",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${specialElite.variable} ${courierPrime.variable} dark`}>
      <body>
        <LanguageProvider>
          <SpriteStyleProvider>
            <SessionProviderWrapper>
              <ShinyDexProvider>
                <HuntedGenerationsProvider>
                  <div className="min-h-screen bg-base-900">
                    <Navbar />
                    <main>{children}</main>
                  </div>
                </HuntedGenerationsProvider>
              </ShinyDexProvider>
            </SessionProviderWrapper>
          </SpriteStyleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Carnet de terrain d'un dresseur : couverture toile sombre,
        // pages kraft lignées, encre teal, tampon encreur brique.
        base: {
          // couverture — fond de page, nav, tout ce qui est "hors page"
          900: "#1E2818", // couverture fermée (fond principal)
          800: "#28331F", // couverture ouverte (nav, onglets inactifs)
          700: "#33402A", // bordures sur fond sombre
          600: "#465438",
          500: "#5C6C4A",
        },
        kraft: {
          // page ouverte — fond des cartes et du contenu
          DEFAULT: "#D9CCA8",
          dark: "#C7B78E", // variante page plus sombre (hover, alternance)
          ink: "#2B2A20", // texte encre sur page kraft
          muted: "#6B6650", // texte encre atténué sur page kraft
          border: "#B7A87E", // bordure / pli sur page kraft
        },
        accent: {
          DEFAULT: "#1F5C52", // encre teal
          light: "#2C7A6C",
          dark: "#164A41",
        },
        warning: {
          DEFAULT: "#B8863A", // encre moutarde
        },
        danger: {
          DEFAULT: "#8C3B2E", // tampon encreur brique
        },
        muted: {
          // texte atténué sur fond sombre (couverture)
          DEFAULT: "#A7B096",
          foreground: "#7C876C",
        },
        border: {
          DEFAULT: "#33402A",
        },
        cream: {
          DEFAULT: "#EFE7CE", // texte clair sur fond sombre (couverture)
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        body: ["var(--font-body)", "monospace"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "0.9rem",
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(31, 92, 82, 0.16)", // halo encre teal, pas un glow néon
        card: "0 2px 10px rgba(30, 26, 15, 0.28)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

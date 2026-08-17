/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // Sprites Pokémon (normaux + shiny) via jsDelivr, qui met en cache
        // le repo GitHub PokeAPI/sprites avec une meilleure disponibilité.
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        // Ancienne source, gardée en repli si des URLs pré-existantes
        // n'ont pas été migrées.
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;

interface ShinyDexLogoProps {
  size?: number;
  className?: string;
}

/**
 * Marque du site — Poké Ball nichée dans une touffe d'herbe, éclats
 * scintillants au-dessus. Fond transparent (SVG), palette "carnet de
 * terrain" déjà utilisée dans l'appli.
 */
export function ShinyDexLogo({ size = 22, className }: ShinyDexLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* herbe — brins arrière (derrière la Poké Ball), fins et hauts */}
      <path d="M4 64 C1 31 3 14 5 6 C7 14 13 31 10 64 Z" fill="#33402A" />
      <path d="M52 64 C49 29 56 12 58 4 C60 12 62 29 59 64 Z" fill="#33402A" />
      <path d="M42 64 C39 39 45 22 47 14 C49 22 50 39 47 64 Z" fill="#465438" />

      {/* Poké Ball, nichée bas pour que l'herbe avant la recouvre en partie */}
      <path d="M18 36a14 14 0 0 1 28 0Z" fill="#2B2A20" />
      <path d="M18 36a14 14 0 0 0 28 0Z" fill="#D9CCA8" />
      <circle cx="32" cy="36" r="14" fill="none" stroke="#2B2A20" strokeWidth="2" />
      <rect x="18" y="34.6" width="28" height="2.8" fill="#2B2A20" />
      <circle cx="32" cy="36" r="5.5" fill="#D9CCA8" stroke="#2B2A20" strokeWidth="2.2" />
      <circle cx="32" cy="36" r="2.3" fill="#2B2A20" />

      {/* petite pierre, à moitié cachée dans l'herbe */}
      <ellipse cx="11" cy="60" rx="6" ry="4" fill="#C7B78E" stroke="#2B2A20" strokeWidth="1.4" />

      {/* herbe — touffe avant, dense, recouvre le bas de la Poké Ball */}
      <path d="M8 64 C5 55 8 38 10 30 C12 38 19 55 16 64 Z" fill="#465438" />
      <path d="M16 64 C13 47 19 30 21 22 C23 30 26 47 23 64 Z" fill="#33402A" />
      <path d="M22 64 C19 59 22 42 24 34 C26 42 32 59 29 64 Z" fill="#465438" />
      <path d="M36 64 C33 45 39 28 41 20 C43 28 46 45 43 64 Z" fill="#33402A" />
      <path d="M42 64 C39 60 42 40 44 32 C46 40 53 60 50 64 Z" fill="#465438" />
      <path d="M49 64 C46 50 52 34 54 26 C56 34 59 50 56 64 Z" fill="#33402A" />

      {/* éclats scintillants */}
      <path d="M13 6 Q14.4 11.6 20 13 Q14.4 14.4 13 20 Q11.6 14.4 6 13 Q11.6 11.6 13 6 Z" fill="#C9A227" />
      <path d="M46 2.5 Q47.1 6.9 51.5 8 Q47.1 9.1 46 13.5 Q44.9 9.1 40.5 8 Q44.9 6.9 46 2.5 Z" fill="#C9A227" />
      <path d="M54 15 Q54.6 17.4 57 18 Q54.6 18.6 54 21 Q53.4 18.6 51 18 Q53.4 17.4 54 15 Z" fill="#C9A227" />
    </svg>
  );
}

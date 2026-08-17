export { default } from "next-auth/middleware";

// Protège les pages de l'app — pas les routes API (elles font leur propre
// getServerSession et répondent par un 401 JSON plutôt qu'une redirection
// HTML, ce qui casse les appels fetch() côté client).
export const config = {
  matcher: ["/shinydex/:path*"],
};

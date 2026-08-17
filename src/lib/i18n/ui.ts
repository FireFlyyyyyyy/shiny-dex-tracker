export interface UiStrings {
  common: {
    foundStamp: string;
  };
  nav: {
    brandSuffix: string;
    generationsMenu: string;
    allGenerations: string;
    signOut: string;
    spriteStylePixelLabel: string;
    spriteStyleHomeLabel: string;
  };
  login: {
    title: string;
    pseudo: string;
    password: string;
    submit: string;
    submitting: string;
    noAccount: string;
    signUpLink: string;
    error: string;
  };
  register: {
    title: string;
    pseudo: string;
    email: string;
    password: string;
    passwordHint: string;
    submit: string;
    submitting: string;
    hasAccount: string;
    signInLink: string;
    genericError: string;
    autoLoginError: string;
  };
  hub: {
    title: string;
    subtitle: string;
    publicPageLink: string;
    totalProgress: string;
    huntedSection: string;
    otherGenerations: string;
    allGenerations: string;
  };
  gen: {
    backLink: string;
    notFound: string;
    backToGenerations: string;
    huntedBadge: string;
    markHunted: string;
    hideCaught: string;
    clickHint: string;
  };
  public: {
    titlePrefix: string;
    titleSuffix: string;
    subtitle: string;
    emptyPrefix: string;
    emptySuffix: string;
    progressLabel: string;
    clickHint: string;
    copyLink: string;
    linkCopied: string;
  };
  card: {
    removeHunted: string;
    markHunted: string;
    open: string;
  };
  progress: {
    complete: string;
    caught: string;
    left: string;
  };
  modal: {
    obtainedOn: string;
    gameLabel: string;
    methodLabel: string;
    resetsLabel: string;
    gameNotSet: string;
    methodNotSet: string;
    resetsSuffix: string;
    save: string;
    confirmCatch: string;
    remove: string;
    notSetPlaceholder: string;
    chooseGameFirst: string;
    family: string;
  };
}

export const UI: Record<"fr" | "en", UiStrings> = {
  fr: {
    common: {
      foundStamp: "trouvé",
    },
    nav: {
      brandSuffix: " Tracker",
      generationsMenu: "Générations",
      allGenerations: "Toutes les générations →",
      signOut: "Déconnexion",
      spriteStylePixelLabel: "Sprites pixel-art",
      spriteStyleHomeLabel: "Sprites 3D",
    },
    login: {
      title: "Connexion",
      pseudo: "Pseudo",
      password: "Mot de passe",
      submit: "Se connecter",
      submitting: "Connexion...",
      noAccount: "Pas encore de compte ?",
      signUpLink: "Inscris-toi",
      error: "Pseudo ou mot de passe incorrect",
    },
    register: {
      title: "Inscription",
      pseudo: "Pseudo",
      email: "Email (optionnel)",
      password: "Mot de passe",
      passwordHint: "8 caractères minimum",
      submit: "Créer mon compte",
      submitting: "Création...",
      hasAccount: "Déjà un compte ?",
      signInLink: "Connecte-toi",
      genericError: "Erreur lors de l'inscription",
      autoLoginError:
        "Compte créé, mais la connexion automatique a échoué — réessaie de te connecter.",
    },
    hub: {
      title: "Shiny Dex",
      subtitle: "Marque avec l'étoile les générations que tu chasses, puis ouvre leur page dédiée.",
      publicPageLink: "Ma page publique",
      totalProgress: "Progression totale",
      huntedSection: "Chasses en cours",
      otherGenerations: "Autres générations",
      allGenerations: "Toutes les générations",
    },
    gen: {
      backLink: "Toutes les générations",
      notFound: "Cette génération n'existe pas.",
      backToGenerations: "← Retour aux générations",
      huntedBadge: "Chasse en cours",
      markHunted: "Marquer comme chassée",
      hideCaught: "Cacher les Pokémon déjà capturés",
      clickHint: "Clique sur un Pokémon pour le marquer capturé (et noter jeu / méthode / resets).",
    },
    public: {
      titlePrefix: "Shiny Dex de ",
      titleSuffix: "",
      subtitle: "Page publique, en lecture seule — générations actuellement chassées.",
      emptyPrefix: "",
      emptySuffix: " n'a marqué aucune génération comme « chasse en cours » pour l'instant.",
      progressLabel: "Progression (générations chassées)",
      clickHint: "Clique sur un Pokémon shiny pour voir comment il a été obtenu.",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié !",
    },
    card: {
      removeHunted: "Retirer des chasses en cours",
      markHunted: "Marquer comme chassée",
      open: "Ouvrir →",
    },
    progress: {
      complete: "terminé",
      caught: "capturé",
      left: "restant",
    },
    modal: {
      obtainedOn: "Obtenu le",
      gameLabel: "Jeu",
      methodLabel: "Méthode de chasse",
      resetsLabel: "Resets / rencontres",
      gameNotSet: "Jeu non renseigné",
      methodNotSet: "Méthode non renseignée",
      resetsSuffix: "resets",
      save: "Enregistrer",
      confirmCatch: "Confirmer la capture",
      remove: "Retirer",
      notSetPlaceholder: "— Non renseigné —",
      chooseGameFirst: "Choisis d'abord un jeu pour affiner",
      family: "Famille d'évolution",
    },
  },
  en: {
    common: {
      foundStamp: "found",
    },
    nav: {
      brandSuffix: " Tracker",
      generationsMenu: "Generations",
      allGenerations: "All generations →",
      signOut: "Sign out",
      spriteStylePixelLabel: "Pixel-art sprites",
      spriteStyleHomeLabel: "3D sprites",
    },
    login: {
      title: "Log in",
      pseudo: "Username",
      password: "Password",
      submit: "Log in",
      submitting: "Logging in...",
      noAccount: "Don't have an account yet?",
      signUpLink: "Sign up",
      error: "Incorrect username or password",
    },
    register: {
      title: "Sign up",
      pseudo: "Username",
      email: "Email (optional)",
      password: "Password",
      passwordHint: "At least 8 characters",
      submit: "Create my account",
      submitting: "Creating...",
      hasAccount: "Already have an account?",
      signInLink: "Log in",
      genericError: "Error during registration",
      autoLoginError: "Account created, but automatic login failed — try logging in again.",
    },
    hub: {
      title: "Shiny Dex",
      subtitle: "Star the generations you're hunting, then open their dedicated page.",
      publicPageLink: "My public page",
      totalProgress: "Total progress",
      huntedSection: "Currently hunting",
      otherGenerations: "Other generations",
      allGenerations: "All generations",
    },
    gen: {
      backLink: "All generations",
      notFound: "This generation doesn't exist.",
      backToGenerations: "← Back to generations",
      huntedBadge: "Currently hunting",
      markHunted: "Mark as hunting",
      hideCaught: "Hide already-caught Pokémon",
      clickHint: "Click a Pokémon to mark it caught (and note game / method / resets).",
    },
    public: {
      titlePrefix: "",
      titleSuffix: "'s Shiny Dex",
      subtitle: "Public read-only page — generations currently being hunted.",
      emptyPrefix: "",
      emptySuffix: " hasn't marked any generation as “currently hunting” yet.",
      progressLabel: "Progress (hunted generations)",
      clickHint: "Click a shiny Pokémon to see how it was obtained.",
      copyLink: "Copy link",
      linkCopied: "Link copied!",
    },
    card: {
      removeHunted: "Remove from current hunts",
      markHunted: "Mark as hunting",
      open: "Open →",
    },
    progress: {
      complete: "complete",
      caught: "caught",
      left: "left",
    },
    modal: {
      obtainedOn: "Obtained on",
      gameLabel: "Game",
      methodLabel: "Hunting method",
      resetsLabel: "Resets / encounters",
      gameNotSet: "Game not set",
      methodNotSet: "Method not set",
      resetsSuffix: "resets",
      save: "Save",
      confirmCatch: "Confirm catch",
      remove: "Remove",
      notSetPlaceholder: "— Not set —",
      chooseGameFirst: "Choose a game first to narrow it down",
      family: "Evolution family",
    },
  },
};

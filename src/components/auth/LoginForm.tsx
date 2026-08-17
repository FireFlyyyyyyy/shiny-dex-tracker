"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn("credentials", { pseudo, password, redirect: false });
    setIsSubmitting(false);

    if (result?.error) {
      setError(t.login.error);
      return;
    }
    router.push("/shinydex");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">{t.login.title}</h1>

      <div className="space-y-1.5">
        <label className="text-sm text-kraft-muted" htmlFor="pseudo">
          {t.login.pseudo}
        </label>
        <input
          id="pseudo"
          type="text"
          required
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full bg-transparent border-b-2 border-kraft-border px-1 py-2 outline-none focus:border-accent"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-kraft-muted" htmlFor="password">
          {t.login.password}
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b-2 border-kraft-border px-1 py-2 outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-accent text-cream font-semibold py-2.5 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? t.login.submitting : t.login.submit}
      </button>

      <p className="text-sm text-kraft-muted text-center">
        {t.login.noAccount}{" "}
        <Link href="/register" className="text-accent hover:underline">
          {t.login.signUpLink}
        </Link>
      </p>
    </form>
  );
}

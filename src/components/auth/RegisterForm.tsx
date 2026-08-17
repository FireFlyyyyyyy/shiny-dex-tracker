"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export function RegisterForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? t.register.genericError);
      setIsSubmitting(false);
      return;
    }

    const result = await signIn("credentials", { pseudo, password, redirect: false });
    setIsSubmitting(false);

    if (result?.error) {
      setError(t.register.autoLoginError);
      return;
    }
    router.push("/shinydex");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">{t.register.title}</h1>

      <div className="space-y-1.5">
        <label className="text-sm text-kraft-muted" htmlFor="pseudo">
          {t.register.pseudo}
        </label>
        <input
          id="pseudo"
          type="text"
          required
          minLength={2}
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full bg-transparent border-b-2 border-kraft-border px-1 py-2 outline-none focus:border-accent"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-kraft-muted" htmlFor="email">
          {t.register.email}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b-2 border-kraft-border px-1 py-2 outline-none focus:border-accent"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-kraft-muted" htmlFor="password">
          {t.register.password}
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b-2 border-kraft-border px-1 py-2 outline-none focus:border-accent"
        />
        <p className="text-xs text-kraft-muted">{t.register.passwordHint}</p>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-accent text-cream font-semibold py-2.5 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? t.register.submitting : t.register.submit}
      </button>

      <p className="text-sm text-kraft-muted text-center">
        {t.register.hasAccount}{" "}
        <Link href="/login" className="text-accent hover:underline">
          {t.register.signInLink}
        </Link>
      </p>
    </form>
  );
}

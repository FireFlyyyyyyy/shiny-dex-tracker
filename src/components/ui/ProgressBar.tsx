"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showCaption?: boolean;
  /** "onDark" = posée sur la couverture (fond sombre) · "onKraft" = posée sur une page */
  tone?: "onDark" | "onKraft";
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  showCaption,
  tone = "onDark",
  className,
}: ProgressBarProps) {
  const { t, language } = useLanguage();
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const rest = Math.max(max - value, 0);
  // "capturé/restant" se pluralisent en français ; "caught/left" restent
  // invariables en anglais quel que soit le nombre.
  const plural = (n: number) => (language === "fr" && n > 1 ? "s" : "");
  const textMain = tone === "onKraft" ? "text-kraft-ink" : "text-cream";
  const textMuted = tone === "onKraft" ? "text-kraft-muted" : "text-muted";
  const track = tone === "onKraft" ? "bg-kraft-border/50" : "bg-base-700";

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className={textMuted}>{label}</span>
          <span className={cn("font-display font-semibold", textMain)}>
            {value}/{max}
          </span>
        </div>
      )}
      <div className={cn("h-2 w-full rounded-full overflow-hidden", track)}>
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showCaption && (
        <p className={cn("text-xs", textMuted)}>
          {pct}% {t.progress.complete} ({value} {t.progress.caught}
          {plural(value)}, {rest} {t.progress.left}
          {plural(rest)})
        </p>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { GenerationMeta } from "@/lib/constants";
import { ProgressBar } from "@/components/ui";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface GenerationCardProps {
  generation: GenerationMeta;
  caught: number;
  total: number;
  isHunted: boolean;
  onToggleHunted: (generationId: number) => void;
}

export function GenerationCard({ generation, caught, total, isHunted, onToggleHunted }: GenerationCardProps) {
  const { t } = useLanguage();

  return (
    <div className={cn("card p-4 card-hover space-y-3", isHunted && "border-accent/50")}>
      <div className="flex items-center justify-between">
        <Link
          href={`/shinydex/${generation.id}`}
          className="font-display font-semibold text-lg hover:text-accent transition-colors"
        >
          {generation.label}
        </Link>
        <button
          onClick={() => onToggleHunted(generation.id)}
          title={isHunted ? t.card.removeHunted : t.card.markHunted}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            isHunted ? "text-accent" : "text-kraft-muted hover:text-accent"
          )}
        >
          <Star size={18} fill={isHunted ? "currentColor" : "none"} />
        </button>
      </div>

      <ProgressBar value={caught} max={total} />

      <Link href={`/shinydex/${generation.id}`} className="text-sm text-accent hover:underline">
        {t.card.open}
      </Link>
    </div>
  );
}

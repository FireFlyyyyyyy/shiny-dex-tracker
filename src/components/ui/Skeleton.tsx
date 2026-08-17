import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  /** "onDark" = posé sur la couverture (fond sombre) · "onKraft" = posé sur une page */
  tone?: "onDark" | "onKraft";
}

export function Skeleton({ className, tone = "onDark" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md",
        tone === "onKraft" ? "bg-kraft-border/40" : "bg-base-700",
        className
      )}
    />
  );
}

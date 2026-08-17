import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "neutral" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  accent: "bg-accent/15 text-accent border-accent/30",
  neutral: "bg-base-700 text-muted border-border",
  danger: "bg-danger/15 text-danger border-danger/30",
};

export function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

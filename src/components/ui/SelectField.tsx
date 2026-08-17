"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectFieldOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  placeholder: string;
}

/**
 * Menu déroulant maison (bouton + panneau flottant kraft), même famille
 * visuelle que le menu "Générations" de la navbar — plus cohérent qu'un
 * <select> natif dont le popup ne peut pas être stylé.
 */
export function SelectField({ label, value, onChange, options, placeholder }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(next: string) {
    onChange(next);
    setOpen(false);
  }

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div className="space-y-1" ref={ref}>
      <span className="text-sm text-kraft-muted">{label}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 bg-transparent border-b-2 border-kraft-border px-1 py-2 text-left text-sm text-kraft-ink transition-colors hover:border-accent/50 focus:outline-none focus:border-accent"
        >
          <span className={cn("truncate", !selectedLabel && "text-kraft-muted/70 italic")}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDown
            size={14}
            className={cn("flex-shrink-0 text-kraft-muted transition-transform", open && "rotate-180")}
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-1 max-h-56 overflow-y-auto rounded-md border border-kraft-border bg-kraft shadow-card z-30">
            <button
              type="button"
              onClick={() => select("")}
              className={cn(
                "block w-full text-left px-3 py-2 text-sm italic text-kraft-muted hover:bg-kraft-dark transition-colors",
                !value && "bg-kraft-dark"
              )}
            >
              {placeholder}
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => select(option.value)}
                className={cn(
                  "block w-full text-left px-3 py-2 text-sm text-kraft-ink hover:bg-kraft-dark transition-colors",
                  value === option.value && "bg-accent/15 text-accent font-semibold"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

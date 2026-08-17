"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, Gamepad2, Compass } from "lucide-react";
import { PokemonWithCatchStatus } from "@/types";
import { GAME_OPTIONS, METHOD_OPTIONS, GAME_METHODS, translateGame, translateMethod } from "@/lib/i18n";
import { cn, formatDateShort, pokemonDisplayName, shinySpriteUrlFor } from "@/lib/utils";
import { Modal, SelectField } from "@/components/ui";
import { useLanguage } from "@/hooks/useLanguage";
import { useSpriteStyle } from "@/hooks/useSpriteStyle";
import type { CatchDetailsInput } from "@/providers/ShinyDexProvider";

interface CatchDetailModalProps {
  pokemon: PokemonWithCatchStatus | null;
  /** Liste complète, pour retrouver les autres membres de la même famille d'évolution. */
  allPokemon?: PokemonWithCatchStatus[];
  onClose: () => void;
  mode: "edit" | "readOnly";
  onSave?: (pokemonId: number, details: CatchDetailsInput) => void;
  onRemove?: (pokemonId: number) => void;
  /** Clic sur un autre membre de la famille : fait basculer la fiche sur ce Pokémon. */
  onSelectFamilyMember?: (pokemon: PokemonWithCatchStatus) => void;
}

export function CatchDetailModal({
  pokemon,
  allPokemon = [],
  onClose,
  mode,
  onSave,
  onRemove,
  onSelectFamilyMember,
}: CatchDetailModalProps) {
  const { language, t } = useLanguage();
  const { spriteStyle } = useSpriteStyle();
  const [game, setGame] = useState("");
  const [method, setMethod] = useState("");
  const [resets, setResets] = useState("");

  useEffect(() => {
    setGame(pokemon?.catchDetails?.game ?? "");
    setMethod(pokemon?.catchDetails?.method ?? "");
    setResets(pokemon?.catchDetails?.resets != null ? String(pokemon.catchDetails.resets) : "");
  }, [pokemon?.id, pokemon?.catchDetails]);

  if (!pokemon) return null;

  const family =
    pokemon.evolutionChainId != null
      ? allPokemon
          .filter((p) => p.evolutionChainId === pokemon.evolutionChainId)
          .sort((a, b) => a.id - b.id)
      : [];

  const gameOptions = GAME_OPTIONS.map((g) => ({ value: g.id, label: g[language] }));

  // Ne propose que les méthodes qui existent réellement sur le jeu choisi
  // (ex. pas de Poké Radar sur Épée/Bouclier) — sans jeu sélectionné, on
  // montre la liste complète pour ne pas bloquer la saisie.
  const availableMethodIds = game && GAME_METHODS[game] ? GAME_METHODS[game] : METHOD_OPTIONS.map((m) => m.id);
  const methodOptions = availableMethodIds.map((id) => ({
    value: id,
    label: translateMethod(id, language),
  }));

  function handleGameChange(nextGame: string) {
    setGame(nextGame);
    const methods = nextGame && GAME_METHODS[nextGame] ? GAME_METHODS[nextGame] : METHOD_OPTIONS.map((m) => m.id);
    if (method && !methods.includes(method)) setMethod("");
  }

  function handleSave() {
    if (!pokemon || !onSave) return;
    onSave(pokemon.id, {
      game: game || null,
      method: method || null,
      resets: resets.trim() ? Number(resets) : null,
    });
    onClose();
  }

  function handleRemove() {
    if (!pokemon || !onRemove) return;
    onRemove(pokemon.id);
    onClose();
  }

  return (
    <Modal open={!!pokemon} onClose={onClose} title={`#${pokemon.id} ${pokemonDisplayName(pokemon, language)}`}>
      <div className="flex items-center gap-4">
        {/* Toujours le sprite shiny : c'est le sujet même de la fiche. */}
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0">
          <Image
            src={shinySpriteUrlFor(pokemon, spriteStyle)}
            alt={`${pokemonDisplayName(pokemon, language)} shiny`}
            fill
            sizes="112px"
            className="object-contain"
            unoptimized
          />
        </div>
        {pokemon.catchDetails && (
          <p className="text-sm text-kraft-muted flex items-center gap-1.5">
            <CalendarDays size={14} className="flex-shrink-0" />
            {t.modal.obtainedOn} {formatDateShort(pokemon.catchDetails.caughtAt, language)}
          </p>
        )}
      </div>

      {mode === "readOnly" ? (
        <div className="space-y-2.5 text-sm">
          <p className="flex items-center gap-2">
            <Gamepad2 size={15} className="flex-shrink-0 text-kraft-muted" />
            {pokemon.catchDetails?.game ? (
              <span>{translateGame(pokemon.catchDetails.game, language)}</span>
            ) : (
              <span className="italic text-kraft-muted">{t.modal.gameNotSet}</span>
            )}
          </p>
          <p className="flex items-center gap-2">
            <Compass size={15} className="flex-shrink-0 text-kraft-muted" />
            {pokemon.catchDetails?.method ? (
              <span>{translateMethod(pokemon.catchDetails.method, language)}</span>
            ) : (
              <span className="italic text-kraft-muted">{t.modal.methodNotSet}</span>
            )}
          </p>
          {pokemon.catchDetails?.resets != null && (
            <p className="text-kraft-muted pl-[27px]">
              {pokemon.catchDetails.resets} {t.modal.resetsSuffix}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <SelectField
            label={t.modal.gameLabel}
            value={game}
            onChange={handleGameChange}
            options={gameOptions}
            placeholder={t.modal.notSetPlaceholder}
          />
          <SelectField
            label={t.modal.methodLabel}
            value={method}
            onChange={setMethod}
            options={methodOptions}
            placeholder={game ? t.modal.notSetPlaceholder : t.modal.chooseGameFirst}
          />

          <div className="space-y-1">
            <label className="text-sm text-kraft-muted" htmlFor="catch-resets">
              {t.modal.resetsLabel}
            </label>
            <input
              id="catch-resets"
              type="number"
              min={0}
              value={resets}
              onChange={(e) => setResets(e.target.value)}
              className="w-full bg-transparent border-b-2 border-kraft-border px-1 py-2 outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleSave}
              className="flex-1 rounded-md bg-accent text-cream font-semibold py-2 text-sm"
            >
              {pokemon.caught ? t.modal.save : t.modal.confirmCatch}
            </button>
            {pokemon.caught && onRemove && (
              <button
                onClick={handleRemove}
                className="rounded-md border border-danger/50 text-danger px-3 py-2 text-sm hover:bg-danger/10 transition-colors"
              >
                {t.modal.remove}
              </button>
            )}
          </div>
        </div>
      )}

      {family.length > 1 && (
        <div className="space-y-2 pt-3 border-t border-kraft-border">
          <p className="text-xs font-semibold text-kraft-muted uppercase tracking-wide">
            {t.modal.family}
          </p>
          <div className="flex flex-wrap gap-3">
            {family.map((member) => {
              const isCurrent = member.id === pokemon.id;
              const isClickable = !isCurrent && !!onSelectFamilyMember;
              const Tag = isClickable ? "button" : "div";
              return (
                <Tag
                  key={member.id}
                  onClick={isClickable ? () => onSelectFamilyMember!(member) : undefined}
                  title={`#${member.id} ${pokemonDisplayName(member, language)}`}
                  className={cn(
                    "relative flex flex-col items-center gap-1 rounded-md border p-2 transition-colors",
                    isCurrent
                      ? "border-accent bg-kraft-dark"
                      : "border-kraft-border bg-kraft/50",
                    isClickable && "hover:border-accent/60"
                  )}
                >
                  {member.caught && (
                    <span
                      className="pointer-events-none absolute -top-1.5 -right-1 rotate-[-7deg] rounded-sm border-2 border-danger bg-kraft px-1 py-0.5 text-[7px] font-bold uppercase leading-none tracking-wide text-danger"
                      aria-hidden="true"
                    >
                      {t.common.foundStamp}
                    </span>
                  )}
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                    <Image
                      src={shinySpriteUrlFor(member, spriteStyle)}
                      alt={`${pokemonDisplayName(member, language)} shiny`}
                      fill
                      sizes="80px"
                      className={cn(
                        "object-contain transition-opacity",
                        !member.caught && "sepia contrast-75 opacity-70"
                      )}
                      unoptimized
                    />
                  </div>
                  <span className="text-[10px] text-kraft-muted truncate max-w-[70px]">
                    {pokemonDisplayName(member, language)}
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      )}
    </Modal>
  );
}

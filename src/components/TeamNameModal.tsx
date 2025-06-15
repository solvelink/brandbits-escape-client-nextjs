"use client";

import { Game } from "@/types/game";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Markdown } from "./Markdown";
import { Field, Input } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "./ui/button";

export const TeamNameModal = ({ game }: { game: Game }) => {
  const t = useTranslations();
  const [teamName, setTeamName] = useState(game.teamName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isValidForm = teamName.trim() !== "" && !isLoading;

  const submitTeamName = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValidForm) return;
    try {
      setIsLoading(true);
      setErrorMessage(null);
      // await startGame(gameStore.gameToken!, teamName);
      // navigate("game/2");
    } catch (error) {
      console.error("Error starting game:", error);
      setErrorMessage(t("common.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="bg-white rounded-xl text-center p-6">
      <h3 className="text-2xl font-bold">{t("onboarding_teamname.title")}</h3>
      <Markdown className="mt-4">
        {t("onboarding_teamname.description")}
      </Markdown>
      <Markdown className="text-gray-200 mt-2 text-sm">
        {t("onboarding_teamname.notice")}
      </Markdown>
      <form onSubmit={submitTeamName} autoComplete="off">
        <Field className="mt-4 text-left">
          <Input
            autoFocus
            className={clsx("input w-full", { error: errorMessage })}
            placeholder={t("onboarding_teamname.placeholder")}
            value={teamName}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {errorMessage && <p className="input-error">{errorMessage}</p>}
        </Field>
        <Button type="submit" className="w-full mt-4" disabled={!isValidForm}>
          {isLoading ? t("common.loading") : t("onboarding_teamname.button")}
        </Button>
      </form>
    </div>
  );
};

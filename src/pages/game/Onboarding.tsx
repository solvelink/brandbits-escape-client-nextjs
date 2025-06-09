import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Header } from "@/components/layout/Header";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import TooltipIcon from "@/assets/icons/tooltip.svg?react";
import { useLanguage } from "@/hooks/langauge";
import clsx from "clsx";
import { Field, Input } from "@headlessui/react";
import { useState } from "react";
import { startGame } from "@/api/routes";
import useGameStore from "@/stores/gameStore";

const steps = [
  {
    type: "tooltip",
    name: "progress",
    tooltipBoxStyle: { top: 110, left: 0 },
    tooltipStyle: { left: 12 },
  },
  {
    type: "tooltip",
    name: "points",
    tooltipBoxStyle: { top: 88, right: 0 },
    tooltipStyle: { right: 98 },
  },
  {
    type: "tooltip",
    name: "map",
    tooltipBoxStyle: { top: 88, right: 0 },
    tooltipStyle: { right: 12 },
  },
  {
    type: "tooltip",
    name: "hint",
    tooltipBoxStyle: { bottom: 106, left: 0 },
    tooltipStyle: { left: 32 },
  },
  {
    type: "tooltip",
    name: "teamname",
    tooltipBoxStyle: { top: 68, left: 0 },
    tooltipStyle: { left: 40 },
  },
  {
    type: "teamname",
  },
];

export default function Onboarding() {
  const params = useParams();
  const { navigate } = useLanguage();
  const { t } = useTranslation();

  const step = Number(params.step);
  const currentStep = steps[step - 1];
  const hasTooltipBottom = currentStep.tooltipBoxStyle?.bottom !== undefined;

  const handleNextStep = () => {
    const nextStep = step + 1;
    if (nextStep <= steps.length) {
      navigate("game/onboarding/" + nextStep);
    }
  };

  return (
    <div>
      <div className="z-10 absolute top-0 w-full h-screen bg-purple/70" />
      <Header progress={75} highlight={currentStep.name} />
      {currentStep.type === "tooltip" && (
        <div
          className={clsx("z-15 absolute max-w-2xs mx-4 flex flex-col", {
            "flex-col-reverse": hasTooltipBottom,
          })}
          style={currentStep.tooltipBoxStyle}
        >
          <div className="relative h-5">
            <TooltipIcon
              className={clsx("absolute", {
                "transform rotate-180": hasTooltipBottom,
              })}
              style={currentStep.tooltipStyle}
            />
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <Markdown>
              {t(`onboarding_description.${currentStep.name}`)}
            </Markdown>
          </div>
        </div>
      )}
      {currentStep.type === "teamname" && (
        <div className="absolute z-15 top-1/2 left-1/2 transform -translate-1/2 w-full p-4">
          <TeamNameModal />
        </div>
      )}
      {currentStep.type === "tooltip" && (
        <BottomNavigation>
          {currentStep.name === "hint" && (
            <Button className="flex-1" disabled color="purple">
              {t("common.hint")}
            </Button>
          )}
          <Button onClick={handleNextStep} className="flex-2">
            {t("common.continue")}
          </Button>
        </BottomNavigation>
      )}
    </div>
  );
}

export const TeamNameModal = () => {
  const gameStore = useGameStore();
  const { navigate } = useLanguage();
  const { t } = useTranslation();
  const [teamName, setTeamName] = useState(gameStore.game?.teamName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isValidForm = teamName.trim() !== "" && !isLoading;

  const submitTeamName = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValidForm) return;
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await startGame(gameStore.gameToken!, teamName);
      gameStore.setTeamName(teamName);
      navigate("game/2");
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

import { Header } from "@/components/ui/Header";
import clsx from "clsx";
import { notFound } from "next/navigation";
import TooltipIcon from "@/assets/icons/tooltip.svg";
import { Markdown } from "@/components/Markdown";
import { getTranslations } from "next-intl/server";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/button";
import { TeamNameModal } from "@/components/TeamNameModal";
import { getGame } from "@/repository/server";

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

export default async function OnboardingStep({
  params,
}: Readonly<{
  params: Promise<{ step: string }>;
}>) {
  const { step } = await params;
  const t = await getTranslations();
  const game = await getGame();

  const currentStepNumber = Number(step);
  const currentStep = steps[currentStepNumber - 1];
  if (!currentStep) {
    return notFound();
  }

  const hasTooltipBottom = currentStep.tooltipBoxStyle?.bottom !== undefined;
  const nextStep =
    currentStepNumber <= steps.length ? currentStepNumber + 1 : null;

  return (
    <div>
      <div className="z-10 absolute top-0 w-full h-dvh bg-purple/70" />
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
          <TeamNameModal game={game} />
        </div>
      )}
      {currentStep.type === "tooltip" && (
        <BottomNavigation>
          {currentStep.name === "hint" && (
            <Button className="flex-1" disabled color="purple">
              {t("common.hint")}
            </Button>
          )}
          <Button href={`/game/onboarding/${nextStep}`} className="flex-2">
            {t("common.continue")}
          </Button>
        </BottomNavigation>
      )}
    </div>
  );
}

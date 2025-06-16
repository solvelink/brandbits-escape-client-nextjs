"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { GameDefaultPage } from "@/types/game";
import { QuestionType } from "@/types/enum";
import { useQuestionStore } from "@/stores/questionStore";

export const NextButton = ({
  page,
  nextPage,
}: {
  page: GameDefaultPage;
  nextPage: string;
}) => {
  const t = useTranslations();
  const isCorrect = useQuestionStore((state) => state.isCorrect);
  const isDisabled = page.questionType !== QuestionType.None && !isCorrect;

  return (
    <Button href={nextPage} className="flex-2" disabled={isDisabled}>
      {typeof page.buttonLabel === "string" && page.buttonLabel.trim() === ""
        ? t("common.next")
        : page.buttonLabel ?? t("common.next")}
    </Button>
  );
};

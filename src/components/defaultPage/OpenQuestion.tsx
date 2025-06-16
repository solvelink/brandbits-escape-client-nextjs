"use client";

import { GameAnswerResponse, GameDefaultPage } from "@/types/game";
import { Field, Input, Label } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useQuestionStore } from "@/stores/questionStore";
import { setPageAnswer } from "@/app/actions";
import { useGameStore } from "@/stores/gameStore";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";
import CrossIcon from "@/assets/icons/cross.svg";

export const OpenQuestion = ({
  label,
  answer,
  answers,
  pageId,
}: {
  label?: string;
  answer?: GameAnswerResponse;
  answers: GameDefaultPage["openQuestionAnswers"];
  pageId: number;
}) => {
  const t = useTranslations();
  const questionStore = useQuestionStore();
  const setPoints = useGameStore((s) => s.setPoints);

  const [text, setText] = useState(answer?.answer || "");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isValidForm = text.trim() !== "" && !isLoading;

  useEffect(() => {
    if (answer) {
      questionStore.setIsCorrect(true);
    }
  }, [answer]);

  const submitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidForm) return;
    setIsIncorrect(false);
    const validAnsers = answers!.map((a) => a.answer.toLowerCase());
    const answerString = text.trim();
    const isCorrect = validAnsers.includes(answerString.toLowerCase());
    if (isCorrect) {
      try {
        setIsLoading(true);
        const res = await setPageAnswer(pageId, {
          answer: answerString,
          hintCount: questionStore.hintCount,
        });
        setPoints(res.totalPoints);
        questionStore.setIsCorrect(true);
      } catch (error) {
        console.error("Error submitting answer:", error);
        questionStore.setIsCorrect(false);
        setIsIncorrect(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      questionStore.setIsCorrect(false);
      setIsIncorrect(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (isIncorrect) {
      setIsIncorrect(false);
    }
  };

  return (
    <form onSubmit={submitAnswer} autoComplete="off">
      <Field>
        {label && <Label className="block font-semibold mb-3">{label}</Label>}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              className={clsx("input w-full", {
                error: isIncorrect,
                success: questionStore.isCorrect,
              })}
              disabled={questionStore.isCorrect || isLoading}
              placeholder={t("pages.answer_placeholder")}
              value={text}
              onChange={handleInputChange}
            />
            <CrossIcon
              className={clsx(
                "w-4 fill-red absolute top-1/2 -translate-y-1/2 right-5 pointer-events-none opacity-transition-opacity duration-300",
                isIncorrect ? "opacity-100" : "opacity-0"
              )}
            />
            <CheckmarkIcon
              className={clsx(
                "w-4 fill-green absolute top-1/2 -translate-y-1/2 right-5 pointer-events-none opacity-transition-opacity duration-300",
                questionStore.isCorrect ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
          <Button
            type="submit"
            className="h-17"
            error={isIncorrect}
            disabled={!isValidForm || questionStore.isCorrect}
          >
            {t("common.check")}
          </Button>
        </div>
      </Field>
    </form>
  );
};

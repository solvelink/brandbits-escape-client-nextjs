"use client";

import { GameDefaultPage } from "@/types/game";
import { Field, Input, Label } from "@headlessui/react";
import { useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export const OpenQuestion = ({
  label,
  answers,
}: {
  label?: string;
  answers: GameDefaultPage["openQuestionAnswers"];
}) => {
  const t = useTranslations();
  const [answer, setAnswer] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const isValidForm = answer.trim() !== "" && !isLoading;

  const submitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidForm) return;
    const validAnsers = answers!.map((a) => a.answer.toLowerCase());
    const answerString = answer.trim();
    const isCorrect = validAnsers.includes(answerString.toLowerCase());
    if (isCorrect) {
      setIsIncorrect(false);
      // await answerHook.setAnswer(answerString);
    } else {
      setIsIncorrect(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    if (isIncorrect) {
      setIsIncorrect(false);
    }
  };

  return (
    <form onSubmit={submitAnswer} autoComplete="off">
      <Field>
        {label && <Label className="block font-semibold mb-3">{label}</Label>}
        <div className="flex items-center gap-2">
          <Input
            className={clsx("input w-full", {
              error: isIncorrect,
              success: isCorrect,
            })}
            disabled={isCorrect || isLoading}
            placeholder={t("pages.answer_placeholder")}
            value={answer}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="h-17"
            error={isIncorrect}
            disabled={!isValidForm || isCorrect}
          >
            {t("common.check")}
          </Button>
        </div>
      </Field>
    </form>
  );
};

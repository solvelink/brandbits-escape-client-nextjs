import { GameDefaultPage } from "@/types/game";
import { Field, Input, Label } from "@headlessui/react";
import { useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useAnswer } from "@/stores/answerStore";

export const OpenQuestion = ({
  label,
  answers,
}: {
  label?: string;
  answers: GameDefaultPage["openQuestionAnswers"];
}) => {
  const answerHook = useAnswer();

  const { t } = useTranslation();
  const [answer, setAnswer] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const isValidForm = answer.trim() !== "" && !answerHook.isLoading;

  const submitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidForm) return;
    const validAnsers = answers!.map((a) => a.answer.toLowerCase());
    const answerString = answer.trim();
    const isCorrect = validAnsers.includes(answerString.toLowerCase());
    if (isCorrect) {
      setIsIncorrect(false);
      await answerHook.setAnswer(answerString);
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
              success: answerHook.isCorrect,
            })}
            disabled={answerHook.isCorrect || answerHook.isLoading}
            placeholder={t("pages.answer_placeholder")}
            value={answerHook.answer || answer}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="h-17"
            error={isIncorrect}
            disabled={!isValidForm || answerHook.isCorrect}
          >
            {t("common.check")}
          </Button>
        </div>
      </Field>
    </form>
  );
};

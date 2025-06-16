"use client";

import clsx from "clsx";
import { Button, Field, Label } from "@headlessui/react";
import { GameAnswerResponse, GameDefaultPage } from "@/types/game";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";
import CrossIcon from "@/assets/icons/cross.svg";
import { useEffect, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { setPageAnswer } from "@/app/actions";
import { useQuestionStore } from "@/providers/QuestionStoreProvider";

export const MultipleChoiceQuestion = ({
  label,
  answer,
  answers,
  pageId,
}: {
  label?: string;
  answer?: GameAnswerResponse;
  answers: GameDefaultPage["multipleChoiceAnswers"];
  pageId: number;
}) => {
  const questionStore = useQuestionStore((state) => state);
  const setPoints = useGameStore((s) => s.setPoints);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (answer) {
      questionStore.setIsCorrect(true);
      setWrongAnswers(answer.answer ? JSON.parse(answer.answer) : []);
    }
  }, [answer]);

  const submitAnswer = async (index: number) => {
    if (isLoading) return;
    const currentAnsser = answers![index];
    if (!currentAnsser.isAnswer) {
      wrongAnswers.push(currentAnsser.id);
      questionStore.setIsCorrect(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await setPageAnswer(pageId, {
        answer: JSON.stringify(wrongAnswers),
        hintCount: wrongAnswers.length,
      });
      questionStore.setIsCorrect(true);
      setPoints(res.totalPoints);
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Field>
      {label && <Label className="block font-semibold mb-3">{label}</Label>}
      <div className="flex flex-col gap-3">
        {answers?.map((answer, index) => (
          <Button
            key={index}
            className={clsx("radio-item", {
              error: wrongAnswers.includes(answer.id),
              success: answer.isAnswer && questionStore.isCorrect,
            })}
            disabled={
              wrongAnswers.includes(answer.id) || questionStore.isCorrect
            }
            onClick={() => submitAnswer(index)}
          >
            {wrongAnswers.includes(answer.id) && (
              <CrossIcon className="w-4 fill-current absolute top-1/2 transform -translate-y-1/2" />
            )}
            {answer.isAnswer && questionStore.isCorrect && (
              <CheckmarkIcon className="w-4 fill-current absolute top-1/2 transform -translate-y-1/2" />
            )}
            {answer.label}
          </Button>
        ))}
      </div>
    </Field>
  );
};

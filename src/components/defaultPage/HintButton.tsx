"use client";

import { GameDefaultPage } from "@/types/game";
import { Button } from "../ui/button";
import { useQuestionStore } from "@/stores/questionStore";

export const HintButton = ({ hints }: { hints: GameDefaultPage["hints"] }) => {
  const questionStore = useQuestionStore();

  const handleHints = () => {
    questionStore.setHintCount(questionStore.hintCount + 1);
  };

  const hintTotal = hints.length;
  const maxHintsReached = questionStore.hintCount >= hintTotal;

  return (
    <Button
      className="flex-1"
      onClick={handleHints}
      color="purple"
      disabled={maxHintsReached || questionStore.isCorrect}
    >
      Hint
    </Button>
  );
};

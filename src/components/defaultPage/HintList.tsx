"use client";

import { useQuestionStore } from "@/providers/QuestionStoreProvider";
import { GameDefaultPage } from "@/types/game";
import { scrollIntoView } from "@/utils/scrollIntoView";
import { useEffect, useRef } from "react";

export const HintList = ({ hints }: { hints: GameDefaultPage["hints"] }) => {
  const hintCount = useQuestionStore((state) => state.hintCount);
  const lastHintRef = useRef<HTMLDivElement | null>(null);

  const shownHints = hints.slice(0, hintCount);

  useEffect(() => {
    if (lastHintRef.current) {
      scrollIntoView(lastHintRef.current);
    }
  }, [hintCount]);

  return (
    <div className="flex flex-col gap-2">
      {shownHints.map((hint, index) => (
        <div
          className="bg-gray-75 rounded-md p-5"
          key={hint.id}
          ref={index === shownHints.length - 1 ? lastHintRef : undefined}
        >
          <h1 className="font-bold">Hint {index + 1}</h1>
          <p>{hint.text}</p>
        </div>
      ))}
    </div>
  );
};

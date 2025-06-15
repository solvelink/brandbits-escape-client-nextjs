"use client";

import { Button, Field, Label } from "@headlessui/react";
import { GameDefaultPage } from "@/types/game";
// import { useAnswer } from "@/stores/answerStore";
// import { useState } from "react";

export const MultipleChoiceQuestion = ({
  label,
  answers,
}: {
  label?: string;
  answers: GameDefaultPage["multipleChoiceAnswers"];
}) => {
  // const answerHook = useAnswer();
  // const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <Field>
      {label && <Label className="block font-semibold mb-3">{label}</Label>}
      <div className="flex flex-col gap-3">
        {answers?.map((answer, index) => (
          <Button key={index} className="radio-item">
            {answer.label}
          </Button>
        ))}
      </div>
    </Field>
  );
};

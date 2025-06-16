import { create } from "zustand";

export type QuestionState = {
  hintCount: number;
  isCorrect?: boolean;
};

export type QuestionActions = {
  setHintCount: (count: number) => void;
  setIsCorrect: (isCorrect: boolean) => void;
};

export type QuestionStore = QuestionState & QuestionActions;

const defaultState: QuestionState = {
  hintCount: 0,
  isCorrect: undefined,
};

export const createQuestionStore = (
  initState: QuestionState = defaultState
) => {
  return create<QuestionStore>()((set) => ({
    ...initState,
    setHintCount: (count) => set({ hintCount: count }),
    setIsCorrect: (isCorrect) => set({ isCorrect }),
  }));
};

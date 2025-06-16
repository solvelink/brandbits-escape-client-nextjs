import { create } from "zustand";

type QuestionStore = {
  hintCount: number;
  isCorrect?: boolean;
  setHintCount: (count: number) => void;
  setIsCorrect: (isCorrect: boolean) => void;
};

export const useQuestionStore = create<QuestionStore>((set) => ({
  hintCount: 0,
  setHintCount: (count) => set({ hintCount: count }),
  setIsCorrect: (isCorrect) => set({ isCorrect }),
}));

import { getPageAnswer, setPageAnswer } from "@/api/routes";
import { LoadingState } from "@/types/enum";
import { GameAnswerResponse, SetGameAnswerResponse } from "@/types/game";
import { useEffect } from "react";
import { create } from "zustand";
import useGameStore, { useGamePage } from "./gameStore";

interface AnswerStoreState {
  answer: GameAnswerResponse | null;
  state: LoadingState;
  hintCount: number;
  fetchAnswer: (gameToken: string, pageId: number) => Promise<void>;
  setAnswer: (
    gameToken: string,
    pageId: number,
    answer: string
  ) => Promise<SetGameAnswerResponse | undefined>;
  setHintCount: (count: number) => void;
}

const useAnswerStore = create<AnswerStoreState>((set, get) => ({
  answer: null,
  state: LoadingState.LOADING,
  hintCount: 0,
  fetchAnswer: async (gameToken: string, pageId: number) => {
    set({ answer: null, state: LoadingState.LOADING, hintCount: 0 });
    try {
      const res = await getPageAnswer(gameToken, pageId);
      set({
        answer: res.data,
        state: LoadingState.IDLE,
      });
    } catch (error) {
      console.error("Error fetching answer:", error);
      set({
        state: LoadingState.ERROR,
        answer: null,
      });
    }
  },
  setAnswer: async (gameToken: string, pageId: number, answer: string) => {
    set({ state: LoadingState.LOADING });
    try {
      const res = await setPageAnswer(gameToken, pageId, {
        answer,
        hintCount: get().hintCount,
      });
      set({ answer: res.data.answer, state: LoadingState.IDLE });
      return res.data;
    } catch (error) {
      console.error("Error setting answer:", error);
      set({
        state: LoadingState.ERROR,
        answer: null,
      });
    }
  },
  setHintCount: (count: number) => set({ hintCount: count }),
}));

export const useAnswer = () => {
  const answerStore = useAnswerStore();
  const gameStore = useGameStore();
  const page = useGamePage();
  const pageId = page?.id;
  const gameToken = gameStore.gameToken;

  useEffect(() => {
    if (!gameToken || !pageId) return;
    answerStore.fetchAnswer(gameToken, pageId);
  }, []);

  const isCorrect = !!answerStore.answer;
  const isLoading = answerStore.state === LoadingState.LOADING;

  const setAnswer = async (answer: string) => {
    if (!gameToken || !pageId) return;
    const res = await answerStore.setAnswer(gameToken, pageId, answer);
    if (res) {
      gameStore.setPoints(res.totalPoints);
    }
  };

  return {
    answer: answerStore.answer?.answer,
    isCorrect,
    hintCount: answerStore.hintCount,
    isLoading,
    setAnswer,
    setHintCount: answerStore.setHintCount,
  };
};

export default useAnswerStore;

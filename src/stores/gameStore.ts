import { Game } from "@/types/game";
import { useParams } from "next/navigation";
import { create } from "zustand";

type GameStore = {
  game?: Game;
  points: number;
  setGame: (game: Game) => void;
  setPoints: (points: number) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  game: undefined,
  points: 0,
  setGame: (game) => set({ game, points: game.points || 0 }),
  setPoints: (points) => set({ points }),
}));

export const usePage = (game?: Game) => {
  const params = useParams();
  const step = parseInt(params.step as string, 10) || 1;
  const locale = params.locale as string;

  const pageContent = game?.pages.find((page) => page.order === step - 1);
  if (!pageContent) return undefined;

  return {
    ...pageContent,
    data: pageContent.data.find((data) => data.language === locale),
  };
};

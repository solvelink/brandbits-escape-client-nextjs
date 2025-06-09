import { getGame } from "@/api/routes";
import { useLanguage } from "@/hooks/langauge";
import { Language, LoadingState } from "@/types/enum";
import { Game } from "@/types/game";
import { useNavigate } from "react-router";
import { create } from "zustand";

interface GameStoreState {
  game: Game | null;
  state: LoadingState;
  errorMessage: string | null;
  currentPage: number;
  gameToken: string | null;
  fetchGame: () => Promise<void>;
  setCurrentPage: (page: number) => void;
  setTeamName: (teamName: string) => void;
  setPoints: (points: number) => void;
  setTeamImageUrl: (imageUrl: string) => void;
  setGameToken: (token: string) => void;
  clearGameToken: () => void;
}

const GAME_TOKEN_KEY = "escape_game_token";

const useGameStore = create<GameStoreState>((set, get) => {
  const storedGameToken = localStorage.getItem(GAME_TOKEN_KEY);

  return {
    game: null,
    state: LoadingState.IDLE,
    errorMessage: null,
    currentPage: 0,
    gameToken: storedGameToken || null,
    fetchGame: async () => {
      set({ state: LoadingState.LOADING, errorMessage: null });
      try {
        const gameToken = get().gameToken;
        if (!gameToken) {
          throw new Error("Game token is not set");
        }
        const res = await getGame(gameToken);
        set({
          game: res.data,
          state: LoadingState.IDLE,
          errorMessage: null,
        });
      } catch (error) {
        set({
          state: LoadingState.ERROR,
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setTeamName: (teamName: string) => {
      const { game } = get();
      if (!game) return;
      set({ game: { ...game, teamName } });
    },
    setPoints: (points: number) => {
      const { game } = get();
      if (!game) return;
      set({ game: { ...game, points } });
    },
    setTeamImageUrl: (imageUrl: string) => {
      const { game } = get();
      if (!game) return;
      set({ game: { ...game, teamImageUrl: imageUrl } });
    },
    setGameToken: (token: string) => {
      localStorage.setItem(GAME_TOKEN_KEY, token);
      set({ gameToken: token });
    },
    clearGameToken: () => {
      localStorage.removeItem(GAME_TOKEN_KEY);
      set({ gameToken: null });
    },
  };
});

export const useGamePage = () => {
  const { game, currentPage } = useGameStore();
  const { language } = useLanguage();

  if (!game) return undefined;

  const pageContent = game.pages.find((page) => page.order === currentPage);
  if (!pageContent) return null;

  const pageData =
    pageContent.data.find((data) => data.language === language) ||
    pageContent.data.find((data) => data.language === Language.NL);

  return {
    ...pageContent,
    data: pageData,
  };
};

export const useGameProgress = () => {
  const gameStore = useGameStore();
  const totalPages = gameStore.game?.pages.length || 0;
  const currentPage = gameStore.currentPage;
  return (currentPage / totalPages) * 100;
};

export const useGameNavigation = () => {
  const { game, currentPage } = useGameStore();
  const totalPages = game?.pages.length || 0;
  const navigate = useNavigate();

  const nextPage = () => {
    if (!game) return;
    if (currentPage < game.pages.length - 1) {
      navigate(`/game/${currentPage + 2}`);
    } else {
      navigate("/game/finish");
    }
  };

  const previousPage = (isFinish?: boolean) => {
    if (!game) return;
    if (isFinish) {
      navigate(`/game/${totalPages}`);
    } else if (currentPage > 0) {
      navigate(`/game/${currentPage}`);
    }
  };

  return { nextPage, previousPage };
};

export default useGameStore;

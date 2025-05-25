import { create } from "zustand";
import { getGame } from "../api/routes";

type Game = any; // Replace with your actual Escape type

interface EscapeStoreState {
  game: Game | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  fetchEscapeAndPages: () => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useEscapeStore = create<EscapeStoreState>((set) => ({
  game: null,
  loading: false,
  error: null,
  currentPage: 0,
  fetchEscapeAndPages: async () => {
    set({ loading: true, error: null });
    try {
      const game = await getGame(window.location.hostname);
      set({ game: game.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch", loading: false });
    }
  },
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useEscapeStore;

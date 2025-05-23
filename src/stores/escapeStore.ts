import { create } from "zustand";
import { getEscape, getPages } from "../api/routes";

type Escape = any; // Replace with your actual Escape type
type Page = any; // Replace with your actual Page type

interface EscapeStoreState {
  escape: Escape | null;
  pages: Page[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  fetchEscapeAndPages: () => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useEscapeStore = create<EscapeStoreState>((set) => ({
  escape: null,
  pages: [],
  loading: false,
  error: null,
  currentPage: 0,
  fetchEscapeAndPages: async () => {
    set({ loading: true, error: null });
    try {
      const escape = await getEscape(1);
      const pages = await getPages(1);
      set({ escape: escape.data, pages: pages.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch", loading: false });
    }
  },
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useEscapeStore;

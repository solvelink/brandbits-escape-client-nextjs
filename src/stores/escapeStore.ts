import { create } from "zustand";
import { getEscape } from "../api/routes";
import { Escape } from "@/types/escapes";
import { useLanguage } from "@/hooks/langauge";
import { LoadingState } from "@/types/enum";

interface EscapeStoreState {
  escape: Escape | null;
  state: LoadingState;
  errorMessage: string | null;
  fetchEscape: () => Promise<void>;
}

const useEscapeStore = create<EscapeStoreState>((set) => ({
  escape: null,
  state: LoadingState.LOADING,
  errorMessage: null,
  fetchEscape: async () => {
    set({ state: LoadingState.LOADING, errorMessage: null });
    try {
      const data = await getEscape(window.location.hostname);
      set({
        escape: data.data,
        state: LoadingState.IDLE,
        errorMessage: null,
      });
    } catch (error) {
      set({
        state: LoadingState.ERROR,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
}));

export const useEscape = () => {
  const escape = useEscapeStore((state) => state.escape);
  const { language } = useLanguage();
  if (!escape) {
    return undefined;
  }

  const escapeContent =
    escape?.escapeContent.find((content) => content.language === language) ||
    escape?.escapeContent.find((content) => content.language === "nl");

  return {
    ...escape,
    priceSingle: Number(escape.priceSingle),
    priceTeams: Number(escape.priceTeams),
    escapeContent,
  };
};

export default useEscapeStore;

import { useParams } from "react-router";
import StartPage from "./StartPage";
import DefaultPage from "./DefaultPage";
import PhotoPage from "./PhotoPage";
import { useEffect } from "react";
// import { Footer } from "@/components/layout/Footer";
import useGameStore, { useGamePage } from "@/stores/gameStore";
import { PageType } from "@/types/enum";
import { GameDefaultPage, GamePhotoPage, GameStartPage } from "@/types/game";
import NotFoundPage from "../NotFound";

export default function Page() {
  const gameStore = useGameStore();
  const params = useParams();
  const page = useGamePage();

  useEffect(() => {
    gameStore.setCurrentPage(Number(params.page) - 1);
  }, [params.page]);

  if (page?.type === PageType.StartPage) {
    return <StartPage page={page.data as GameStartPage} />;
  } else if (page?.type === PageType.DefaultPage) {
    return <DefaultPage page={page.data as GameDefaultPage} />;
  } else if (page?.type === PageType.PhotoPage) {
    return <PhotoPage page={page.data as GamePhotoPage} />;
  } else {
    return <NotFoundPage />;
  }
}

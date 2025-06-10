import { useParams } from "react-router";
import StartPage from "./StartPage";
import DefaultPage from "./DefaultPage";
import PhotoPage from "./PhotoPage";
import { useEffect, useState } from "react";
import useGameStore, { useGamePage } from "@/stores/gameStore";
import { PageType } from "@/types/enum";
import { GameDefaultPage, GamePhotoPage, GameStartPage } from "@/types/game";
import NotFoundPage from "../NotFound";
import { StatusDialog } from "@/components/game/StatusDialog";

export default function Page() {
  const gameStore = useGameStore();
  const params = useParams();
  const page = useGamePage();
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  useEffect(() => {
    gameStore.setCurrentPage(Number(params.page) - 1);
    window.scrollTo(0, 0);
  }, [params.page]);

  useEffect(() => {
    setShowStatusDialog(page?.isMiddlePage || false);
  }, [page?.isMiddlePage]);

  const PageContent = () => {
    if (page?.type === PageType.StartPage) {
      return <StartPage page={page.data as GameStartPage} />;
    } else if (page?.type === PageType.DefaultPage) {
      return <DefaultPage page={page.data as GameDefaultPage} />;
    } else if (page?.type === PageType.PhotoPage) {
      return <PhotoPage page={page.data as GamePhotoPage} />;
    } else {
      return <NotFoundPage />;
    }
  };

  return (
    <>
      <PageContent />
      <StatusDialog open={showStatusDialog} onClose={setShowStatusDialog} />
    </>
  );
}

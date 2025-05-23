import { GameLayout } from "@/components/layout/GameLayout";
import useEscapeStore from "@/stores/escapeStore";
import { useParams } from "react-router";
import StartPage from "./StartPage";
import DefaultPage from "./DefaultPage";
import PhotoPage from "./PhotoPage";
import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer";

export default function Page() {
  const escapeStore = useEscapeStore();
  const params = useParams();
  // get slug
  const page = escapeStore.pages[Number(params.page) - 1];
  useEffect(() => {
    escapeStore.setCurrentPage(Number(params.page) - 1);
  }, [params.page]);

  return (
    <GameLayout>
      {page?.type === "start_page" && <StartPage page={page.data[0]} />}
      {page?.type === "default_page" && <DefaultPage page={page.data[0]} />}
      {page?.type === "photo_page" && <PhotoPage page={page.data[0]} />}
      <Footer />
    </GameLayout>
  );
}

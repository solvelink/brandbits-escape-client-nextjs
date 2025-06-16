import { DefaultPage } from "@/components/game/DefaultPage";
import { PhotoPage } from "@/components/game/PhotoPage";
import { StartPage } from "@/components/game/StartPage";
import { StatusDialog } from "@/components/game/StatusDialog";
import { getGame } from "@/repository/server";
import { PageType } from "@/types/enum";
import { notFound } from "next/navigation";

export default async function GameStep({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const game = await getGame();
  const currentPage = game.pages.find(
    (page) => page.order === Number(step) - 1
  );
  if (!currentPage) {
    return notFound();
  }

  const totalPages = game.pages.length || 0;
  const isCenterPage =
    totalPages > 0 && currentPage.order === Math.floor(totalPages / 2);

  const PageContent = () => {
    if (currentPage.type === PageType.StartPage) {
      return <StartPage page={currentPage.data[0]} />;
    } else if (currentPage.type === PageType.DefaultPage) {
      return <DefaultPage page={currentPage.data[0]} game={game} />;
    } else if (currentPage.type === PageType.PhotoPage) {
      return <PhotoPage page={currentPage.data[0]} game={game} />;
    } else {
      return notFound();
    }
  };

  return (
    <>
      <PageContent />
      {isCenterPage && <StatusDialog game={game} />}
    </>
  );
}

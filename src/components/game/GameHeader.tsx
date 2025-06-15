"use client";

import { Game } from "@/types/game";
import { Header, HeaderBar } from "../ui/Header";
import { notFound, useParams } from "next/navigation";
import { PageType } from "@/types/enum";
import { usePathname } from "@/i18n/navigation";

export const GameHeader = ({ game }: { game: Game }) => {
  const params = useParams();
  const pathname = usePathname();
  const isOnboarding = pathname.includes("onboarding");
  if (isOnboarding) {
    return null;
  }

  const step = Number(params.step);
  const progress = (step / game.pages.length) * 100;

  const currentPage = game.pages.find((page) => page.order === step - 1);
  if (
    currentPage?.type === PageType.PhotoPage ||
    (currentPage?.type === PageType.DefaultPage &&
      currentPage.data[0].showProgressHeader)
  ) {
    return (
      <Header
        progress={progress}
        points={game.points}
        teamName={game.teamName}
      />
    );
  }

  return <HeaderBar />;
};

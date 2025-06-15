import { GameStartPage } from "@/types/game";
import { HeaderBar } from "../ui/Header";
import { StartPageCarousel } from "./StartPageCarousel";
import { BottomNavigation } from "../ui/BottomNavigation";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

export const StartPage = async ({ page }: { page: GameStartPage }) => {
  const t = await getTranslations();

  return (
    <div>
      <StartPageCarousel images={page.images} />
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-3xl">{page.title}</h1>
        <h2 className="text-sm text-gray-200 mt-1">{page.subtitle}</h2>
        <p className="rich-text mt-4">{page.description}</p>
      </div>
      <div className="text-center px-4 py-6">
        <p className="font-bold">TEXT</p>
        <ul className="flex flex-col items-center mt-3 font-light text-left">
          {page.duration && (
            <li className="flex mb-2 max-w-sm">
              <span>{page.duration}</span>
            </li>
          )}
          {page.distance && (
            <li className="flex mb-2 max-w-sm">
              <span>{page.distance}</span>
            </li>
          )}
          {page.accessibility && (
            <li className="flex mb-2 max-w-sm">
              <span>{page.accessibility}</span>
            </li>
          )}
          {page.demographic && (
            <li className="flex mb-2 max-w-sm">
              <span>{page.demographic}</span>
            </li>
          )}
        </ul>
      </div>
      <BottomNavigation>
        <Button href="/game/onboarding/1" className="w-full">
          {t("pages.start.button")}
        </Button>
      </BottomNavigation>
    </div>
  );
};

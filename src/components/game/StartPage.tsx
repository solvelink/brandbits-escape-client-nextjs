import { GameStartPage } from "@/types/game";
import { HeaderBar } from "../ui/Header";
import { StartPageCarousel } from "./StartPageCarousel";
import { BottomNavigation } from "../ui/BottomNavigation";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";
import { StartPageScrubberVideo } from "./StartPageScrubberVideo";
import { StartHeaderType } from "@/types/enum";

export const StartPage = async ({ page }: { page: GameStartPage }) => {
  const t = await getTranslations();

  return (
    <div>
      {page.headerType === StartHeaderType.Carousel && (
        <StartPageCarousel images={page.images} />
      )}
      {page.headerType === StartHeaderType.VideoScrubber &&
        page.headerVideoUrl && (
          <StartPageScrubberVideo url={page.headerVideoUrl} />
        )}
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-3xl">{page.title}</h1>
        <h2 className="text-sm text-gray-200 mt-1">{page.subtitle}</h2>
        <p className="rich-text mt-4">{page.description}</p>
      </div>
      <div className="text-center px-4 py-6">
        {/* {JSON.stringify(page)} */}
        <p className="font-bold">{page.listLabel}</p>
        <ul className="flex flex-col items-center mt-3 font-light text-left">
          {page.listItems.map((item) => (
            <li key={item.id} className="flex mb-2 max-w-sm">
              <div
                className="fill-current w-6 h-6 mr-2 shrink-0"
                dangerouslySetInnerHTML={{ __html: item.svgPath }}
              />
              <span className="mr-2">{item.text}</span>
            </li>
          ))}
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

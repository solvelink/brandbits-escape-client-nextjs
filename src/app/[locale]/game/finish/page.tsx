import { Stats } from "@/components/game/Stats";
import { RankingItem } from "@/components/RankingItem";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { CircleButton } from "@/components/ui/CircleButton";
import { getGame } from "@/repository/server";
import { getTranslations } from "next-intl/server";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Button } from "@/components/ui/button";

export default async function Finish() {
  const t = await getTranslations();
  const game = await getGame();

  const pageTotal = game.pages.length || 0;
  const previousPage = `/game/${pageTotal}`;

  return (
    <div>
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">{t("finish.title")}</h1>
        <p className="rich-text mt-4">{t("finish.description")}</p>
      </div>
      <div className="px-4 py-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">{t("finish.results")}</h3>
          <p className="font-light text-gray-200">{t("common.points")}</p>
        </div>
        <ul className="flex flex-col gap-2">
          <RankingItem number={1} name="Tom" time="02:53:15" points={200} />
          <RankingItem number={2} name="Teun" time="02:53:15" points={200} />
        </ul>
        <div className="mt-6">
          <h3 className="font-medium mb-2">
            {t("finish.results_team", { name: "Tom" })}
          </h3>
          <Stats
            points={200}
            time="02:53:15"
            quickest="Vraag 1"
            distance="2,5 km"
            active
          />
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">
            {t("finish.results_team", { name: "BRANDBITS" })}
          </h3>
          <Stats
            points={200}
            time="02:53:15"
            quickest="Vraag 1"
            distance="2,5 km"
          />
        </div>
        <div className="bg-gray-50 rounded-md overflow-hidden mt-6 h-64">
          {/* <Map className="h-full" /> */}
        </div>
      </div>
      <BottomNavigation>
        <CircleButton href={previousPage} className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        <Button href="/game/ranking" className="flex-1">
          {t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
}

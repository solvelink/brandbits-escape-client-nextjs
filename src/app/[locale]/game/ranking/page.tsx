import { RankingItem } from "@/components/RankingItem";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { CircleButton } from "@/components/ui/CircleButton";
import { getTranslations } from "next-intl/server";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Button } from "@/components/ui/button";
import { getGame, getRankings } from "@/repository/server";
import { formatTime } from "@/utils/formatTime";

export default async function Ranking() {
  const t = await getTranslations();
  const game = await getGame();
  const ranking = await getRankings();

  return (
    <div>
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">{t("ranking.title")}</h1>
        <p className="rich-text mt-4">{t("ranking.description")}</p>
      </div>
      <div className="px-4 py-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Escape {game.escape.name}</h3>
          <p className="font-light text-gray-200">{t("common.points")}</p>
        </div>
        <ul className="flex flex-col gap-2">
          {ranking.map((item, index) => (
            <RankingItem
              key={item.id}
              number={index + 1}
              name={item.teamName}
              active={game.id === item.id}
              time={formatTime(item.totalTime)}
              points={item.points}
            />
          ))}
        </ul>
      </div>
      <BottomNavigation>
        <CircleButton href="/game/finish" className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        <Button href="/game/feedback" className="flex-1">
          {t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
}

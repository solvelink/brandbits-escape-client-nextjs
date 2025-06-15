import { RankingItem } from "@/components/RankingItem";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { CircleButton } from "@/components/ui/CircleButton";
import { getTranslations } from "next-intl/server";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Button } from "@/components/ui/button";
import { getGame } from "@/repository/routes";

export default async function Ranking() {
  const t = await getTranslations();
  const game = await getGame();

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
          <RankingItem
            number={1}
            name="Tom"
            active={false}
            time="02:53:15"
            points={200}
          />
          <RankingItem
            number={2}
            name="Teun"
            active={false}
            time="02:53:15"
            points={200}
          />
          <RankingItem
            number={3}
            name="BRANDBITS"
            active={true}
            time="02:53:15"
            points={200}
          />
          <RankingItem
            number={4}
            name="De KluisKrakers"
            active={false}
            time="02:53:15"
            points={200}
          />
        </ul>
      </div>
      <BottomNavigation>
        <CircleButton href="/game/finish" className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        <Button disabled className="flex-1">
          {t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
}

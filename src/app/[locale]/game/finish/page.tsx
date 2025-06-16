import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { CircleButton } from "@/components/ui/CircleButton";
import { getGame } from "@/repository/server";
import { getTranslations } from "next-intl/server";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Button } from "@/components/ui/button";
import { Map } from "@/components/game/Map";
import { getGameStats } from "@/app/actions";
import { FinishStats } from "@/components/FinishStats";
import { Game } from "@/types/game";
import { length } from "@turf/length";

const getEscapeDistance = (game: Game) => {
  const geoJson = game.escape.mapGeojson;
  const geometry = JSON.parse(geoJson);
  const distance = length(geometry, { units: "kilometers" });

  const formatter = new Intl.NumberFormat("nl-NL", {
    maximumFractionDigits: 1,
  });

  if (distance < 1) {
    return `${formatter.format(Math.round(distance * 1000))} m`;
  } else if (distance < 10) {
    return `${formatter.format(Math.round(distance * 10) / 10)} km`;
  } else {
    return `${formatter.format(Math.round(distance))} km`;
  }
};

export default async function Finish() {
  const t = await getTranslations();
  const game = await getGame();
  const stats = await getGameStats();
  const distance = getEscapeDistance(game);

  const pageTotal = game.pages.length || 0;
  const previousPage = `/game/${pageTotal}`;

  return (
    <div>
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">{t("finish.title")}</h1>
        <p className="rich-text mt-4">{t("finish.description")}</p>
      </div>
      <div className="px-4 py-6">
        <FinishStats initalStats={stats} gameId={game.id} distance={distance} />
        <div className="bg-gray-50 rounded-md overflow-hidden mt-6 h-64">
          <Map className="h-full" />
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

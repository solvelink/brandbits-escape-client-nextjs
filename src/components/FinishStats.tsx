"use client";

import { GameStats } from "@/types/game";
import { useEffect, useState } from "react";
import { Stats } from "./game/Stats";
import { useTranslations } from "next-intl";
import { formatTime } from "@/utils/formatTime";
import { RankingItem } from "./RankingItem";
import { getGameStats } from "@/app/actions";

export const FinishStats = ({
  initalStats,
  gameId,
  distance,
}: {
  initalStats: GameStats[];
  gameId: number;
  distance: string;
}) => {
  const t = useTranslations();
  const [stats, setStats] = useState<GameStats[]>(initalStats);

  const multipleStats = stats.length > 1;
  const completedStats = stats.filter((game) => game.totalTime);
  const allCompleted = completedStats.length === stats.length;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const fetchGameStats = async () => {
      try {
        const newStats = await getGameStats();
        setStats(newStats);
      } catch (error) {
        console.error("Failed to fetch game stats:", error);
      }
    };

    if (!allCompleted) {
      interval = setInterval(fetchGameStats, 15000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [allCompleted]);

  return (
    <>
      {multipleStats && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">{t("finish.results")}</h3>
            <p className="font-light text-gray-200">{t("common.points")}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {stats.map((game, index) => (
              <RankingItem
                key={game.gameId}
                number={allCompleted ? index + 1 : "?"}
                className={game.totalTime ? "" : "opacity-50"}
                name={game.teamName}
                time={
                  game.totalTime
                    ? formatTime(game.totalTime)
                    : t("finish.unkown_time")
                }
                points={game.points ? game.points : "-"}
              />
            ))}
          </ul>
        </div>
      )}
      <div>
        <div className="flex flex-col gap-4">
          {completedStats.map((game) => (
            <div key={game.gameId}>
              <h3 className="font-medium mb-2">
                {multipleStats
                  ? t("finish.results_team", { name: game.teamName })
                  : t("finish.results")}
              </h3>
              <Stats
                points={game.points}
                time={formatTime(game.totalTime!)}
                quickest={t("pages.status.question", {
                  number: game.quickestAnswerIndex! + 1,
                })}
                distance={distance}
                active={game.gameId === gameId}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

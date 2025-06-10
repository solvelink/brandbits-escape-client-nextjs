import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { HeaderBar } from "@/components/layout/Header";
import { RankingItem } from "@/components/RankingItem";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import { CircleButton } from "@/components/ui/CircleButton";
import { useGameNavigation } from "@/stores/gameStore";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/langauge";
import { Map } from "@/components/game/Map";
import { Stats } from "./Stats";

export default function Finish() {
  const { t } = useTranslation();
  const { navigate } = useLanguage();
  const { previousPage } = useGameNavigation();

  const handleNext = () => {
    navigate("game/ranking");
  };

  return (
    <div>
      <HeaderBar sticky />
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">Gefeliciteerd!</h1>
        <p className="rich-text mt-4">
          Voluptate dolor ex tempor eu excepteur aute. Nisi commodo quis irure
          sunt ex veniam Lorem tempor enim. Veniam id eu duis. Sit ex ea
          incididunt velit
        </p>
      </div>
      <div className="px-4 py-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">En de winnaar is:</h3>
          <p className="font-light text-gray-200">Punten</p>
        </div>
        <ul className="flex flex-col gap-2">
          <RankingItem number={1} name="Tom" time="02:53:15" points={200} />
          <RankingItem number={2} name="Teun" time="02:53:15" points={200} />
        </ul>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Resultaten team Tom:</h3>
          <Stats
            points={200}
            time="02:53:15"
            quickest="Vraag 1"
            distance="2,5 km"
            active
          />
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Resultaten team BRANDBITS:</h3>
          <Stats
            points={200}
            time="02:53:15"
            quickest="Vraag 1"
            distance="2,5 km"
          />
        </div>
        <div className="bg-gray-50 rounded-md overflow-hidden mt-6 h-64">
          <Map className="h-full" />
        </div>
      </div>
      <BottomNavigation>
        <CircleButton onClick={() => previousPage(true)} className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        <Button onClick={handleNext} className="flex-1">
          {t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
}

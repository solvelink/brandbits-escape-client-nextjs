import { HeaderBar } from "@/components/layout/Header";
import { RankingItem } from "@/components/RankingItem";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useLanguage } from "@/hooks/langauge";
import { CircleButton } from "@/components/ui/CircleButton";
import { useTranslation } from "react-i18next";

export default function Ranking() {
  const { t } = useTranslation();
  const { navigate } = useLanguage();

  const handlePrevious = () => {
    navigate("game/finish");
  };

  return (
    <div>
      <HeaderBar sticky />
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">Raking</h1>
        <p className="rich-text mt-4">
          Voluptate dolor ex tempor eu excepteur aute. Nisi commodo quis irure
          sunt ex veniam Lorem tempor enim. Veniam id eu duis. Sit ex ea
          incididunt velit
        </p>
      </div>
      <div className="px-4 py-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Escape</h3>
          <p className="font-light text-gray-200">Punten</p>
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
        <CircleButton onClick={handlePrevious} className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        <Button disabled className="flex-1">
          {t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
}

import MapIcon from "@/assets/icons/map.svg?react";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import { MapDialog } from "../game/MapDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGameStore from "@/stores/gameStore";

export const HeaderBar = ({
  children,
  className,
  sticky,
}: {
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "p-2 text-white bg-turquoise border-b-3 border-turquoise-dark w-full max-w-xl",
        sticky && "sticky top-0 z-15",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ProgressBar = ({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) => {
  progress = Math.max(5, Math.min(progress, 100));

  return (
    <div
      className={clsx(
        "w-full relative h-2 bg-turquoise-dark rounded-full",
        className
      )}
    >
      <div
        className="absolute bg-white h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export const Header = ({
  progress = 0,
  className,
  sticky,
  highlight,
}: {
  progress?: number;
  className?: string;
  sticky?: boolean;
  highlight?: string;
}) => {
  const { t } = useTranslation();
  const [showMapDialog, setShowMapDialog] = useState(false);

  const game = useGameStore((state) => state.game);
  const points = game?.points || 0;
  const highlightClass = "relative z-15 pointer-events-none";

  return (
    <HeaderBar className={clsx("h-32", className)} sticky={sticky}>
      <div className="px-2 py-3">
        <div className="flex justify-between items-center">
          <p
            className={clsx(
              "text-xl font-medium leading-5",
              highlight === "teamname" && highlightClass
            )}
          >
            {game?.teamName || t("team_name_placeholder")}
          </p>
          <div className="ml-auto flex gap-3">
            <div
              className={clsx(
                "text-xl font-medium bg-turquoise-dark h-14 px-6 rounded-full flex items-center justify-center",
                highlight === "points" && highlightClass
              )}
            >
              {String(points).padStart(3, "0")}
            </div>
            <Button
              className={clsx(
                "bg-purple w-14 h-14 flex items-center justify-center rounded-full",
                highlight === "map" && highlightClass
              )}
              onClick={() => setShowMapDialog(true)}
            >
              <MapIcon className="fill-current w-7" />
            </Button>
          </div>
        </div>
        <ProgressBar
          progress={progress}
          className={clsx("mt-4", highlight === "progress" && highlightClass)}
        />
      </div>
      <MapDialog open={showMapDialog} onClose={setShowMapDialog} />
    </HeaderBar>
  );
};

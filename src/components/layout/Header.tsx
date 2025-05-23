import MapIcon from "@/assets/icons/map.svg?react";
import useEscapeStore from "@/stores/escapeStore";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import { MapDialog } from "../game/MapDialog";
import { useState } from "react";

export const HeaderBar = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "p-2 text-white bg-turquoise border-b-3 border-turquoise-dark fixed top-0 w-full max-w-xl z-10",
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

export const Header = () => {
  const escapeStore = useEscapeStore();
  const [showMapDialog, setShowMapDialog] = useState(false);

  const progress =
    escapeStore.pages.length > 0
      ? (escapeStore.currentPage / escapeStore.pages.length) * 100
      : 0;

  return (
    <>
      <div className="h-32"></div>
      <HeaderBar className="h-32">
        <div className="px-2 py-3">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium leading-5">Tom</p>
            <div className="ml-auto flex gap-3">
              <div className="text-xl font-medium bg-turquoise-dark h-14 px-6 rounded-full flex items-center justify-center">
                200
              </div>
              <Button
                className="bg-purple w-14 h-14 flex items-center justify-center rounded-full"
                onClick={() => setShowMapDialog(true)}
              >
                <MapIcon className="fill-current w-7" />
              </Button>
            </div>
          </div>

          <ProgressBar progress={progress} className="mt-4" />
        </div>
      </HeaderBar>
      <MapDialog open={showMapDialog} onClose={setShowMapDialog} />
    </>
  );
};

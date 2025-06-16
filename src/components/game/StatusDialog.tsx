"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Button } from "../ui/button";
import { StatsItem } from "./Stats";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { GameProgress } from "@/types/game";

export const StatusDialog = ({
  imageUrl,
  progress,
}: {
  imageUrl?: string;
  progress: GameProgress;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const title = t(`pages.status_${progress.teamStatus}.title`, {
    number: progress.teamPosition + 1,
  });
  const description = t(`pages.status_${progress.teamStatus}.description`);
  const button = t(`pages.status_${progress.teamStatus}.button`);

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className="relative z-30 focus:outline-none"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="duration-300 w-lg ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-light bg-white rounded-md p-4"
          >
            {imageUrl && (
              <div
                className="bg-gray-100 rounded-sm h-54 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            )}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2">{description}</p>
              <div className="py-6 flex flex-col gap-2">
                {progress.games.map((item) => (
                  <div key={item.id}>
                    <p className="text-left font-medium mb-1">
                      {t("common.team")} {item.teamName}:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <StatsItem
                        name={t("common.points")}
                        value={item.points}
                      />
                      <StatsItem
                        name={t("pages.status.question_label")}
                        value={
                          item.answerCount
                            ? t("pages.status.question", {
                                number: item.answerCount,
                              })
                            : "-"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-75">
                <div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="block w-full mt-6"
                  >
                    {button}
                  </Button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

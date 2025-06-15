"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Button } from "../ui/button";
import { StatsItem } from "./Stats";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const StatusDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  // status_first / status_middle / status_last

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
            <div className="bg-gray-100 rounded-sm h-54" />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">
                {t("pages.status_first.title")}
              </h3>
              <p className="mt-2">{t("pages.status_first.description")}</p>
              <div className="py-6">
                <div className="grid grid-cols-2 gap-3">
                  <StatsItem name="Punten" value={(200).toString()} />
                  <StatsItem name="Laatse vraag" value={"Vraag 9"} />
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} className="w-full">
                {t("pages.status_first.button")}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

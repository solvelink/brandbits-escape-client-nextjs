"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Markdown } from "@/components/Markdown";
import CrossIcon from "@/assets/icons/cross.svg";

export const CheckoutHelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block underline text-green"
      >
        {t("checkout.help.button")}
      </button>
      <CheckoutHelpDialog open={isOpen} onClose={setIsOpen} />
    </>
  );
};

export const CheckoutHelpDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
}) => {
  const t = useTranslations();

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-30 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-white p-6 duration-300 max-w-lg rounded-md ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-light"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5">
              <DialogTitle as="h3" className="font-medium">
                {t("checkout.help.title")}
              </DialogTitle>
              <button onClick={() => onClose(false)}>
                <CrossIcon className="fill-current w-6" />
              </button>
            </div>
            <Markdown>{t("checkout.help.description")}</Markdown>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

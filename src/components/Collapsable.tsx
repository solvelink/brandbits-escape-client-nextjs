import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Fragment } from "react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import clsx from "clsx";

export const Collapsable = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Disclosure as="div" className="bg-turquoise text-white rounded-md">
      {({ open }) => (
        <>
          <DisclosureButton className="p-5 flex items-center justify-between w-full font-bold">
            {title}
            <ChevronDownIcon
              className={clsx(
                "fill-current w-5 transition-transform",
                open ? "transform rotate-180" : ""
              )}
            />
          </DisclosureButton>
          <AnimatePresence>
            {open && (
              <DisclosurePanel static as={Fragment}>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">{children}</div>
                </motion.div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
};

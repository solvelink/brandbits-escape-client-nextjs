"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Fragment, useRef } from "react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import clsx from "clsx";
import { scrollIntoView } from "@/utils/scrollIntoView";

export const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Disclosure
      ref={ref}
      as="div"
      className="bg-turquoise text-white rounded-md"
    >
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
                  initial={{ height: 0, opacity: 0, y: 40 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: 40 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="overflow-hidden"
                  onAnimationComplete={(definition: any) => {
                    if (definition.height === 0) return;
                    scrollIntoView(ref.current);
                  }}
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

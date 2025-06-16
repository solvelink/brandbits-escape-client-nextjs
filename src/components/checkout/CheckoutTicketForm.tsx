"use client";

import { useCheckoutStore } from "@/providers/CheckoutStoreProvider";
import { Field, Radio, RadioGroup, Transition } from "@headlessui/react";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";
import { ProductType } from "@/types/enum";
import { useTranslations } from "next-intl";
import { Escape } from "@/types/escapes";
import { CountField } from "./CountField";
import { formatPrice } from "@/utils/price";

export const CheckoutTicketForm = ({ escape }: { escape: Escape }) => {
  const checkoutStore = useCheckoutStore((state) => state);
  const t = useTranslations();

  const options = [
    {
      label: t("checkout.single_label"),
      value: ProductType.Single,
    },
    {
      label: t("checkout.team_label"),
      value: ProductType.Team,
    },
  ];

  const isTeam = checkoutStore.type === ProductType.Team;
  const getTeamPrice = () => {
    const teamPrice = Number(escape.priceTeams) || 0;
    return teamPrice === 0 ? t("checkout.free") : formatPrice(teamPrice);
  };

  return (
    <div className="p-4">
      <RadioGroup
        className="flex flex-col gap-3"
        value={checkoutStore.type}
        onChange={checkoutStore.setType}
      >
        {options.map((option, i) => (
          <Field key={i}>
            <Radio className="radio-item" value={option.value} as="div">
              {({ checked }) => (
                <>
                  {checked && (
                    <CheckmarkIcon className="w-4 fill-current absolute top-1/2 transform -translate-y-1/2" />
                  )}
                  {option.label}
                </>
              )}
            </Radio>
          </Field>
        ))}
      </RadioGroup>
      <Transition show={isTeam}>
        <div className="grid grid-cols-2 items-center gap-4 mt-3 transition duration-300 ease-in data-closed:opacity-0">
          <div>
            <p className="font-medium">{t("checkout.team_quantity")}</p>
            <p className="text-gray-200">{getTeamPrice()}</p>
          </div>
          <CountField
            value={checkoutStore.quantity}
            onChange={checkoutStore.setQuantity}
            min={2}
          />
        </div>
      </Transition>
    </div>
  );
};

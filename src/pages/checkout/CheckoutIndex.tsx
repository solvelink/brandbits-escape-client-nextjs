import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { Field, Radio, RadioGroup, Transition } from "@headlessui/react";
import { Link } from "react-router";
import { CountField } from "@/components/checkout/CountField";
import { TicketInfoDialog } from "@/components/checkout/TicketInfoDialog";
import CheckmarkIcon from "@/assets/icons/checkmark.svg?react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEscape } from "@/stores/escapeStore";
import { formatPrice } from "@/utils/price";
import useCheckoutStore from "@/stores/checkoutStore";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/enum";
import { CheckoutBottomNavigation } from "@/components/checkout/CheckoutBottomNavigation";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";

export default function Checkout() {
  const escape = useEscape();
  const checkoutStore = useCheckoutStore();
  const { t } = useTranslation();

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

  const [isOpen, setIsOpen] = useState(false);

  const isTeam = checkoutStore.type === ProductType.Team;

  return (
    <div>
      <div className="pb-40">
        <CheckoutHeader title={t("checkout.title")} />
        <div
          className="bg-center bg-cover bg-no-repeat bg-gray-100 h-64"
          style={{
            backgroundImage: `url(${escape?.escapeContent?.checkoutImageUrl})`,
          }}
        />
        {escape?.escapeContent && (
          <div className="px-4 py-6 bg-gray-50 text-center">
            <h1 className="font-bold text-2xl">
              {escape.escapeContent.checkoutTitle}
            </h1>
            <p className="rich-text mt-4">
              {escape.escapeContent.checkoutDescription}{" "}
              <button
                onClick={() => setIsOpen(true)}
                className="inline-block underline text-green"
              >
                {t("checkout.help.button")}
              </button>
            </p>
          </div>
        )}
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
                {escape && (
                  <p className="text-gray-200">
                    {escape.priceTeams === 0
                      ? t("checkout.free")
                      : formatPrice(escape.priceTeams)}
                  </p>
                )}
              </div>
              <CountField
                value={checkoutStore.quantity}
                onChange={checkoutStore.setQuantity}
                min={2}
              />
            </div>
          </Transition>
          <div className="text-center mt-6">
            <Link to="invite" className="underline text-green mt">
              {t("checkout.invite_button")}
            </Link>
          </div>
          <PaymentMethods />
        </div>
      </div>
      <CheckoutBottomNavigation>
        <Button className="w-full" to="info">
          {t("common.continue")}
        </Button>
      </CheckoutBottomNavigation>
      <TicketInfoDialog open={isOpen} onClose={setIsOpen} />
    </div>
  );
}

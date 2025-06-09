import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { TicketInfoDialog } from "@/components/checkout/TicketInfoDialog";
import { CircleButton } from "@/components/ui/CircleButton";
import { useEscape } from "@/stores/escapeStore";
import { useState } from "react";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { DiscountCodeForm } from "@/components/checkout/DiscountCodeForm";
import { CheckoutBottomNavigation } from "@/components/checkout/CheckoutBottomNavigation";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";

export default function CheckoutInfo() {
  const escape = useEscape();
  const params = useParams();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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
          <CheckoutForm />
          <DiscountCodeForm />
          <PaymentMethods />
        </div>
      </div>
      <CheckoutBottomNavigation>
        <CircleButton to={`/${params.lang ?? ""}`} className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        <Button className="w-full" type="submit" form="checkout-form">
          {t("checkout.pay_button")}
        </Button>
      </CheckoutBottomNavigation>
      <TicketInfoDialog open={isOpen} onClose={setIsOpen} />
    </div>
  );
}

import IdealIcon from "@/assets/icons/methods/ideal.svg?react";
import BancontactIcon from "@/assets/icons/methods/bancontact.svg?react";
import VisaIcon from "@/assets/icons/methods/visa.svg?react";
import MastercardIcon from "@/assets/icons/methods/mastercard.svg?react";
import AmexIcon from "@/assets/icons/methods/amex.svg?react";
import ApplePayIcon from "@/assets/icons/methods/apple-pay.svg?react";
import PayPalIcon from "@/assets/icons/methods/paypal.svg?react";
import { useTranslation } from "react-i18next";

export const PaymentMethods = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-6">
      <p className="text-gray-200 text-xs">{t("checkout.payment_methods")}:</p>
      <div className="flex justify-center items-center gap-1 mt-3">
        <IdealIcon />
        <BancontactIcon />
        <VisaIcon />
        <MastercardIcon />
        <AmexIcon />
        <ApplePayIcon />
        <PayPalIcon />
      </div>
    </div>
  );
};

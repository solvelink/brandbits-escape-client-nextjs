import IdealIcon from "@/assets/icons/methods/ideal.svg";
import BancontactIcon from "@/assets/icons/methods/bancontact.svg";
import VisaIcon from "@/assets/icons/methods/visa.svg";
import MastercardIcon from "@/assets/icons/methods/mastercard.svg";
import AmexIcon from "@/assets/icons/methods/amex.svg";
import ApplePayIcon from "@/assets/icons/methods/apple-pay.svg";
import PayPalIcon from "@/assets/icons/methods/paypal.svg";
import { getTranslations } from "next-intl/server";

export const PaymentMethods = async () => {
  const t = await getTranslations();

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

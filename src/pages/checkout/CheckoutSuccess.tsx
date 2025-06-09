import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { useEscape } from "@/stores/escapeStore";
import { useTranslation } from "react-i18next";

export default function CheckoutSuccess() {
  const { t } = useTranslation();
  const escape = useEscape();

  return (
    <div className="pb-40">
      <CheckoutHeader
        showBackButton={false}
        title={t("checkout.success_title")}
      />
      <div
        className="bg-center bg-cover bg-no-repeat bg-gray-100 h-64"
        style={{
          backgroundImage: `url(${escape?.escapeContent?.checkoutSuccessImageUrl})`,
        }}
      />
      {escape?.escapeContent && (
        <div className="px-4 py-6 text-center">
          <h1 className="font-bold text-2xl">
            {escape.escapeContent.checkoutSuccessTitle}
          </h1>
          <p className="rich-text mt-4">
            {escape.escapeContent.checkoutSuccessDescription}{" "}
          </p>
        </div>
      )}
    </div>
  );
}

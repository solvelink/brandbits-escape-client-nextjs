import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { getEscape } from "@/repository/server";
import { getTranslations } from "next-intl/server";

export default async function CheckoutSuccess() {
  const t = await getTranslations();
  const escape = await getEscape();
  const escapeContent = escape.escapeContent[0];

  return (
    <div className="pb-40">
      <CheckoutHeader
        showBackButton={false}
        title={t("checkout.success_title")}
      />
      <div
        className="bg-center bg-cover bg-no-repeat bg-gray-100 h-64"
        style={{
          backgroundImage: `url(${escapeContent.checkoutSuccessImageUrl})`,
        }}
      />
      {escape?.escapeContent && (
        <div className="px-4 py-6 text-center">
          <h1 className="font-bold text-2xl">
            {escapeContent.checkoutSuccessTitle}
          </h1>
          <p className="rich-text mt-4">
            {escapeContent.checkoutSuccessDescription}
          </p>
        </div>
      )}
    </div>
  );
}

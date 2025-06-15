import { CheckoutBottomNavigation } from "@/components/checkout/CheckoutBottomNavigation";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutHelpButton } from "@/components/checkout/CheckoutHelp";
import { CheckoutTicketForm } from "@/components/checkout/CheckoutTicketForm";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CheckoutStoreProvider } from "@/providers/checkoutStoreProvider";
import { getEscape } from "@/repository/routes";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  const escape = await getEscape();
  const escapeContent = escape.escapeContent[0];

  return (
    <div>
      <CheckoutStoreProvider>
        <div className="pb-40">
          <CheckoutHeader title={t("checkout.title")} />
          <div
            className="bg-center bg-cover bg-no-repeat bg-gray-100 h-64"
            style={{
              backgroundImage: `url(${escapeContent.checkoutImageUrl})`,
            }}
          />
          <div className="px-4 py-6 bg-gray-50 text-center">
            <h1 className="font-bold text-2xl">
              {escapeContent.checkoutTitle}
            </h1>
            <p className="rich-text mt-4">
              {escapeContent.checkoutDescription} <CheckoutHelpButton />
            </p>
          </div>
          <div className="p-4">
            <CheckoutTicketForm escape={escape} />
            <div className="text-center mt-6">
              <Link href="/invite" className="underline text-green">
                {t("checkout.invite_button")}
              </Link>
            </div>
            <PaymentMethods />
          </div>
        </div>
        <CheckoutBottomNavigation escape={escape}>
          <Button className="w-full" href="/info">
            {t("common.continue")}
          </Button>
        </CheckoutBottomNavigation>
      </CheckoutStoreProvider>
    </div>
  );
}

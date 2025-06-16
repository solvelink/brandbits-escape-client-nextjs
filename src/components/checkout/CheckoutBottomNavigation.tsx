"use client";

import TicketIcon from "@/assets/icons/ticket.svg";
import { formatPrice } from "@/utils/price";
import { ProductType } from "@/types/enum";
import { useTranslations } from "next-intl";
import { Escape } from "@/types/escapes";
import { useCheckoutStore } from "@/providers/CheckoutStoreProvider";

export const CheckoutBottomNavigation = ({
  children,
  escape,
}: {
  children: React.ReactNode;
  escape: Escape;
}) => {
  const t = useTranslations();
  const checkoutStore = useCheckoutStore((state) => state);

  const isTeam = checkoutStore.type === ProductType.Team;
  const price = isTeam
    ? checkoutStore.quantity * Number(escape.priceTeams)
    : Number(escape.priceSingle) ?? 0;
  const discountAmount = checkoutStore.discountAmount ?? 0;
  const finalPrice = price - (price * discountAmount) / 100;
  const quantity = isTeam ? checkoutStore.quantity : 1;

  return (
    <div className="p-4 bg-white border-t border-gray-100 fixed bottom-0 w-xl max-w-full">
      <div className="flex items-center pb-4">
        <TicketIcon className="fill-current w-6 mr-2" />
        <span>{t("checkout.ticket", { count: quantity })}</span>
        <p className="ml-auto">
          {price !== finalPrice && (
            <span className="line-through text-gray-200 mr-2">
              {formatPrice(price)}
            </span>
          )}
          {finalPrice === 0 ? t("checkout.free") : formatPrice(finalPrice)}
        </p>
      </div>
      <div className="flex gap-4">{children}</div>
      <p className="text-gray-200 text-sm text-center mt-2">
        {t("checkout.vat_included")}
      </p>
    </div>
  );
};

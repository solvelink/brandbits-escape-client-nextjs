import TicketIcon from "@/assets/icons/ticket.svg?react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/price";
import useCheckoutStore from "@/stores/checkoutStore";
import { useEscape } from "@/stores/escapeStore";
import { ProductType } from "@/types/enum";

export const CheckoutBottomNavigation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const checkoutStore = useCheckoutStore();
  const escape = useEscape();
  const { t } = useTranslation();

  const isTeam = checkoutStore.type === ProductType.Team;
  const price = isTeam
    ? checkoutStore.quantity * (escape?.priceTeams ?? 0)
    : escape?.priceSingle ?? 0;
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

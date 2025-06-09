import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { InviteForm } from "@/components/InviteForm";
import { useEscape } from "@/stores/escapeStore";
import { useTranslation } from "react-i18next";

export default function Invite() {
  const { t } = useTranslation();
  const escape = useEscape();

  return (
    <div>
      <div>
        <CheckoutHeader showBackButton={false} title={t("invite.title")} />
        <div
          className="bg-center bg-cover bg-no-repeat bg-gray-100 h-64"
          style={{
            backgroundImage: `url(${escape?.escapeContent?.invitationImageUrl})`,
          }}
        />
        {escape?.escapeContent && (
          <div className="px-4 py-6 bg-gray-50 text-center">
            <h1 className="font-bold text-2xl">
              {escape.escapeContent.invitationTitle}
            </h1>
            <p className="rich-text mt-4">
              {escape.escapeContent.invitationDescription}
            </p>
          </div>
        )}
        <InviteForm />
      </div>
    </div>
  );
}

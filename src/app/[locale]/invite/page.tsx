import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { InviteForm } from "@/components/InviteForm";
import { getEscape } from "@/repository/routes";
import { getTranslations } from "next-intl/server";

export default async function InvitePage() {
  const t = await getTranslations();
  const escape = await getEscape();
  const escapeContent = escape.escapeContent[0];

  return (
    <div>
      <CheckoutHeader showBackButton={false} title={t("invite.title")} />
      <div
        className="bg-center bg-cover bg-no-repeat bg-gray-100 h-64"
        style={{
          backgroundImage: `url(${escapeContent.invitationImageUrl})`,
        }}
      />
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">{escapeContent.invitationTitle}</h1>
        <p className="rich-text mt-4">{escapeContent.invitationDescription}</p>
      </div>
      <InviteForm escape={escape} />
    </div>
  );
}

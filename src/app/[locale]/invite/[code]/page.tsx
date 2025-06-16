"use client";

import { redeemInviteCode } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InviteCode() {
  const t = useTranslations();
  const [isError, setIsError] = useState(false);
  const params = useParams();
  const router = useRouter();

  const redeem = async (code: string) => {
    const numericCode = code.replace(/[^0-9]/g, "");
    try {
      await redeemInviteCode(numericCode);
      router.push("/game/1");
    } catch (error) {
      console.error("Error redeeming invite code:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    const code = params.code as string;
    const isValid = code && /^\d{6}$/.test(code);
    if (!isValid) {
      setIsError(true);
      return;
    }
    redeem(code);
  }, []);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center p-4">
        <h1 className="font-bold text-2xl">{t("invite_error.title")}</h1>
        <p className="rich-text mt-4">{t("invite_error.description")}</p>
        <Button className="mt-6" href="/">
          {t("invite_error.button")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <LoadingSpinner />
    </div>
  );
}

import { redeemInviteCode } from "@/api/routes";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import { useLanguage } from "@/hooks/langauge";
import useGameStore from "@/stores/gameStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

export default function InviteLink() {
  const gameStore = useGameStore();
  const { t } = useTranslation();
  const { code } = useParams();
  const { navigate } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateCode = async (code: string | undefined) => {
      const isValid = code && /^\d{6}$/.test(code);
      if (!isValid) {
        console.error("Invalid code format. Code must be 6 digits long.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const numericCode = code.replace(/[^0-9]/g, "");
        const res = await redeemInviteCode(
          window.location.hostname,
          numericCode
        );
        gameStore.setGameToken(res.data.gameToken);
        navigate("game/1");
      } catch (error) {
        console.error("Error submitting invite code:", error);
      }
    };

    validateCode(code);
  }, [code]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red bg-red/10 px-4 py-3 rounded-md">
        {t("common.error")}
      </div>
    </div>
  );
}

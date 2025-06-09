import useEscapeStore from "@/stores/escapeStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { LoadingSpinner } from "./LoadingSpinner";
import { LoadingState } from "@/types/enum";

export const CheckoutLayout = () => {
  const escapeStore = useEscapeStore();
  const { t } = useTranslation();

  useEffect(() => {
    escapeStore.fetchEscape();
  }, []);

  if (escapeStore.state === LoadingState.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (escapeStore.state === LoadingState.ERROR) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red bg-red/10 px-4 py-3 rounded-md">
          {t("common.error")}
        </div>
      </div>
    );
  }

  return <Outlet />;
};

"use client";

import MapPinIcon from "@/assets/icons/map-pin.svg";
import { isAppleDevice } from "@/utils/isApple";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { NavigationPreferenceDialog } from "./NavigationPreferenceDialog";

export const NavigationLink = (params: {
  appleMapsUrl: string;
  googleMapsUrl: string;
}) => {
  const t = useTranslations();
  const [showPreferenceDialog, setShowPreferenceDialog] = useState(false);

  const openNavigation = () => {
    if (isAppleDevice()) {
      const preference = localStorage.getItem("escape_navigation_preference");
      if (preference === "apple") {
        window.open(params.appleMapsUrl, "_blank");
      } else if (preference === "google") {
        window.open(params.googleMapsUrl, "_blank");
      } else {
        setShowPreferenceDialog(true);
      }
    } else {
      window.open(params.googleMapsUrl, "_blank");
    }
  };

  return (
    <>
      <button
        onClick={openNavigation}
        className="flex items-center text-turquoise font-medium underline"
      >
        <MapPinIcon className="fill-current w-4 mr-1" />
        {t("pages.navigation.link")}
      </button>
      <NavigationPreferenceDialog
        open={showPreferenceDialog}
        onClose={setShowPreferenceDialog}
        {...params}
      />
    </>
  );
};

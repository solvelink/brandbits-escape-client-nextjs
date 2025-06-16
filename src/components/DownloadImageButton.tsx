"use client";

import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import DownloadIcon from "@/assets/icons/download.svg";

export const DownloadImageButton = ({ id }: { id: number }) => {
  const t = useTranslations();

  const handleDownload = async () => {
    const a = document.createElement("a");
    a.href = `/api/download/${id}`;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Button onClick={handleDownload}>
      <DownloadIcon className="fill-current w-4 mr-2" />
      {t("share.download")}
    </Button>
  );
};

"use client";

import { Game, GamePhotoPage } from "@/types/game";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BottomNavigation } from "../ui/BottomNavigation";
import { CircleButton } from "../ui/CircleButton";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Markdown } from "../Markdown";
import { Button } from "../ui/button";
import { generatePhoto } from "@/app/actions";
import ShareIcon from "@/assets/icons/share.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import WhatsAppIcon from "@/assets/icons/whatsapp.svg";
import { slugify } from "@/utils/slugify";
import { useParams } from "next/navigation";

export const PhotoPage = ({
  page,
  game,
}: {
  page: GamePhotoPage;
  game: Game;
}) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [teamImageUrl, setTeamImageUrl] = useState<string | null>(
    game.teamImageUrl || null
  );

  const uploadPhoto = async (file: File) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await generatePhoto(page.pageId, file);
      setTeamImageUrl(res.teamImageUrl);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoButton = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        if (file) {
          uploadPhoto(file);
        }
      }
    };
    input.click();
  };

  const title = teamImageUrl ? page.secondTitle : page.firstTitle;
  const textField = teamImageUrl ? page.secondTextField : page.firstTextField;

  const totalPages = game.pages.length || 0;
  const currentPage =
    game.pages.findIndex((p) => p.id === page.pageId) + 1 || 0;
  const isLastPage = currentPage === totalPages;
  const nextPage = isLastPage ? "/game/finish" : `/game/${currentPage + 1}`;
  const previousPage = currentPage > 1 ? `/game/${currentPage - 1}` : null;

  return (
    <div>
      <div className="bg-gray-100 bg-lines-gradient">
        <img src={teamImageUrl ? teamImageUrl : page.overlayImageUrl} />
      </div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Markdown className="mt-4">{textField}</Markdown>
        {teamImageUrl && game.teamName && (
          <SharePhoto teamName={game.teamName} gameId={game.id} />
        )}
      </div>
      <BottomNavigation>
        {previousPage && (
          <CircleButton href={previousPage} className="shrink-0">
            <ArrowLeftIcon className="w-5 fill-current" />
          </CircleButton>
        )}
        {teamImageUrl ? (
          <Button href={nextPage} className="flex-1">
            {t("common.next")}
          </Button>
        ) : (
          <>
            <Button href={nextPage} color="purple">
              {t("common.skip")}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handlePhotoButton}
              className="flex-2"
            >
              {isLoading ? t("common.loading") : t("pages.photo.button")}
            </Button>
          </>
        )}
      </BottomNavigation>
    </div>
  );
};

// [domain]/[locale]/share/[teamname]-[id]

export const SharePhoto = ({
  teamName,
  gameId,
}: {
  teamName: string;
  gameId: number;
}) => {
  const t = useTranslations();
  const [shareSupported, setShareSupported] = useState(true);
  const [link, setLink] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    setLink(
      `${window.location.origin}/${params.locale}/share/${slugify(
        teamName
      )}-${gameId}`
    );
    if (!navigator.share) {
      console.warn("Share API not supported in this browser.");
      setShareSupported(false);
    }
  }, []);

  const handleShare = () => {
    if (navigator.share && link) {
      navigator.share({
        url: link,
      });
    }
  };

  const handleDownload = async () => {
    const a = document.createElement("a");
    a.href = `/api/download/${gameId}`;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const buttonClassName =
    "w-14 h-14 bg-green/10 text-green rounded-full flex items-center justify-center";

  return (
    <div>
      <p className="font-semibold mt-4">{t("pages.photo.share_label")}</p>
      <div className="mt-2 flex gap-3">
        <a
          href={`https://api.whatsapp.com/send?text=${link || ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName}
        >
          <WhatsAppIcon className="fill-current w-6" />
        </a>
        <a
          href={`https://www.facebook.com/sharer.php?u=${link || ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName}
        >
          <FacebookIcon className="fill-current w-6" />
        </a>
        {shareSupported && (
          <button className={buttonClassName} onClick={handleShare}>
            <ShareIcon className="fill-current w-6" />
          </button>
        )}
        <button className={buttonClassName} onClick={handleDownload}>
          <DownloadIcon className="fill-current w-6" />
        </button>
      </div>
    </div>
  );
};

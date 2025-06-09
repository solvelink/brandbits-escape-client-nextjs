import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Header } from "@/components/layout/Header";
import { Markdown } from "@/components/Markdown";
import { CircleButton } from "@/components/ui/CircleButton";
import useGameStore, {
  useGameNavigation,
  useGameProgress,
} from "@/stores/gameStore";
import { GamePhotoPage } from "@/types/game";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { generatePhoto } from "@/api/routes";
import { useEffect, useState } from "react";
import ShareIcon from "@/assets/icons/share.svg?react";

export default function PhotoPage({ page }: { page: GamePhotoPage }) {
  const gameStore = useGameStore();
  const gameProgress = useGameProgress();
  const { previousPage, nextPage } = useGameNavigation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const teamImageUrl = gameStore.game?.teamImageUrl;

  const uploadPhoto = async (file: File) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await generatePhoto(gameStore.gameToken!, page.pageId, file);
      gameStore.setTeamImageUrl(res.data.teamImageUrl);
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

  return (
    <div>
      <Header sticky progress={gameProgress} />
      <div className="bg-gray-100 bg-lines-gradient">
        <img src={teamImageUrl ? teamImageUrl : page.overlayImageUrl} />
      </div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Markdown className="mt-4">{textField}</Markdown>
        {teamImageUrl && <SharePhoto teamImageUrl={teamImageUrl} />}
      </div>
      <BottomNavigation>
        <CircleButton onClick={() => previousPage()} className="shrink-0">
          <ArrowLeftIcon className="w-5 fill-current" />
        </CircleButton>
        {teamImageUrl ? (
          <Button onClick={nextPage} className="flex-1">
            {t("common.next")}
          </Button>
        ) : (
          <>
            <Button onClick={nextPage} color="purple">
              {t("common.skip")}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handlePhotoButton}
              className="flex-2"
            >
              {t("pages.photo.button")}
            </Button>
          </>
        )}
      </BottomNavigation>
    </div>
  );
}

export const SharePhoto = ({ teamImageUrl }: { teamImageUrl: string }) => {
  const { t } = useTranslation();
  const [shareSupported, setShareSupported] = useState(true);

  useEffect(() => {
    if (!navigator.share) {
      console.warn("Share API not supported in this browser.");
      setShareSupported(false);
    }
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: teamImageUrl,
      });
    }
  };

  if (shareSupported) {
    return (
      <div>
        <p className="font-semibold mt-4">{t("pages.photo.share_label")}</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={handleShare}
            className="w-14 h-14 bg-green/10 text-green rounded-full flex items-center justify-center"
          >
            <ShareIcon className="fill-current" />
          </button>
        </div>
      </div>
    );
  }
};

import { Header, HeaderBar } from "@/components/layout/Header";
import MapPinIcon from "@/assets/icons/map-pin.svg?react";
import { Collapsable } from "@/components/Collapsable";
import { Markdown } from "@/components/Markdown";
import { isAppleDevice } from "@/utils/isApple";
import { NavigationPreferenceDialog } from "@/components/game/NavigationPreferenceDialog";
import { useState } from "react";
import { GameDefaultPage } from "@/types/game";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CircleButton } from "@/components/ui/CircleButton";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import useGameStore, {
  useGameNavigation,
  useGameProgress,
} from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { DefaultPageHeader } from "@/components/defaultPage/DefaultPageHeader";
import { OpenQuestion } from "@/components/defaultPage/OpenQuestion";
import { useAnswer } from "@/stores/answerStore";
import { MultipleChoiceQuestion } from "@/components/defaultPage/MultipleChoiceQuestion";

export default function DefaultPage({ page }: { page: GameDefaultPage }) {
  const answerHook = useAnswer();
  const currentPage = useGameStore((state) => state.currentPage);
  const gameProgress = useGameProgress();
  const { t } = useTranslation();
  const [showPreferenceDialog, setShowPreferenceDialog] = useState(false);
  const { previousPage, nextPage } = useGameNavigation();

  const openNavigation = () => {
    if (isAppleDevice()) {
      const preference = localStorage.getItem("escape_navigation_preference");
      if (preference === "apple") {
        window.open(page.appleMapsUrl, "_blank");
      } else if (preference === "google") {
        window.open(page.googleMapsUrl, "_blank");
      } else {
        setShowPreferenceDialog(true);
      }
    } else {
      window.open(page.googleMapsUrl, "_blank");
    }
  };

  const hasNavigation = page.appleMapsUrl && page.googleMapsUrl;

  const handleHints = () => {
    const max = page.hints?.length || 0;
    const newHintCount = Math.min(answerHook.hintCount + 1, max);
    answerHook.setHintCount(newHintCount);
  };

  const hints = page.hints?.slice(0, answerHook.hintCount) || [];
  const maxHintsReached = hints.length >= (page.hints?.length || 0);

  return (
    <div>
      {page.showProgressHeader ? (
        <Header sticky progress={gameProgress} />
      ) : (
        <HeaderBar sticky />
      )}
      <DefaultPageHeader page={page} />
      <div className="px-4 py-6 flex flex-col gap-4 font-light">
        {page.title && <h1 className="text-2xl font-bold">{page.title}</h1>}
        {page.textField1 && <Markdown>{page.textField1}</Markdown>}
        {hasNavigation && (
          <button
            onClick={openNavigation}
            className="flex items-center text-turquoise font-medium underline"
          >
            <MapPinIcon className="fill-current w-4 mr-1" />
            {t("pages.navigation.link")}
          </button>
        )}
        {page.textField2 && <Markdown>{page.textField2}</Markdown>}
        {page.accordionTitle && page.accordionText && (
          <Collapsable title={page.accordionTitle}>
            <Markdown>{page.accordionText}</Markdown>
          </Collapsable>
        )}
        {page.questionType === "open" && (
          <OpenQuestion
            label={page.questionLabel}
            answers={page.openQuestionAnswers}
          />
        )}
        {page.questionType === "multiple_choice" && (
          <MultipleChoiceQuestion
            label={page.questionLabel}
            answers={page.multipleChoiceAnswers}
          />
        )}
        {page.textField3 && <Markdown>{page.textField3}</Markdown>}
        {hints.length > 0 && (
          <div className="flex flex-col gap-2">
            {hints.map((hint, index) => (
              <div className="bg-gray-75 rounded-md p-5" key={hint.id}>
                <h1 className="font-bold">Hint {index + 1}</h1>
                <p>{hint.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {hasNavigation && (
        <NavigationPreferenceDialog
          open={showPreferenceDialog}
          onClose={setShowPreferenceDialog}
          appleUrl={page.appleMapsUrl!}
          googleUrl={page.googleMapsUrl!}
        />
      )}
      <BottomNavigation>
        {currentPage > 1 && (
          <CircleButton onClick={() => previousPage()} className="shrink-0">
            <ArrowLeftIcon className="w-5 fill-current" />
          </CircleButton>
        )}
        {page.hints?.length > 0 && (
          <Button
            className="flex-1"
            onClick={handleHints}
            color="purple"
            disabled={maxHintsReached || answerHook.isCorrect}
          >
            Hint
          </Button>
        )}
        <Button
          onClick={nextPage}
          disabled={page.questionType !== "none" && !answerHook.isCorrect}
          className="flex-2"
        >
          {page.buttonLabel?.trim() ? page.buttonLabel : t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
}

import { Game, GameDefaultPage } from "@/types/game";
import { Header, HeaderBar } from "../ui/Header";
import { getGame } from "@/repository/routes";
import { DefaultPageHeader } from "../defaultPage/DefaultPageHeader";
import { Markdown } from "../Markdown";
import { NavigationLink } from "./NavigationLink";
import { Collapsable } from "../Collapsable";
import { OpenQuestion } from "../defaultPage/OpenQuestion";
import { MultipleChoiceQuestion } from "../defaultPage/MultipleChoiceQuestion";
import { BottomNavigation } from "../ui/BottomNavigation";
import { CircleButton } from "../ui/CircleButton";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";

export const DefaultPage = async ({
  page,
  game,
}: {
  page: GameDefaultPage;
  game: Game;
}) => {
  const t = await getTranslations();

  const totalPages = game.pages.length || 0;
  const currentPage =
    game.pages.findIndex((p) => p.id === page.pageId) + 1 || 0;
  const isLastPage = currentPage === totalPages;
  const nextPage = isLastPage ? "/game/finish" : `/game/${currentPage + 1}`;
  const previousPage = currentPage > 1 ? `/game/${currentPage - 1}` : null;

  return (
    <div>
      <DefaultPageHeader page={page} />
      <div className="px-4 py-6 flex flex-col gap-4 font-light">
        {page.title && <h1 className="text-2xl font-bold">{page.title}</h1>}
        {page.textField1 && <Markdown>{page.textField1}</Markdown>}
        {page.appleMapsUrl && page.googleMapsUrl && (
          <NavigationLink
            appleMapsUrl={page.appleMapsUrl}
            googleMapsUrl={page.googleMapsUrl}
          />
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
      </div>
      <BottomNavigation>
        {previousPage && (
          <CircleButton href={previousPage} className="shrink-0">
            <ArrowLeftIcon className="w-5 fill-current" />
          </CircleButton>
        )}
        {/* {page.hints?.length > 0 && (
          <Button
            className="flex-1"
            onClick={handleHints}
            color="purple"
            disabled={maxHintsReached || answerHook.isCorrect}
          >
            Hint
          </Button>
        )} */}
        <Button href={nextPage} className="flex-2">
          {page.buttonLabel?.trim() ? page.buttonLabel : t("common.next")}
        </Button>
      </BottomNavigation>
    </div>
  );
};

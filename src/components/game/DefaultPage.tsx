import { Game, GameAnswerResponse, GameDefaultPage } from "@/types/game";
import clsx from "clsx";
import { DefaultPageHeader } from "../defaultPage/DefaultPageHeader";
import { Markdown } from "../Markdown";
import { NavigationLink } from "../defaultPage/NavigationLink";
import { Accordion } from "../Accordion";
import { OpenQuestion } from "../defaultPage/OpenQuestion";
import { MultipleChoiceQuestion } from "../defaultPage/MultipleChoiceQuestion";
import { BottomNavigation } from "../ui/BottomNavigation";
import { CircleButton } from "../ui/CircleButton";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { getTranslations } from "next-intl/server";
import { AudioPlayer } from "../defaultPage/AudioPlayer";
import { HintButton } from "../defaultPage/HintButton";
import { HintList } from "../defaultPage/HintList";
import { QuestionType } from "@/types/enum";
import { getPageAnswer } from "@/repository/server";
import { NextButton } from "../defaultPage/NextButton";
import { QuestionStoreProvider } from "@/providers/QuestionStoreProvider";

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

  let answer: GameAnswerResponse | undefined = undefined;
  if (page.questionType !== QuestionType.None) {
    answer = await getPageAnswer(page.pageId);
  }

  return (
    <QuestionStoreProvider>
      <DefaultPageHeader page={page} />
      <div
        className={clsx("px-4 py-6 flex flex-col gap-4 font-light", {
          "text-center": page.isTextCentered,
        })}
      >
        {page.title && <h1 className="text-2xl font-bold">{page.title}</h1>}
        {page.textField1 && <Markdown>{page.textField1}</Markdown>}
        {page.appleMapsUrl && page.googleMapsUrl && (
          <NavigationLink
            appleMapsUrl={page.appleMapsUrl}
            googleMapsUrl={page.googleMapsUrl}
          />
        )}
        {page.textField2 && <Markdown>{page.textField2}</Markdown>}
        {page.audioUrl && (
          <AudioPlayer url={page.audioUrl} label={page.audioLabel!} />
        )}
        {page.accordionTitle && page.accordionText && (
          <Accordion title={page.accordionTitle}>
            <Markdown>{page.accordionText}</Markdown>
          </Accordion>
        )}
        {page.questionType === "open" && (
          <OpenQuestion
            label={page.questionLabel}
            answer={answer}
            answers={page.openQuestionAnswers}
            pageId={page.pageId}
          />
        )}
        {page.questionType === "multiple_choice" && (
          <MultipleChoiceQuestion
            label={page.questionLabel}
            answer={answer}
            answers={page.multipleChoiceAnswers}
            pageId={page.pageId}
          />
        )}
        {page.textField3 && <Markdown>{page.textField3}</Markdown>}
        {page.hints?.length > 0 && <HintList hints={page.hints} />}
      </div>
      <BottomNavigation>
        {previousPage && (
          <CircleButton href={previousPage} className="shrink-0">
            <ArrowLeftIcon className="w-5 fill-current" />
          </CircleButton>
        )}
        {page.hints?.length > 0 && <HintButton hints={page.hints} />}
        <NextButton page={page} nextPage={nextPage} />
      </BottomNavigation>
    </QuestionStoreProvider>
  );
};

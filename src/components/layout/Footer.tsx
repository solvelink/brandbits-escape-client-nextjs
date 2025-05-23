import { Button } from "@/components/ui/button";
import { CircleButton } from "../ui/CircleButton";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import { useNavigate } from "react-router";
import useEscapeStore from "@/stores/escapeStore";

export const Footer = () => {
  const escapeStore = useEscapeStore();
  const navigate = useNavigate();

  const nextPage = () => {
    if (escapeStore.currentPage < escapeStore.pages.length - 1) {
      escapeStore.setCurrentPage(escapeStore.currentPage + 1);
      navigate(`/game/${escapeStore.currentPage + 2}`);
    } else {
      navigate("/game/finish");
    }
  };

  const previousPage = () => {
    if (escapeStore.currentPage > 0) {
      escapeStore.setCurrentPage(escapeStore.currentPage - 1);
      navigate(`/game/${escapeStore.currentPage}`);
    } else {
      navigate("/game/onboarding");
    }
  };

  const hasHints =
    escapeStore.pages[escapeStore.currentPage]?.data[0].hints?.length > 0;

  return (
    <>
      <div className="h-24"></div>
      <div className="h-24 p-4 fixed bottom-0 w-xl max-w-full bg-white border-t border-gray-100 z-10">
        {escapeStore.currentPage === 0 ? (
          <div>
            <Button onClick={nextPage} className="w-full">
              Start de escape
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <CircleButton onClick={previousPage}>
              <ArrowLeftIcon className="w-5 fill-current" />
            </CircleButton>
            <Button disabled={hasHints} className="flex-1" color="purple">
              Hint
            </Button>
            <Button onClick={nextPage} className="flex-2">
              Ga Verder
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

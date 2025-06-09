import { Outlet } from "react-router";
import { LanguageWrapper } from "../LanguageWrapper";

export const DefaultLayout = () => {
  return (
    <LanguageWrapper>
      <div className="max-w-xl mx-auto shadow-md min-h-dvh relative bg-white">
        <Outlet />
      </div>
    </LanguageWrapper>
  );
};

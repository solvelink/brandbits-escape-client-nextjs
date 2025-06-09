import { useNavigate, useParams } from "react-router";
import { Language } from "@/types/enum";

export const useLanguage = () => {
  const params = useParams();
  const langParam = params.lang as Language | undefined;
  const nav = useNavigate();

  const joinPath = (path: string) => {
    return langParam ? `/${langParam}/${path}` : `/${path}`;
  };

  const navigate = (path: string) => {
    return nav(joinPath(path));
  };

  return {
    joinPath,
    navigate,
    language: langParam || Language.NL,
  };
};

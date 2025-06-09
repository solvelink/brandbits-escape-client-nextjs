import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

export const LanguageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const supportedLanguages = ["nl", "de", "en"];
    const currentLang = lang || "nl";

    if (supportedLanguages.includes(currentLang)) {
      i18n.changeLanguage(currentLang);
    } else {
      navigate("/");
    }
  }, []);

  return children;
};

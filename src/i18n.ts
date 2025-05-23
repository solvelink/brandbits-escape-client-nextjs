import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import nlTranslations from "@/assets/translations/nl.json";
import enTranslations from "@/assets/translations/en.json";
import deTranslations from "@/assets/translations/de.json";

i18n.use(initReactI18next).init({
  resources: {
    nl: {
      translation: nlTranslations,
    },
    en: {
      translation: enTranslations,
    },
    de: {
      translation: deTranslations,
    },
  },
  fallbackLng: "nl",
});

export const setLanguage = (lang: "nl" | "en" | "de") => {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
};

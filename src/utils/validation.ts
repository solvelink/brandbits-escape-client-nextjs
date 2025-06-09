import * as yup from "yup";
import { nl, en, de } from "yup-locales";
import i18next from "i18next";

i18next.on("languageChanged", (lng) => {
  switch (lng) {
    case "de":
      yup.setLocale(de);
      break;
    case "en":
      yup.setLocale(en);
      break;
    default:
      yup.setLocale(nl);
  }
});

export { yup };

import * as yup from "yup";
import { nl, en, de } from "yup-locales";
import { useLocale } from "next-intl";

export const useYup = () => {
  const locale = useLocale();
  switch (locale) {
    case "de":
      yup.setLocale(de);
      break;
    case "en":
      yup.setLocale(en);
      break;
    default:
      yup.setLocale(nl);
  }

  return yup;
};

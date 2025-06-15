import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import deepmerge from "deepmerge";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const userMessages = (await import(`../assets/translations/${locale}.json`))
    .default;
  const defaultMessages = (
    await import(`../assets/translations/${routing.defaultLocale}.json`)
  ).default;

  return {
    locale,
    messages: deepmerge(defaultMessages, userMessages),
  };
});

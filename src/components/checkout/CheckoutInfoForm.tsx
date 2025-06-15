"use client";

import {
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { clsx } from "clsx";
import NLIcon from "@/assets/icons/flags/nl.svg";
import ENIcon from "@/assets/icons/flags/en.svg";
import DEIcon from "@/assets/icons/flags/de.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useYup } from "@/utils/validation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCheckoutStore } from "@/providers/checkoutStoreProvider";
// import { createOrder } from "@/api/routes";
// import useCheckoutStore from "@/stores/checkoutStore";

const languages = [
  { label: "Nederlands", value: "nl", icon: NLIcon },
  { label: "English", value: "en", icon: ENIcon },
  { label: "Deutsch", value: "de", icon: DEIcon },
];

export const CheckoutInfoForm = () => {
  const locale = useLocale();
  const yup = useYup();
  const checkoutStore = useCheckoutStore((state) => state);
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const schema = yup
    .object({
      name: yup.string().required().label(t("checkout.form.name")),
      email: yup.string().email().required().label(t("checkout.form.email")),
      address: yup.string().required().label(t("checkout.form.address")),
      zipcode: yup.string().required().label(t("checkout.form.postal_code")),
      city: yup.string().required().label(t("checkout.form.city")),
      language: yup.string().required().label(t("checkout.form.language")),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      language: locale,
    },
  });

  const languageValue = watch("language");
  const selectedLanguage = languages.find(
    (language) => language.value === languageValue
  )!;

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setErrorMessage(null);
      // const res = await createOrder(escape!.id, {
      //   productType: checkoutStore.type,
      //   quantity: checkoutStore.quantity,
      //   contactData: {
      //     name: data.name,
      //     email: data.email,
      //     address: data.address,
      //     zipcode: data.zipcode,
      //     city: data.city,
      //   },
      //   language: data.language,
      //   discountCode: checkoutStore.discountCode,
      // });
      // checkoutStore.clear();
      // if (res.data.status === "redirect") {
      //   window.location.href = res.data.redirectUrl;
      // } else if (res.data.status === "success") {
      //   navigate("success");
      // } else {
      //   throw new Error("unknown response status from server");
      // }
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage(t("checkout.form.error"));
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div>
      <Transition show={!!errorMessage}>
        <p className="text-red text-center py-2 px-4 mb-4 border-2 border-red bg-red/5 rounded-full transition duration-300 ease-in data-closed:opacity-0">
          {errorMessage}
        </p>
      </Transition>
      <form
        id="checkout-form"
        className="flex flex-col gap-3"
        onSubmit={onSubmit}
        autoComplete="on"
      >
        <Field>
          <Label className="sr-only">{t("checkout.form.name")}</Label>
          <Input
            className={clsx("input w-full", { error: errors.name })}
            placeholder={t("checkout.form.name")}
            autoComplete="name"
            {...register("name")}
          />
          <p className="input-error">{errors.name?.message}</p>
        </Field>
        <Field>
          <Label className="sr-only">{t("checkout.form.email")}</Label>
          <Input
            className={clsx("input w-full", { error: errors.email })}
            placeholder={t("checkout.form.email")}
            autoComplete="email"
            type="email"
            {...register("email")}
          />
          <p className="input-error">{errors.email?.message}</p>
        </Field>
        <Field>
          <Label className="sr-only">{t("checkout.form.address")}</Label>
          <Input
            className={clsx("input w-full", { error: errors.address })}
            placeholder={t("checkout.form.address")}
            autoComplete="street-address"
            {...register("address")}
          />
          <p className="input-error">{errors.address?.message}</p>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <Label className="sr-only">{t("checkout.form.postal_code")}</Label>
            <Input
              className={clsx("input w-full", { error: errors.zipcode })}
              placeholder={t("checkout.form.postal_code")}
              autoComplete="postal-code"
              {...register("zipcode")}
            />
            <p className="input-error">{errors.zipcode?.message}</p>
          </Field>
          <Field>
            <Label className="sr-only">{t("checkout.form.city")}</Label>
            <Input
              className={clsx("input w-full", { error: errors.city })}
              placeholder={t("checkout.form.city")}
              autoComplete="address-level2"
              {...register("city")}
            />
            <p className="input-error">{errors.city?.message}</p>
          </Field>
        </div>
        <Field>
          <Label className="font-medium">{t("checkout.form.language")}</Label>
          <Controller
            name="language"
            control={control}
            render={({ field: { onChange } }) => (
              <Listbox value={languageValue} onChange={onChange}>
                <ListboxButton className="flex items-center gap-2 border-2 border-purple py-5 px-7 w-full rounded-full mt-1">
                  <selectedLanguage.icon className="w-6" />
                  {selectedLanguage.label}
                  <ChevronDownIcon className="w-4 fill-current ml-auto" />
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  transition
                  className={clsx(
                    "w-(--button-width) rounded-md border border-gray-100 bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
                    "transition duration-100 ease-in data-leave:data-closed:opacity-0"
                  )}
                >
                  {languages.map((language) => (
                    <ListboxOption
                      key={language.value}
                      value={language.value}
                      className="flex items-center gap-2 p-3 rounded-lg"
                    >
                      <language.icon className="w-6" />
                      {language.label}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            )}
          />
        </Field>
      </form>
    </div>
  );
};

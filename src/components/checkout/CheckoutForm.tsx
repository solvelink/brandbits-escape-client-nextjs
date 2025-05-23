import {
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { clsx } from "clsx";
import NLIcon from "@/assets/icons/flags/nl.svg?react";
import ENIcon from "@/assets/icons/flags/en.svg?react";
import DEIcon from "@/assets/icons/flags/de.svg?react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { nl } from "yup-locales";
yup.setLocale(nl);

const schema = yup
  .object({
    name: yup.string().required().label("Naam"),
    email: yup.string().email().required().label("E-mail"),
    street: yup.string().required().label("Straat en huisnummer"),
    postalCode: yup.string().required().label("Postcode"),
    city: yup.string().required().label("Plaats"),
    language: yup.string().required().label("Taal"),
  })
  .required();

const languages = [
  { label: "Nederlands", value: "nl", icon: NLIcon },
  { label: "English", value: "en", icon: ENIcon },
  { label: "Deutsch", value: "de", icon: DEIcon },
];

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      language: "nl",
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));
  const languageValue = watch("language");
  const selectedLanguage = languages.find(
    (language) => language.value === languageValue
  )!;

  return (
    <div>
      <form
        className="flex flex-col gap-3"
        onSubmit={onSubmit}
        autoComplete="on"
      >
        <Field>
          <Label className="hidden">Naam</Label>
          <Input
            className={clsx("input w-full", { error: errors.name })}
            placeholder="Naam"
            autoComplete="name"
            {...register("name")}
          />
          <p className="input-error">{errors.name?.message}</p>
        </Field>
        <Field>
          <Label className="hidden">E-mail</Label>
          <Input
            className={clsx("input w-full", { error: errors.email })}
            placeholder="E-mail"
            autoComplete="email"
            type="email"
            {...register("email")}
          />
          <p className="input-error">{errors.email?.message}</p>
        </Field>
        <Field>
          <Label className="hidden">Straat en huisnummer</Label>
          <Input
            className={clsx("input w-full", { error: errors.street })}
            placeholder="Straat en huisnummer"
            autoComplete="street-address"
            {...register("street")}
          />
          <p className="input-error">{errors.street?.message}</p>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <Label className="hidden">Postcode</Label>
            <Input
              className={clsx("input w-full", { error: errors.postalCode })}
              placeholder="Postcode"
              autoComplete="postal-code"
              {...register("postalCode")}
            />
            <p className="input-error">{errors.postalCode?.message}</p>
          </Field>
          <Field>
            <Label className="hidden">Plaats</Label>
            <Input
              className={clsx("input w-full", { error: errors.city })}
              placeholder="Plaats"
              autoComplete="address-level2"
              {...register("city")}
            />
            <p className="input-error">{errors.city?.message}</p>
          </Field>
        </div>
        <Field>
          <Label className="font-medium">
            In welke taal wil je de escape spelen?
          </Label>
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
        <button type="submit" className="btn-green">
          Volgende stap
        </button>
      </form>
    </div>
  );
};

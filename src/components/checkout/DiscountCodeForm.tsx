"use client";

import { Field, Input, Label, Transition } from "@headlessui/react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";
import clsx from "clsx";
import { useCheckoutStore } from "@/providers/CheckoutStoreProvider";
import { useTranslations } from "next-intl";
import { validateDiscountCode } from "@/repository/routes";
import { Escape } from "@/types/escapes";

export const DiscountCodeForm = ({ escape }: { escape: Escape }) => {
  const checkoutStore = useCheckoutStore((state) => state);
  const t = useTranslations();

  const hasDiscountCode = !!checkoutStore.discountCode;
  const [showField, setShowField] = useState(hasDiscountCode);
  const [code, setCode] = useState(checkoutStore.discountCode || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidForm = code.trim() !== "" && !isLoading;

  const submitDiscountCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValidForm) return;
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await validateDiscountCode(escape.id, code);
      checkoutStore.setDiscountCode({
        code: data.code,
        amount: Number(data.amount),
      });
    } catch (error) {
      console.error("Error validating discount code:", error);
      setErrorMessage(t("checkout.discount.error"));
      checkoutStore.setDiscountCode();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasDiscountCode) {
      submitDiscountCode();
    }
  }, []);

  const removeDiscountCode = () => {
    setCode("");
    checkoutStore.setDiscountCode();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="mt-6">
      <Transition show={showField}>
        <Field className="transition duration-300 ease-in data-closed:opacity-0">
          <Label className="font-medium">{t("checkout.discount.label")}</Label>
          {hasDiscountCode ? (
            <div className="w-full bg-gray-75 py-5 px-7 rounded-full flex gap-2 items-center justify-between mt-1">
              <div className="flex items-center">
                <CheckmarkIcon className="fill-green w-5 mr-2" />
                <p>{checkoutStore.discountCode}</p>
              </div>
              <button
                className="text-red underline"
                onClick={removeDiscountCode}
              >
                {t("common.remove")}
              </button>
            </div>
          ) : (
            <form
              className="flex items-center gap-2 mt-1"
              onSubmit={submitDiscountCode}
              autoComplete="off"
            >
              <Input
                className={clsx("input w-full", { error: errorMessage })}
                placeholder={t("checkout.discount.placeholder")}
                value={code}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="h-17"
                error={!!errorMessage}
                disabled={!isValidForm}
              >
                {t("common.check")}
              </Button>
            </form>
          )}
          {errorMessage && <p className="input-error">{errorMessage}</p>}
        </Field>
      </Transition>
      {!showField && (
        <button
          className="underline text-green text-center w-full"
          onClick={() => setShowField(true)}
        >
          {t("checkout.discount.button")}
        </button>
      )}
    </div>
  );
};

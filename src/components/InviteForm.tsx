"use client";

import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Escape } from "@/types/escapes";
import { redeemInviteCode } from "@/app/actions";
import { useRouter } from "@/i18n/navigation";

export const InviteForm = ({ escape }: { escape: Escape }) => {
  const t = useTranslations();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isValidForm = useMemo(
    () => /^\d{3} - \d{3}$/.test(code) && !isLoading && escape,
    [code, isLoading, escape]
  );

  const submitInviteCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValidForm) return;
    try {
      setIsLoading(true);
      const numericCode = code.replace(/[^0-9]/g, "");
      await redeemInviteCode(numericCode);
      router.push("/game/1");
    } catch (error) {
      console.error("Error submitting invite code:", error);
      setErrorMessage(t("invite.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 6) value = value.slice(0, 6);
    if (value.length > 3) {
      value = value.slice(0, 3) + " - " + value.slice(3);
    }
    setCode(value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <form className="p-4" onSubmit={submitInviteCode} autoComplete="off">
      <Field>
        <Label>{t("invite.label")}</Label>
        <Input
          value={code}
          onChange={handleInputChange}
          className={clsx("input w-full text-center mt-1", {
            error: errorMessage,
          })}
          placeholder="000 - 000"
          inputMode="numeric"
        />
        {errorMessage && <p className="input-error">{errorMessage}</p>}
      </Field>
      <Button
        className="w-full mt-3"
        error={!!errorMessage}
        disabled={!isValidForm}
        type="submit"
      >
        {isLoading ? t("common.loading") : t("common.continue")}
      </Button>
    </form>
  );
};

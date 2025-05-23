import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { Button } from "@/components/ui/button";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { useState } from "react";

export default function Invite() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 6) value = value.slice(0, 6);
    if (value.length > 3) {
      value = value.slice(0, 3) + " - " + value.slice(3);
    }
    setCode(value);
    setError("");
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!code) {
      setError("Code is verplicht");
      return;
    }
    if (!/^\d{3} - \d{3}$/.test(code)) {
      setError("Ongeldige code");
      return;
    }
    console.log("Code submitted:", code);
  };

  return (
    <div>
      <div>
        <CheckoutHeader title="Uitnodigingscode invoeren" />
        <div className="bg-gray-100 h-64"></div>
        <div className="px-4 py-6 bg-gray-50 text-center">
          <h1 className="font-bold text-2xl">Uitnodigingscode invoeren</h1>
          <p className="rich-text mt-4">
            Voluptate dolor ex tempor eu excepteur aute. Nisi commodo quis irure
            sunt ex veniam Lorem tempor enim. Veniam id eu duis.
          </p>
        </div>
        <form className="p-4" onSubmit={onSubmit} autoComplete="off">
          <Field>
            <Label>Vul de code uit de mail in</Label>
            <Input
              value={code}
              onChange={onCodeChange}
              className={clsx("input w-full text-center mt-1", { error })}
              placeholder="000 - 000"
              inputMode="numeric"
            />
            <p className="input-error">{error}</p>
          </Field>
          <Button className="w-full mt-3" type="submit">
            Doorgaan
          </Button>
        </form>
      </div>
    </div>
  );
}

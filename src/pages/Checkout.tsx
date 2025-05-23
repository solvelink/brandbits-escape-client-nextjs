import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CountField } from "@/components/checkout/CountField";
import { TicketInfoDialog } from "@/components/checkout/TicketInfoDialog";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import CheckmarkIcon from "@/assets/icons/checkmark.svg?react";
import TicketIcon from "@/assets/icons/ticket.svg?react";
import IdealIcon from "@/assets/icons/methods/ideal.svg?react";
import BancontactIcon from "@/assets/icons/methods/bancontact.svg?react";
import VisaIcon from "@/assets/icons/methods/visa.svg?react";
import MastercardIcon from "@/assets/icons/methods/mastercard.svg?react";
import AmexIcon from "@/assets/icons/methods/amex.svg?react";
import ApplePayIcon from "@/assets/icons/methods/apple-pay.svg?react";
import PayPalIcon from "@/assets/icons/methods/paypal.svg?react";
import { useState } from "react";
import { Transition } from "@headlessui/react";

const options = [
  {
    label: "1 ticket kopen",
    value: "1",
  },
  {
    label: "Groep tickets kopen",
    value: "2",
  },
];

const formatPrice = (price: number) => {
  const number = price.toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `€ ${number}`;
};

export const PayMethods = () => {
  return (
    <div className="flex justify-center items-center gap-1 mt-3">
      <IdealIcon />
      <BancontactIcon />
      <VisaIcon />
      <MastercardIcon />
      <AmexIcon />
      <ApplePayIcon />
      <PayPalIcon />
    </div>
  );
};

export const BottomNavigation = ({
  price,
  onClick,
}: {
  price: number;
  onClick?: () => void;
}) => {
  return (
    <div className="p-4 bg-white border-t border-gray-100 fixed bottom-0 w-xl max-w-full">
      <div className="flex items-center pb-4">
        <TicketIcon className="fill-current w-6 mr-2" />
        <span>1x ticket</span>
        <p className="ml-auto">{formatPrice(price)}</p>
      </div>
      <Button className="w-full" onClick={onClick}>
        Doorgaan
      </Button>
      <p className="text-gray-200 text-sm text-center mt-2">Inclusief BTW</p>
    </div>
  );
};

export default function Checkout() {
  const [selected, setSelected] = useState(options[0].value);
  const [count, setCount] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const price = selected === "1" ? 12 : count * 18;

  return (
    <div>
      <div className="pb-40">
        <CheckoutHeader title="Tickets selecteren" />
        <div className="bg-gray-100 h-64"></div>
        <div className="px-4 py-6 bg-gray-50 text-center">
          <h1 className="font-bold text-2xl">Voluptate dolor ex tempor</h1>
          <p className="rich-text mt-4">
            Voluptate dolor ex tempor eu excepteur aute. Nisi commodo quis irure
            sunt ex veniam Lorem tempor.{" "}
            <button
              onClick={() => setIsOpen(true)}
              className="underline text-green"
            >
              Hulp bij het juiste ticket kiezen
            </button>
          </p>
        </div>
        {showForm ? (
          <div className="p-4">
            <CheckoutForm />
          </div>
        ) : (
          <div className="p-4">
            <RadioGroup
              className="flex flex-col gap-3"
              value={selected}
              onChange={setSelected}
            >
              {options.map((option, i) => (
                <Field key={i}>
                  <Radio
                    className="block w-full p-5 border-2 border-purple rounded-full text-center data-checked:border-green data-checked:text-green data-checked:outline-3 data-checked:outline-green/40 relative"
                    value={option.value}
                    as="div"
                  >
                    {({ checked }) => (
                      <>
                        {checked && (
                          <CheckmarkIcon className="w-4 fill-current absolute top-1/2 transform -translate-y-1/2" />
                        )}
                        {option.label}
                      </>
                    )}
                  </Radio>
                </Field>
              ))}
            </RadioGroup>
            <Transition show={selected === "2"}>
              <div className="grid grid-cols-2 items-center gap-4 mt-3 transition duration-300 ease-in data-closed:opacity-0">
                <div>
                  <p className="font-medium">Aantal teams</p>
                  <p className="text-gray-200">{formatPrice(18)}</p>
                </div>
                <CountField value={count} onChange={setCount} min={2} />
              </div>
            </Transition>
            <div className="text-center mt-6">
              <Link to="/invite" className="underline text-green mt">
                Voer een uitnodigingscode in
              </Link>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-200 text-xs">Betaalmethodes:</p>
              <PayMethods />
            </div>
          </div>
        )}
      </div>
      <BottomNavigation price={price} onClick={() => setShowForm(true)} />
      <TicketInfoDialog open={isOpen} onClose={setIsOpen} />
    </div>
  );
}

import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";

export const CheckoutHeader = ({ title }: { title: string }) => {
  return (
    <div className="p-4 bg-purple text-white text-center flex items-center gap-2">
      <a href="/" className="w-10 p-2 block">
        <ArrowLeftIcon className="w-full fill-current" />
      </a>
      <div className="flex-1">{title}</div>
      <div className="w-10"></div>
    </div>
  );
};

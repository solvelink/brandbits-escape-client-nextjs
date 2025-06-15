import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

export const CheckoutHeader = ({
  title,
  showBackButton = true,
}: {
  title: string;
  showBackButton?: boolean;
}) => {
  return (
    <div className="p-4 bg-purple text-white text-center flex items-center gap-2">
      {showBackButton ? (
        <a href="/" className="w-10 h-10 p-2 block">
          <ArrowLeftIcon className="w-full fill-current" />
        </a>
      ) : (
        <div className="w-10 h-10"></div>
      )}
      <div className="flex-1">{title}</div>
      <div className="w-10 h-10"></div>
    </div>
  );
};

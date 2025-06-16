import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Link } from "@/i18n/navigation";

export const CheckoutHeader = ({
  title,
  showBackButton = true,
  backButtonHref = "/",
}: {
  title: string;
  showBackButton?: boolean;
  backButtonHref?: string;
}) => {
  return (
    <div className="p-4 bg-purple text-white text-center flex items-center gap-2">
      {showBackButton ? (
        <Link href={backButtonHref} className="w-10 h-10 p-2 block">
          <ArrowLeftIcon className="w-full fill-current" />
        </Link>
      ) : (
        <div className="w-10 h-10"></div>
      )}
      <div className="flex-1">{title}</div>
      <div className="w-10 h-10"></div>
    </div>
  );
};

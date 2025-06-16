import { clsx } from "clsx";
import RankGoldIcon from "@/assets/icons/rank-gold.svg";
import RankSilverIcon from "@/assets/icons/rank-silver.svg";
import RankBronzeIcon from "@/assets/icons/rank-bronze.svg";

const RankIcon = ({
  number,
  className,
}: {
  number: number;
  className?: string;
}) => {
  if (number === 1) {
    return <RankGoldIcon className={className} />;
  }
  if (number === 2) {
    return <RankSilverIcon className={className} />;
  }
  if (number === 3) {
    return <RankBronzeIcon className={className} />;
  }
  return null;
};

export const RankingItem = ({
  number,
  name,
  time,
  points,
  active,
}: {
  number: number;
  name: string;
  time: string;
  points: number;
  active?: boolean;
}) => {
  return (
    <li
      className={clsx(
        "border rounded-md flex items-center p-2.5 gap-2 justify-between",
        active ? "bg-green/10 border-green/20" : "bg-gray-50 border-gray-100"
      )}
    >
      <div className="flex items-center">
        <div
          className={clsx(
            "w-14 h-14 rounded-full flex justify-center items-center text-xl font-bold text-center shrink-0",
            active ? "bg-green text-white" : "bg-white"
          )}
        >
          {number}
        </div>
        <div className="ml-3">
          <div className="flex items-center">
            <p>{name}</p>
            <RankIcon number={number} className="ml-1" />
          </div>
          <p
            className={clsx("text-sm", active ? "text-green" : "text-gray-200")}
          >
            Tijd: {time}
          </p>
        </div>
      </div>
      <p
        className={clsx(
          "p-2 text-lg font-medium",
          active ? "text-green" : null
        )}
      >
        {points}
      </p>
    </li>
  );
};

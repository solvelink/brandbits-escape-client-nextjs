import clsx from "clsx";

export const StatsItem = ({
  name,
  value,
  active,
}: {
  name: string;
  value: string;
  active?: boolean;
}) => {
  return (
    <div
      className={clsx(
        " border rounded-md p-5",
        active
          ? "bg-green/10 border-green/20 text-green"
          : "bg-gray-50 border-gray-100"
      )}
    >
      <span className="opacity-80">{name}</span>
      <p className="text-2xl font-medium">{value}</p>
    </div>
  );
};

export const Stats = ({
  points,
  time,
  quickest,
  distance,
  active,
}: {
  points: number;
  time: string;
  quickest: string;
  distance: string;
  active?: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatsItem name="Punten" value={points.toString()} active={active} />
      <StatsItem name="Tijd" value={time} active={active} />
      <StatsItem name="Snelst" value={quickest} active={active} />
      <StatsItem name="Afstand" value={distance} active={active} />
    </div>
  );
};

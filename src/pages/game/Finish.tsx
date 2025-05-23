import { HeaderBar } from "@/components/layout/Header";
import { RankingItem } from "@/components/RankingItem";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";

const Stats = ({
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
  const StatsItem = ({ name, value }: { name: string; value: string }) => {
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

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatsItem name="Punten" value={points.toString()} />
      <StatsItem name="Tijd" value={time} />
      <StatsItem name="Snelst" value={quickest} />
      <StatsItem name="Afstand" value={distance} />
    </div>
  );
};

export default function Finish() {
  return (
    <div className="pt-4">
      <HeaderBar />
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">Gefeliciteerd!</h1>
        <p className="rich-text mt-4">
          Voluptate dolor ex tempor eu excepteur aute. Nisi commodo quis irure
          sunt ex veniam Lorem tempor enim. Veniam id eu duis. Sit ex ea
          incididunt velit
        </p>
      </div>
      <div className="px-4 py-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">En de winnaar is:</h3>
          <p className="font-light text-gray-200">Punten</p>
        </div>
        <ul className="flex flex-col gap-2">
          <RankingItem number={1} name="Tom" time="02:53:15" points={200} />
          <RankingItem number={2} name="Teun" time="02:53:15" points={200} />
        </ul>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Resultaten team Tom:</h3>
          <Stats
            points={200}
            time="02:53:15"
            quickest="Vraag 1"
            distance="2,5 km"
            active
          />
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Resultaten team BRANDBITS:</h3>
          <Stats
            points={200}
            time="02:53:15"
            quickest="Vraag 1"
            distance="2,5 km"
          />
        </div>
        <Button className="wp-full mt-4" to="/game/ranking">
          Ranking
        </Button>
      </div>
    </div>
  );
}

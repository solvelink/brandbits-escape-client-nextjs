import { GameHeader } from "@/components/game/GameHeader";
import { getGame } from "@/repository/routes";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#34a6a2",
};

export default async function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const game = await getGame();

  return (
    <div>
      <GameHeader game={game} />
      {children}
    </div>
  );
}

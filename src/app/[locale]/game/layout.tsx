import { GameHeader } from "@/components/game/GameHeader";
import GameStoreProvider from "@/providers/GameStoreProvider";
import { getGame } from "@/repository/server";
import type { Viewport } from "next";
import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#34a6a2",
};

export default async function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken");
  if (!gameToken) {
    return unauthorized();
  }

  const game = await getGame();

  return (
    <GameStoreProvider game={game}>
      <GameHeader game={game} />
      {children}
    </GameStoreProvider>
  );
}

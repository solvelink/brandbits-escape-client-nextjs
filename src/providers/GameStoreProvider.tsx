"use client";

import { useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Game } from "@/types/game";

export default function GameStoreProvider({
  game,
  children,
}: {
  game: Game;
  children: React.ReactNode;
}) {
  const setGame = useGameStore((s) => s.setGame);

  useEffect(() => {
    setGame(game);
  }, [game, setGame]);

  return <>{children}</>;
}

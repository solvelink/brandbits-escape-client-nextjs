import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { getHostname } from "./helpers";
import { Escape } from "@/types/escapes";
import {
  Game,
  GameAnswerResponse,
  GameProgress,
  GameStats,
} from "@/types/game";
import { Ranking } from "@/types/rankings";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export const getEscape = async () => {
  const locale = await getLocale();
  const hostname = await getHostname();
  const data = await fetch(`${baseUrl}/v1/escapes/domain/${hostname}`, {
    headers: {
      "Accept-Language": locale,
    },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch escape data");
  }
  return data.json() as Promise<Escape>;
};

export const getGame = async () => {
  const locale = await getLocale();
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken");
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const data = await fetch(`${baseUrl}/v1/game`, {
    headers: {
      Authorization: `Bearer ${gameToken.value}`,
      "Accept-Language": locale,
    },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch game data");
  }
  return data.json() as Promise<Game>;
};

export const getPageAnswer = async (pageId: number) => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken");
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const data = await fetch(`${baseUrl}/v1/game/answer/${pageId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${gameToken.value}`,
    },
  });

  if (data.status === 404) {
    return undefined;
  }

  if (!data.ok) {
    throw new Error("Failed to fetch page answer");
  }
  return (await data.json()) as GameAnswerResponse;
};

export const getRankings = async () => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken");
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const data = await fetch(`${baseUrl}/v1/game/rankings`, {
    headers: {
      Authorization: `Bearer ${gameToken.value}`,
    },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch ranking data");
  }

  return data.json() as Promise<Ranking[]>;
};

export const getGameProgress = async () => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken");
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const data = await fetch(`${baseUrl}/v1/game/progress`, {
    headers: {
      Authorization: `Bearer ${gameToken.value}`,
    },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch game progress");
  }

  return data.json() as Promise<GameProgress>;
};

export const getShareData = async (id: number) => {
  const data = await fetch(`${baseUrl}/v1/game/${id}/share`);
  if (!data.ok) {
    throw new Error("Failed to fetch share data");
  }
  return data.json() as Promise<{
    escapeName: string;
    teamName: string;
    teamImageUrl: string;
  }>;
};

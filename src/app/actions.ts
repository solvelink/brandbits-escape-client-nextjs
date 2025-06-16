"use server";

import { cookies } from "next/headers";
import { getHostname } from "@/repository/helpers";
import { GameAnswer, GameStats, SetGameAnswerResponse } from "@/types/game";
import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export const redeemInviteCode = async (code: string) => {
  const hostname = await getHostname();
  const cookieStore = await cookies();

  const data = await fetch(`${baseUrl}/v1/game/${hostname}/redeem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  if (!data.ok) {
    throw new Error("Failed to redeem invite code");
  }
  const jsonData = (await data.json()) as { gameToken: string };
  cookieStore.set("gameToken", jsonData.gameToken);
};

export const startGame = async (teamName: string) => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken")?.value;
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const data = await fetch(`${baseUrl}/v1/game/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${gameToken}`,
    },
    body: JSON.stringify({ teamName }),
  });
  if (!data.ok) {
    throw new Error("Failed to start game");
  }

  return data.json() as Promise<{ message: string }>;
};

export const setPageAnswer = async (pageId: number, body: GameAnswer) => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken")?.value;
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const data = await fetch(`${baseUrl}/v1/game/answer/${pageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${gameToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!data.ok) {
    console.log("Error response:", data);
    throw new Error("Failed to submit answer");
  }
  return data.json() as Promise<SetGameAnswerResponse>;
};

export const generatePhoto = async (pageId: number, file: File) => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken")?.value;
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  const formData = new FormData();
  formData.append("file", file);

  const data = await fetch(`${baseUrl}/v1/game/photo/${pageId}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
  if (!data.ok) {
    const errorBody = await data.text();
    console.log("Photo upload error body:", errorBody);
    throw new Error("Failed to upload photo");
  }
  revalidatePath(`[locale]/game/[step]`);

  return data.json() as Promise<{
    teamImageUrl: string;
  }>;
};

export const getGameStats = async () => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken");
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }
  const data = await fetch(`${baseUrl}/v1/game/stats`, {
    headers: {
      Authorization: `Bearer ${gameToken.value}`,
    },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch game stats");
  }

  return data.json() as Promise<GameStats[]>;
};

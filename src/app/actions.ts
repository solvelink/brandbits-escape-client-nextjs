"use server";

import { cookies } from "next/headers";
import { getHostname } from "@/repository/helpers";
import { GameAnswer, SetGameAnswerResponse } from "@/types/game";

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

export const setPageAnswer = async (pageId: number, data: GameAnswer) => {
  const cookieStore = await cookies();
  const gameToken = cookieStore.get("gameToken")?.value;
  if (!gameToken) {
    throw new Error("Game token not found in cookies");
  }

  return fetch(`${baseUrl}/v1/game/answer/${pageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${gameToken}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to submit answer");
    }
    return response.json() as Promise<SetGameAnswerResponse>;
  });
};

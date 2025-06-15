import { Escape } from "@/types/escapes";
import { getLocale } from "next-intl/server";
import { getHostname } from "./helpers";
import { cookies } from "next/headers";
// import { client } from "./client";
// import { CreateOrderData, CreateOrderResponse } from "@/types/orders";
import {
  Game,
  //   GameAnswer,
  //   GameAnswerData,
  //   GameAnswerResponse,
  //   SetGameAnswerResponse,
} from "@/types/game";

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

// export const validateDiscountCode = (id: string | number, code: string) => {
//   return client.post<{ valid: boolean; amount: string; code: string }>(
//     `/v1/escapes/${id}/discount-codes/validate`,
//     { code }
//   );
// };

// export const createOrder = (id: string | number, data: CreateOrderData) => {
//   return client.post<CreateOrderResponse>(`/v1/orders/${id}/checkout`, data);
// };

export const redeemInviteCode = async (code: string) => {
  const hostname = await getHostname();
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
  return data.json() as Promise<{ gameToken: string }>;
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

// export const startGame = (gameToken: string, teamName: string) => {
//   return client.post<{ message: string }>(
//     "/v1/game/start",
//     {
//       teamName,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${gameToken}`,
//       },
//     }
//   );
// };

// export const setPageAnswer = (
//   gameToken: string,
//   pageId: number,
//   data: GameAnswer
// ) => {
//   return client.post<SetGameAnswerResponse>(`/v1/game/answer/${pageId}`, data, {
//     headers: {
//       Authorization: `Bearer ${gameToken}`,
//     },
//   });
// };

// export const getPageAnswer = (gameToken: string, pageId: number) => {
//   return client.get<GameAnswerResponse>(`/v1/game/answer/${pageId}`, {
//     headers: {
//       Authorization: `Bearer ${gameToken}`,
//     },
//   });
// };

// export const generatePhoto = (
//   gameToken: string,
//   pageId: number,
//   file: File
// ) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return client.post<{
//     teamImageUrl: string;
//   }>(`/v1/game/photo/${pageId}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${gameToken}`,
//     },
//   });
// };

// export const getGeneratedPhoto = (gameToken: string, pageId: number) => {
//   return client.get<{
//     teamImageUrl: string;
//   }>(`/v1/game/photo/${pageId}`, {
//     headers: {
//       Authorization: `Bearer ${gameToken}`,
//     },
//   });
// };

// export const getGameProgress = (gameToken: string) => {
//   return client.get<
//     { id: number; teamName: string; points: number; lastAnswer: GameAnswer }[]
//   >("/v1/game/progress", {
//     headers: {
//       Authorization: `Bearer ${gameToken}`,
//     },
//   });
// };

// export const getGameStats = (gameToken: string) => {
//   return client.get<
//     { id: number; teamName: string; points: number; totalTime: string }[]
//   >("/v1/game/stats", {
//     headers: {
//       Authorization: `Bearer ${gameToken}`,
//     },
//   });
// };

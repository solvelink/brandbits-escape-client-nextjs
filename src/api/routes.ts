import { Escape } from "@/types/escapes";
import { client } from "./client";
import { CreateOrderData, CreateOrderResponse } from "@/types/orders";
import {
  Game,
  GameAnswer,
  GameAnswerData,
  GameAnswerResponse,
  SetGameAnswerResponse,
} from "@/types/game";

export const getEscape = (domain: string) => {
  return client.get<Escape>(`/v1/escapes/domain/${domain}`, {
    headers: {
      "Accept-Language": "*",
    },
  });
};

export const validateDiscountCode = (id: string | number, code: string) => {
  return client.post<{ valid: boolean; amount: string; code: string }>(
    `/v1/escapes/${id}/discount-codes/validate`,
    { code }
  );
};

export const createOrder = (id: string | number, data: CreateOrderData) => {
  return client.post<CreateOrderResponse>(`/v1/orders/${id}/checkout`, data);
};

export const redeemInviteCode = (domain: string, code: string) => {
  return client.post<{ gameToken: string }>(`/v1/game/${domain}/redeem`, {
    code,
  });
};

export const getGame = (gameToken: string) => {
  return client.get<Game>("/v1/game", {
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

export const startGame = (gameToken: string, teamName: string) => {
  return client.post<{ message: string }>(
    "/v1/game/start",
    {
      teamName,
    },
    {
      headers: {
        Authorization: `Bearer ${gameToken}`,
      },
    }
  );
};

export const setPageAnswer = (
  gameToken: string,
  pageId: number,
  data: GameAnswer
) => {
  return client.post<SetGameAnswerResponse>(`/v1/game/answer/${pageId}`, data, {
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

export const getPageAnswer = (gameToken: string, pageId: number) => {
  return client.get<GameAnswerResponse>(`/v1/game/answer/${pageId}`, {
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

export const generatePhoto = (
  gameToken: string,
  pageId: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  return client.post<{
    teamImageUrl: string;
  }>(`/v1/game/photo/${pageId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

export const getGeneratedPhoto = (gameToken: string, pageId: number) => {
  return client.get<{
    teamImageUrl: string;
  }>(`/v1/game/photo/${pageId}`, {
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

export const getGameProgress = (gameToken: string) => {
  return client.get<
    { id: number; teamName: string; points: number; lastAnswer: GameAnswer }[]
  >("/v1/game/progress", {
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

export const getGameStats = (gameToken: string) => {
  return client.get<
    { id: number; teamName: string; points: number; totalTime: string }[]
  >("/v1/game/stats", {
    headers: {
      Authorization: `Bearer ${gameToken}`,
    },
  });
};

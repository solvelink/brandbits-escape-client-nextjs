import { CreateOrderData, CreateOrderResponse } from "@/types/orders";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export const validateDiscountCode = async (
  id: string | number,
  code: string
) => {
  const data = await fetch(
    `${baseUrl}/v1/escapes/${id}/discount-codes/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );
  if (!data.ok) {
    throw new Error("Failed to validate discount code");
  }
  return data.json() as Promise<{
    valid: boolean;
    amount: string;
    code: string;
  }>;
};

export const createOrder = async (
  id: string | number,
  body: CreateOrderData
) => {
  const data = await fetch(`${baseUrl}/v1/orders/${id}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!data.ok) {
    throw new Error("Failed to create order");
  }
  return data.json() as Promise<CreateOrderResponse>;
};

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

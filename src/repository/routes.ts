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

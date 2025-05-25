import { client } from "./client";

export const getGame = (domain: string) => {
  return client.get(`/v1/game/${domain}`);
};

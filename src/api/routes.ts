import { client } from "./client";

export const getEscape = (id: number) => {
  return client.get(`/v1/escapes/${id}`);
};

export const getPages = (id: number) => {
  return client.get(`/v1/escapes/${id}/pages`);
};

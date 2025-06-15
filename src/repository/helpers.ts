import { headers } from "next/headers";

export const getHostname = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) {
    throw new Error("Host header not found");
  }
  const hostname = host.split(":")[0];
  return hostname;
};

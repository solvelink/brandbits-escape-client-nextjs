import config from "../config.json";

type Config = {
  name: string;
};

type ConfigMap = {
  [key: string]: Config;
};

const typedConfig = config as ConfigMap;

export const useConfig = () => {
  const host = window.location.hostname;
  return typedConfig[host];
};

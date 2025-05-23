import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.brandbits-escape.solve.link/",
  headers: {
    "Accept-Language": "nl",
  },
});

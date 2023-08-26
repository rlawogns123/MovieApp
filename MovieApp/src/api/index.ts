import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "f875e5e5c00e2deee78451d7c184be11";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: { api_key: API_KEY, language: "ko-KR", region: "KR" },
});

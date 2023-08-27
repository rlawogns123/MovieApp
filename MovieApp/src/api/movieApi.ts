import { instance } from "./index";

export const getPopularMovie = async (page: string) => {
  const response = await instance.get("/popular", { params: { page } });
  return response.data;
};

export const getTopRatedMovie = async (page: string) => {
  const response = await instance.get("/top_rated", { params: { page } });
  return response.data;
};

export const getUpcomingMovie = async (page: string) => {
  const response = await instance.get("/upcoming", { params: { page } });
  return response.data;
};

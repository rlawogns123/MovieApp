import { instance } from "./index";

export const getPopularMovie = async (page: string) => {
  const response = await instance.get("movie/popular", { params: { page } });
  return response.data;
};

export const getTopRatedMovie = async (page: string) => {
  const response = await instance.get("movie/top_rated", { params: { page } });
  return response.data;
};

export const getUpcomingMovie = async (page: string) => {
  const response = await instance.get("movie/upcoming", { params: { page } });
  return response.data;
};

export const getSearchMovie = async (query: string, page: string) => {
  const response = await instance.get("search/movie", {
    params: { query, page },
  });
  return response.data;
};

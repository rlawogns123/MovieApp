import { instance } from "./index";

export const getMovieDetail = async (id: string) => {
  const response = await instance.get(`movie/${id}`);
  return response.data;
};

export const getMovieTrailer = async (id: string) => {
  const response = await instance.get(`movie/${id}/videos`);
  return response.data;
};

export const getMovieCredits = async (id: string) => {
  const response = await instance.get(`movie/${id}/credits`);
  return response.data;
};

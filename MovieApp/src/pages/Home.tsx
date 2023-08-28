import React from "react";
import { useQuery } from "react-query";
import {
  getPopularMovie,
  getTopRatedMovie,
  getUpcomingMovie,
} from "@/api/movieApi";

import PopularMovie from "@/components/home/PopularMovie";
import TopRatedMovie from "@/components/home/TopRatedMovie";
import UpcomingMovie from "@/components/home/UpcomingMovie";

import styled from "styled-components";

type Props = {};

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_count: number;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
}

const Home = (props: Props) => {
  return (
    <MovieList>
      <PopularMovie />
      <TopRatedMovie />
      <UpcomingMovie />
    </MovieList>
  );
};

export default Home;

const MovieList = styled.div`
  // display: flex;
`;

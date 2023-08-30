import React from "react";
import { useQuery } from "react-query";
import {
  getPopularMovie,
  getTopRatedMovie,
  getUpcomingMovie,
} from "@/api/movieApi";

import PopularMovie from "@/pages/Home/components/PopularMovie";
import TopRatedMovie from "@/pages/Home/components/TopRatedMovie";
import UpcomingMovie from "@/pages/Home/components/UpcomingMovie";

import styled from "styled-components";

type Props = {};

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
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

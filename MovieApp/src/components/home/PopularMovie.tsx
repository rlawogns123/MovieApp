import React from "react";
import { getPopularMovie } from "@/api/movieApi";
import { useQuery } from "react-query";
import MovieCard from "@/components/MovieCard";

import styled from "styled-components";

type Props = {};

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  release_date: string;
}

const PopularMovie = (props: Props) => {
  const { isLoading, data, isError } = useQuery("popular", () =>
    getPopularMovie("1")
  );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error ㅠㅠ</h1>;

  const top5Movie = data?.results?.slice(0, 5);

  return (
    <MovieList>
      {top5Movie?.map((movie: MovieDetail) => (
        <div key={movie.id}>
          <MovieCard movieData={movie} />
        </div>
      ))}
    </MovieList>
  );
};

export default PopularMovie;

const MovieList = styled.div`
  display: flex;
`;

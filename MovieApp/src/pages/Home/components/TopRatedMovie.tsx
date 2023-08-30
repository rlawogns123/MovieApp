import React from "react";
import { getTopRatedMovie } from "@/api/movieApi";
import { useQuery } from "react-query";
import MovieCard from "@/components/MovieCard";
import { MovieDetail } from "@/pages/Home/Home";

import styled from "styled-components";

type Props = {};

const TopRatedMovie = (props: Props) => {
  const { isLoading, data, isError } = useQuery("top_rated", () =>
    getTopRatedMovie("1")
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

export default TopRatedMovie;

const MovieList = styled.div`
  display: flex;
`;

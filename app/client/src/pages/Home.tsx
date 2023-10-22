import React, { Suspense } from "react";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import MovieCard from "@/components/MovieCard";

import {
  getPopularMovie,
  getTopRatedMovie,
  getUpcomingMovie,
} from "@/api/movieApi";

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
  const [
    { data: popularMovie },
    { data: TopRatedMovie },
    { data: UpcomingMovie },
  ] = useQueries([
    {
      queryKey: ["popular"],
      queryFn: () => getPopularMovie("1"),
    },
    {
      queryKey: ["toprated"],
      queryFn: () => getTopRatedMovie("1"),
    },
    {
      queryKey: ["upcoming"],
      queryFn: () => getUpcomingMovie("1"),
    },
  ]);

  const top5PopularMovie = popularMovie?.results?.slice(0, 5);
  const top5TopRatedMovie = TopRatedMovie?.results?.slice(0, 5);
  const top5UpcomingMovie = UpcomingMovie?.results?.slice(0, 5);

  return (
    <HomeContainer>
      <KategorieWrapper>
        <h3>PopularMovie</h3>
        <NavbarLink to={"/popular"}>더 보기</NavbarLink>
      </KategorieWrapper>
      <MovieList>
        {top5PopularMovie?.map((movie: MovieDetail) => (
          <div key={movie.id}>
            <MovieCard movieData={movie} />
          </div>
        ))}
      </MovieList>
      <KategorieWrapper>
        <h3>Top Rated</h3>
        <NavbarLink to={"/top_rated"}>더 보기</NavbarLink>
      </KategorieWrapper>
      <MovieList>
        {top5TopRatedMovie?.map((movie: MovieDetail) => (
          <div key={movie.id}>
            <MovieCard movieData={movie} />
          </div>
        ))}
      </MovieList>
      <KategorieWrapper>
        <h3>Upcoming</h3>
        <NavbarLink to={"/upcoming"}>더 보기</NavbarLink>
      </KategorieWrapper>
      <MovieList>
        {top5UpcomingMovie?.map((movie: MovieDetail) => (
          <div key={movie.id}>
            <MovieCard movieData={movie} />
          </div>
        ))}
      </MovieList>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  margin-left: 2rem;
  margin-top: 10rem;
`;

const KategorieWrapper = styled.div`
  margin-left: 3rem;
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
`;

const MovieList = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5rem;
  flex-wrap: wrap;
`;

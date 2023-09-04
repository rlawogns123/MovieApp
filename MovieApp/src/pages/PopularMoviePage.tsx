import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getPopularMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/components/MovieCard";
import { MovieDetail } from "./Home/Home";

import styled from "styled-components";

type Props = {};

const PopularMoviePage = (props: Props) => {
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["popular"],
      ({ pageParam = 1 }) => getPopularMovie(pageParam),
      {
        getNextPageParam: (lastPage) => {
          let page = lastPage.page;
          if (lastPage.total_page === page) {
            return false;
          }
          return page + 1;
        },
      }
    );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error</h1>;

  return (
    <Fragment>
      <h2
        style={{
          marginLeft: "25px",
          marginBottom: "50px",
          textAlign: "center",
        }}
      >
        Popular Movie
      </h2>
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        <MovieList>
          {data?.pages?.map((page) => {
            return page?.results.map((movie: MovieDetail) => (
              <Fragment key={movie.id}>
                <MovieCard movieData={movie} />
              </Fragment>
            ));
          })}
        </MovieList>
      </InfiniteScroll>
    </Fragment>
  );
};

export default PopularMoviePage;

const MovieList = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

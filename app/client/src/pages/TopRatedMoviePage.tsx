import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getTopRatedMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/components/page/TopRated/MovieCard";
import { MovieDetail } from "./Home";

import styled from "styled-components";

type Props = {};

const TopRatedMoviePage = (props: Props) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["top_rated"],
    queryFn: ({ pageParam = "1" }) => getTopRatedMovie(pageParam),
    getNextPageParam: (lastPage) => {
      let page = lastPage.page;
      if (lastPage.total_page === page) {
        return false;
      }
      return page + 1;
    },
  });

  return (
    <Fragment>
      <h2
        style={{
          marginLeft: "25px",
          marginBottom: "50px",
          textAlign: "center",
        }}
      >
        Top Rated Movie
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

export default TopRatedMoviePage;

const MovieList = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

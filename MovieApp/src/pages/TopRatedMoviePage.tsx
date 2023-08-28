import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getTopRatedMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/components/MovieCard";
import { MovieDetail } from "./Home";

type Props = {};

const TopRatedMoviePage = (props: Props) => {
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["top_rated"],
      ({ pageParam = 1 }) => getTopRatedMovie(pageParam),
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
    <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
      <Fragment>
        {data?.pages?.map((page) => {
          return page?.results.map((movie: MovieDetail) => (
            <Fragment key={movie.id}>
              <MovieCard movieData={movie} />
            </Fragment>
          ));
        })}
      </Fragment>
    </InfiniteScroll>
  );
};

export default TopRatedMoviePage;

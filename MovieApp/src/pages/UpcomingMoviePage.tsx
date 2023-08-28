import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getUpcomingMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/components/MovieCard";
import { MovieDetail } from "./Home";

type Props = {};

const UpcomingMoviePage = (props: Props) => {
  const isUpcoming: boolean = true;
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["upcoming"],
      ({ pageParam = 1 }) => getUpcomingMovie(pageParam),
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
      <div>
        {data?.pages?.map((page) => {
          return page?.results.map((movie: MovieDetail) => (
            <div key={movie.id}>
              <MovieCard movieData={movie} />
            </div>
          ));
        })}
      </div>
    </InfiniteScroll>
  );
};

export default UpcomingMoviePage;

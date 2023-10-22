import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getUpcomingMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/components/page/Upcoming/MovieCard";
import { MovieDetail } from "./Home";

import styled from "styled-components";

type Props = {};

const UpcomingMoviePage = (props: Props) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["upcoming"],
    queryFn: ({ pageParam = 1 }) => getUpcomingMovie(pageParam),
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
        Upcoming Movie
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

export default UpcomingMoviePage;

const MovieList = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
  margin-top: 10rem;
`;

import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getSearchMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/pages/Search/MovieCard";
import { MovieDetail } from "@/pages/Home/Home";
import { useParams } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const SearchMoviePage = (props: Props) => {
  const { searchWord } = useParams() as { searchWord: string };

  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["search", searchWord],
      ({ pageParam = 1 }) => getSearchMovie(searchWord, pageParam),
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) <h1>Error ㅠㅠ</h1>;

  return (
    <InfiniteScroll loadMore={() => fetchNextPage} hasMore={hasNextPage}>
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
  );
};

export default SearchMoviePage;

const MovieList = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
`;

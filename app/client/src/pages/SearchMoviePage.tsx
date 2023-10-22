import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { getSearchMovie } from "@/api/movieApi";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "@/components/page/Search/MovieCard";
import { MovieDetail } from "@/pages/Home";
import { useParams } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const SearchMoviePage = (props: Props) => {
  const { searchWord } = useParams() as { searchWord: string };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["search", searchWord],
    queryFn: ({ pageParam = 1 }) => getSearchMovie(searchWord, pageParam),
    getNextPageParam: (lastPage) => {
      let page = lastPage.page;
      if (lastPage.total_page === page) {
        return false;
      }
      return page + 1;
    },
  });

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
  margin-top: 10rem;
`;

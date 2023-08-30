import React from "react";
import { getMovieDetail } from "@/api/movieDetail";
import { useQuery } from "react-query";
import { MovieDetail } from "@/pages/Home/Home";
import { useParams } from "react-router";

type Props = {};

const MovieInfo = (props: Props) => {
  const { id } = useParams() as { id: string };

  const { isLoading, data, isError } = useQuery(["detail"], () =>
    getMovieDetail(id)
  );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error ㅠㅠ</h1>;

  return <div>MovieInfo</div>;
};

export default MovieInfo;

import React from "react";
import { getMovieDetail } from "@/api/movieDetail";
import { MovieDetail } from "../Home/Home";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import TrailerButton from "./components/TrailerButton";
import Cast from "./components/Cast";

type Props = {};

const MovieDetailPage = (props: Props) => {
  const { id } = useParams() as { id: string };

  const { isLoading, data, isError } = useQuery(["detail"], () =>
    getMovieDetail(id)
  );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error ㅠㅠ</h1>;

  return (
    <div>
      {data?.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
      ) : (
        <h1>No Image</h1>
      )}
      <TrailerButton />
      <h2>{data?.title}</h2>
      <h3>{data?.original_title}</h3>
      <p>
        {`⭐${data?.vote_average}`} {`🤩${data?.vote_count}`}
      </p>
      <p>
        {data?.genres?.map((item: any) => (
          <span key={item.id}>{item.name} </span>
        ))}
      </p>
      <p>{data?.overview}</p>
      <Cast />
    </div>
  );
};

export default MovieDetailPage;

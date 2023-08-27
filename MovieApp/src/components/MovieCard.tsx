import React from "react";
import { MovieDetail } from "@/components/home/PopularMovie";

type MovieProps = {
  movieData: MovieDetail;
};

const MovieCard = ({ movieData }: MovieProps) => {
  const { id, title, poster_path } = movieData;
  return (
    <div>
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          style={{ width: "50%", height: "50%" }}
        />
      ) : (
        <h1>No Image</h1>
      )}
      {<h4>{title}</h4>}
    </div>
  );
};

export default MovieCard;

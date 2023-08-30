import React from "react";
import { MovieDetail } from "@/pages/Home/Home";
import { Link } from "react-router-dom";

type MovieProps = {
  movieData: MovieDetail;
};

const MovieCard = ({ movieData }: MovieProps) => {
  const { id, title, poster_path, release_date } = movieData;
  return (
    <Link to={`/${id}`}>
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          style={{ width: "50%", height: "50%" }}
        />
      ) : (
        <h1>No Image</h1>
      )}
      {<h4>{title}</h4>}
    </Link>
  );
};

export default MovieCard;

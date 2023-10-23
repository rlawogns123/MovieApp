import React from "react";
import { MovieDetail } from "@/pages/Home";
import { Link } from "react-router-dom";

import styled from "styled-components";

type MovieProps = {
  movieData: MovieDetail;
};

const MovieCard = ({ movieData }: MovieProps) => {
  const { id, title, poster_path } = movieData;
  return (
    <Card>
      <LinkDetail to={`/${id}`}>
        <PosterWrapper>
          {poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
          ) : (
            <h1>No Image</h1>
          )}
        </PosterWrapper>
        {<h4>{title}</h4>}
      </LinkDetail>
    </Card>
  );
};

export default MovieCard;

const Card = styled.div`
  text-align: center;
  &:hover {
    transform: translateY(-5px);
  }
  margin: 0 2rem 5rem 2rem;
  width: 300px;
`;

const PosterWrapper = styled.div`
  img {
    width: 300px;
    height: 400px;
  }
`;

const LinkDetail = styled(Link)`
  color: white;
  text-decoration: none;
`;

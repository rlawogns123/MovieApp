import React from "react";
import { getMovieDetail } from "@/api/movieDetail";
import { MovieDetail } from "../Home/Home";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import TrailerButton from "./components/TrailerButton";
import Cast from "./components/Cast";

import styled from "styled-components";

type Props = {};

const MovieDetailPage = (props: Props) => {
  const { id } = useParams() as { id: string };

  const { isLoading, data, isError } = useQuery(["detail"], () =>
    getMovieDetail(id)
  );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error ㅠㅠ</h1>;

  return (
    <DetailContainer>
      <PosterContainer>
        {data?.poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
        ) : (
          <h1>No Image</h1>
        )}
        <TrailerButton />
      </PosterContainer>
      <InfoContainer>
        <h2>
          {data?.title} ({data?.release_date})
        </h2>
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
      </InfoContainer>
    </DetailContainer>
  );
};

export default MovieDetailPage;

const DetailContainer = styled.div`
  display: flex;
  margin-left: 5rem;
`;

const PosterContainer = styled.div`
  width: 500px;
  margin-right: 5rem;
`;

const InfoContainer = styled.article``;

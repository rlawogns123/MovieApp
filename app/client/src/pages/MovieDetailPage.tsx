import React from "react";
import { getMovieDetail } from "@/api/movieDetail";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import TrailerButton from "@/components/page/Detail/TrailerButton";
import Cast from "../components/page/Detail/Cast";
import Reple from "@/components/reple/Reple";

import styled from "styled-components";

type Props = {};

const MovieDetailPage = (props: Props) => {
  const { id } = useParams() as { id: string };

  const { data } = useQuery({
    queryKey: ["detail"],
    queryFn: () => getMovieDetail(id),
  });

  return (
    <DetailContainer>
      <PosterContainer>
        {data?.poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
        ) : (
          ""
        )}
        <TrailerButton />
      </PosterContainer>
      <InfoContainer>
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
        <hr />
        <Reple movieId={id} />
      </InfoContainer>
    </DetailContainer>
  );
};

export default MovieDetailPage;

const DetailContainer = styled.div`
  display: flex;
  margin-left: 5rem;
  margin-top: 10rem;
`;

const PosterContainer = styled.div`
  width: 500px;
  margin-right: 5rem;
`;

const InfoContainer = styled.article`
  width: 60vw;
`;

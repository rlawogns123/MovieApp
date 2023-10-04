import React from "react";
import { getMovieCredits } from "@/api/movieDetail";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import styled from "styled-components";

type Props = {};

const Cast = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { isLoading, data, isError } = useQuery(["cast"], () =>
    getMovieCredits(id)
  );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error ㅠㅠ</h1>;

  const castInfo = data?.cast.slice(0, 5);

  return (
    <CastList>
      {castInfo?.map((cast: any) => (
        <CastCard key={cast.id}>
          <img src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} />
          <h3>{cast.name}</h3>
          <p>{cast.character} 역</p>
        </CastCard>
      ))}
    </CastList>
  );
};

export default Cast;

const CastList = styled.div`
  display: flex;
`;

const CastCard = styled.div`
  margin-top: 1rem;
  margin-right: 2rem;
  text-align: center;
`;

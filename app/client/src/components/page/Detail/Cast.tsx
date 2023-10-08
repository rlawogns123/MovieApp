import React from "react";
import { getMovieCredits } from "@/api/movieDetail";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import styled from "styled-components";

type Props = {};

const Cast = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { data } = useQuery({
    queryKey: ["cast"],
    queryFn: () => getMovieCredits(id),
  });

  const castInfo = data?.cast.slice(0, 5);

  return (
    <CastList>
      {castInfo?.map((cast: any) => (
        <CastCard key={cast.id}>
          {cast.profile_path ? (
            <img src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} />
          ) : (
            <NoImage>
              <h3>No Image</h3>
            </NoImage>
          )}
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

const NoImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

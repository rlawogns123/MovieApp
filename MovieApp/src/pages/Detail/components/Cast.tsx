import React from "react";
import { getMovieCredits } from "@/api/movieDetail";
import { useQuery } from "react-query";
import { useParams } from "react-router";

type Props = {};

interface CastInfo {
  name: string;
}

const Cast = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { isLoading, data, isError } = useQuery(["cast"], () =>
    getMovieCredits(id)
  );

  const castInfo = data?.cast.slice(0, 5);

  return (
    <div>
      {castInfo?.map((cast: any) => (
        <div key={cast.id}>
          <img src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} />
          <p>{cast.name}</p>
          <p>{cast.character} 역</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;

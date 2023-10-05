import React, { useState, useEffect } from "react";
import { getMovieTrailer } from "@/api/movieDetail";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import TrailerModal from "./TrailerModal";

import styled from "styled-components";

type Props = {};

const TrailerButton = (props: Props) => {
  const { id } = useParams() as { id: string };
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { isLoading, data, isError } = useQuery(["trailer"], () =>
    getMovieTrailer(id)
  );

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Error ㅠㅠ</h1>;

  const trailerKey: string = data?.results[0]?.key;

  return (
    <ButtonWrapper>
      {trailerKey && (
        <button onClick={() => setOpenModal(true)}>트레일러 보기</button>
      )}
      <TrailerModal
        trailerKey={trailerKey}
        open={openModal && trailerKey}
        onClose={() => setOpenModal(false)}
      />
    </ButtonWrapper>
  );
};

export default TrailerButton;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    height: 3rem;
    font-size: 2rem;
    margin-top: 10px;
  }
`;

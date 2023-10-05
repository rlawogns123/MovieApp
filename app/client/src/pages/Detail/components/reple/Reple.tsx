import React, { useState, useEffect } from "react";
import axios from "axios";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";

import styled from "styled-components";

type MovieProps = {
  movieId: string;
};

const Reple = ({ movieId }: MovieProps) => {
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth === true) setFlag(true);
      else setFlag(false);
    });
  }, [flag]);

  return (
    <RepleListContainer>
      <RepleList movieId={movieId} />
      {flag && <RepleUpload movieId={movieId} />}
    </RepleListContainer>
  );
};

export default Reple;

const RepleListContainer = styled.div`
  width: 60vw;
  margin-top: 30px;
`;

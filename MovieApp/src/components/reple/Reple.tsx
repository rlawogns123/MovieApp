import React, { useState, useEffect } from "react";
import axios from "axios";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";

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
    <div>
      <RepleList movieId={movieId} />
      {flag && <RepleUpload movieId={movieId} />}
    </div>
  );
};

export default Reple;

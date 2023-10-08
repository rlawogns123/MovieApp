import React, { useEffect, useState } from "react";
import axios from "axios";
import RepleContent from "./RepleContent";

type movieProps = {
  movieId: string;
};

export interface repleDetail {
  _id: string;
  author: string;
  movieId: string;
  reple: string;
}

const RepleList = ({ movieId }: movieProps) => {
  const [repleList, setRepleList] = useState<any>([]);

  const body = { movieId: movieId };

  useEffect(() => {
    axios
      .post("/api/reple/getreple", body)
      .then((res) => {
        if (res.data.success) {
          setRepleList([...res.data.repleList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {repleList.map((reple: repleDetail) => {
        return <RepleContent reple={reple} />;
      })}
    </div>
  );
};

export default RepleList;

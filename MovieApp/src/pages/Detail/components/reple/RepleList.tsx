import React, { useEffect, useState } from "react";
import axios from "axios";
import RepleContent from "./RepleContent";

type movieProps = {
  movieId: string;
};

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
      {repleList.map((reple: any, idx: any) => {
        return <RepleContent reple={reple} key={idx} />;
      })}
    </div>
  );
};

export default RepleList;

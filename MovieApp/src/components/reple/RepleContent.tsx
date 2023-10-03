import React, { useEffect, useState } from "react";
import axios from "axios";

type RepleProps = {
  reple: any;
  key: any;
};

const RepleContent = ({ reple, key }: RepleProps) => {
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth === true) setFlag(true);
      else setFlag(false);
    });
  }, [flag]);

  const repleDeleteFunc = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const body = {
        repleId: reple._id,
        movieId: reple.movieId,
      };
      axios
        .post("/api/reple/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("댓글이 삭제되었습니다");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("댓글 삭제에 실패하였습니다.");
        });
    }
  };
  return (
    <div>
      {reple.reple}
      {flag && <button onClick={(e) => repleDeleteFunc(e)}>삭제</button>}
    </div>
  );
};

export default RepleContent;

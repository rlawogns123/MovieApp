import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";

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
    <RepleContainer>
      <RepleText>
        <p>{reple.author}</p>
        <h3>{reple.reple}</h3>
      </RepleText>
      <DeleteBtn>
        {flag && <button onClick={(e) => repleDeleteFunc(e)}>삭제</button>}
      </DeleteBtn>
    </RepleContainer>
  );
};

export default RepleContent;

const RepleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RepleText = styled.div`
  h3 {
    display: inline;
  }
  p {
    display: inline;
    margin-right: 30px;
  }
`;
const DeleteBtn = styled.div`
  width: 3rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
`;

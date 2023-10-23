import React, { useEffect, useState } from "react";
import axios from "axios";
import { repleDetail } from "./RepleList";

import styled from "styled-components";

type RepleProps = {
  reple: repleDetail;
};

const RepleContent = ({ reple }: RepleProps) => {
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth !== true) return;

      if (res.data.name === reple.author) return setFlag(true);
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
        <AuthorWrapper>
          <p>{reple.author}</p>
        </AuthorWrapper>
        <RepleWrapper>
          <p>{reple.reple}</p>
        </RepleWrapper>
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
  // width: 70rem;
  width: 60vw;
`;

const RepleText = styled.div`
  display: flex;
`;

const DeleteBtn = styled.div`
  width: 3rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const AuthorWrapper = styled.div`
  margin-right: 30px;
  width: 9.5rem;
`;

const RepleWrapper = styled.div`
  width: 44rem;
`;

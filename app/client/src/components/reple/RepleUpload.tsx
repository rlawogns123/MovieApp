import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";

type MovieProps = {
  movieId: string;
};

const RepleUpload = ({ movieId }: MovieProps) => {
  const [name, setName] = useState<string>("");
  const [reple, setReple] = useState<string>("");

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth === true) setName(res.data.name);
    });
  }, []);

  const repleUploadFunc = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reple) {
      return alert("댓글을 입력해주세요!");
    }

    const body = {
      reple: reple,
      name: name,
      movieId: movieId,
    };

    axios.post("/api/reple/submit", body).then((res) => {
      if (res.data.success) {
        alert("댓글 작성에 성공하였습니다.");
        window.location.reload();
      } else {
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };
  return (
    <div>
      <RepleInputForm onSubmit={repleUploadFunc}>
        <RepleInputArea
          placeholder="댓글 입력"
          value={reple}
          cols={50}
          rows={3}
          onChange={(e) => setReple(e.target.value)}
        />
        <InputBtn>등록</InputBtn>
      </RepleInputForm>
    </div>
  );
};

export default RepleUpload;

const RepleInputForm = styled.form`
  margin-top: 1rem;
`;

const RepleInputArea = styled.textarea`
  width: 50%;
  vertical-align: middle;
`;

const InputBtn = styled.button`
  width: 3rem;
  height: 1.5rem;
  margin-left: 10px;
  vertical-align: top;
`;

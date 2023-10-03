import React, { useEffect, useState } from "react";
import axios from "axios";

type MovieProps = {
  movieId: string;
};

const RepleUpload = ({ movieId }: MovieProps) => {
  const [uid, setUid] = useState<string>("");
  const [reple, setReple] = useState<string>("");

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth === true) setUid(res.data._id);
    });
  });

  const repleUploadFunc = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reple) {
      return alert("댓글을 입력해주세요!");
    }

    const body = {
      reple: reple,
      uid: uid,
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
      <form onSubmit={repleUploadFunc}>
        <input
          type="text"
          value={reple}
          onChange={(e) => setReple(e.target.value)}
        />
        <button>입력</button>
      </form>
    </div>
  );
};

export default RepleUpload;

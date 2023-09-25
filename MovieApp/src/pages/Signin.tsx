import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {};

const Signin = (props: Props) => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const signinFunc = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(id && pwd)) {
      return alert("ID와 비밀번호를 입력해주세요");
    }

    const body = {
      id: id,
      password: pwd,
    };

    axios.post("/api/user/signin", body).then((res) => {
      console.log(res);
      if (res.data === "Success") {
        alert("환영합니다");
        navigate("/");
      } else {
        return alert("아이디 및 비밀번호를 확인해주세요");
      }
    });
  };

  return (
    <form onSubmit={signinFunc}>
      <div>
        ID{" "}
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        비밀번호{" "}
        <input
          type="text"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <button>로그인</button>
    </form>
  );
};

export default Signin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

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
      if (res.data === "Success") {
        alert("환영합니다");
        navigate("/");
      } else {
        return alert("아이디 및 비밀번호를 확인해주세요");
      }
    });
  };

  return (
    <SigninForm>
      <form onSubmit={signinFunc}>
        <div>
          <input
            type="text"
            value={id}
            placeholder={" ID"}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={pwd}
            placeholder={" 비밀번호"}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div>
          <button>로그인</button>
        </div>
        <div>
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
      </form>
    </SigninForm>
  );
};

export default Signin;

const SigninForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

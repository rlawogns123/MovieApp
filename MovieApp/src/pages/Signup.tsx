import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [idCheck, setIdCheck] = useState<boolean>(false);
  const [nameCheck, setNameCheck] = useState<boolean>(false);
  const [pwd, setPwd] = useState<string>("");
  const [pwdConfirm, setPwdConfirm] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);

  const idCheckFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      return alert("ID를 입력해주세요");
    }
    const body = {
      id: id,
    };
    axios.post("/api/user/idcheck", body).then((res) => {
      if (res.data.success) {
        if (res.data.check) {
          setIdCheck(true);
          alert("사용 가능한 ID 입니다.");
        } else {
          alert("사용 불가능한 ID 입니다. (중복)");
        }
      }
    });
  };

  const nameCheckFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      return alert("닉네임을 입력해주세요");
    }
    const body = {
      name: name,
    };

    axios.post("/api/user/namecheck", body).then((res) => {
      if (res.data.success) {
        if (res.data.check) {
          setNameCheck(true);
          alert("사용 가능한 닉네임 입니다.");
        } else {
          alert("사용 불가능한 닉네임입니다. (중복)");
        }
      }
    });
  };

  const signupFunc = async (e: React.MouseEvent<HTMLFormElement>) => {
    setFlag(true);
    e.preventDefault();

    if (!(id && name && pwd && pwdConfirm)) {
      setFlag(false);
      alert("입력 정보를 확인해주세요");
      return;
    }

    if (pwd !== pwdConfirm) {
      setFlag(false);
      alert("비밀번호와 비밀번호 확인 값이 다릅니다.");
      return;
    }

    if (!idCheck || !nameCheck) {
      setFlag(false);
      alert("아이디 또는 닉네임 중복 검사를 해주세요");
      return;
    }

    const body = {
      id: id,
      password: pwd,
      name: name,
    };

    axios.post("/api/user/signup", body).then((res) => {
      setFlag(false);
      if (res.data === "Success") {
        alert("회원가입에 성공하였습니다.");
        navigate("/signin");
      } else {
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

  return (
    <SignupForm>
      <div>
        <form onSubmit={nameCheckFunc}>
          <div>
            <InputWrapper
              type="text"
              value={name}
              placeholder={" 닉네임"}
              onChange={(e) => setName(e.target.value)}
            />
            <CheckBtn>중복 검사</CheckBtn>
          </div>
        </form>
        <form onSubmit={idCheckFunc}>
          <div>
            <InputWrapper
              type="text"
              value={id}
              placeholder={" ID"}
              onChange={(e) => setId(e.target.value)}
            />
            <CheckBtn>중복 검사</CheckBtn>
          </div>
        </form>
        <div>
          <InputWrapper
            type="password"
            placeholder="비밀번호 (6자리 이상)"
            minLength={6}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div>
          <InputWrapper
            type="password"
            placeholder="비밀번호 확인"
            minLength={6}
            onChange={(e) => setPwdConfirm(e.target.value)}
          />
        </div>
        <form onSubmit={signupFunc}>
          <SignupBtn>회원가입</SignupBtn>
        </form>
      </div>
    </SignupForm>
  );
};

export default Signup;

const SignupForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const InputWrapper = styled.input`
  width: 13rem;
  height: 3rem;
  border-radius: 5%;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const SignupBtn = styled.button`
  width: 13.5rem;
  height: 2rem;
`;

const CheckBtn = styled.button`
  width: 5rem;
  height: 3rem;
`;

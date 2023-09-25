import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <>
      <form onSubmit={nameCheckFunc}>
        <div>
          닉네임
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>중복 검사</button>
        </div>
      </form>
      <form onSubmit={idCheckFunc}>
        <div>
          ID
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button>중복 검사</button>
        </div>
      </form>
      <div>
        비밀번호(8자리 이상)
        <input
          type="password"
          placeholder="8자리 이상"
          minLength={6}
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <div>
        비밀번호 확인
        <input
          type="password"
          minLength={6}
          onChange={(e) => setPwdConfirm(e.target.value)}
        />
      </div>
      <form onSubmit={signupFunc}>
        <button>회원가입</button>
      </form>
    </>
  );
};

export default Signup;

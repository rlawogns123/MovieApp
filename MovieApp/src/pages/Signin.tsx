import React from "react";

type Props = {};

const Signin = (props: Props) => {
  return (
    <form>
      <div>
        ID <input type="text" />
      </div>
      <div>
        비밀번호 <input type="text" />
      </div>
      <button>로그인</button>
    </form>
  );
};

export default Signin;

import React from "react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <form>
      <div>
        닉네임 <input type="text" />
      </div>
      <div>
        ID <input type="text" />
      </div>
      <div>
        비밀번호 <input type="text" />
      </div>
      <div>
        비밀번호 확인 <input type="text" />
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default Signup;

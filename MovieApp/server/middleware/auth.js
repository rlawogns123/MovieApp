import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    // token 해독, token을 만들 때 설정한 secret key 값 : jwtSecret
    const decoded = jwt.verify(token, "jwtSecret");
    // req에 해독한 user 정보 생성
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;

import User from "../model/User.js";

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, error: true });
      req.body.token = token;
      req.body.user = user;
      next();
    })
    .catch((err) => {
      throw err;
    });
};

export default auth;

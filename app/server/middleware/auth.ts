import { NextFunction, Request, Response } from "express";
import User from "../model/User";

let auth = (req: Request, res: Response, next: NextFunction) => {
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

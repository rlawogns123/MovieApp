"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("../model/User.js"));
let auth = (req, res, next) => {
    let token = req.cookies.x_auth;
    User_js_1.default.findByToken(token)
        .then((user) => {
        if (!user)
            return res.json({ isAuth: false, error: true });
        req.token = token;
        req.user = user;
        next();
    })
        .catch((err) => {
        throw err;
    });
};
exports.default = auth;

import express from "express";
import mongoose from "mongoose";
import path from "path";
import User from "./server/router/User.js";
import Reple from "./server/router/Reple.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const server = express();
const port = 4001;
dotenv.config({ path: ".env" });
const __dirname = path.resolve();

const MONGOURI = process.env.MONGOURI;

server.use(express.static(path.join(__dirname, "./client/build")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api/user", User);
server.use("/api/reple", Reple);

server.listen(port, () => {
  mongoose
    .connect(MONGOURI)
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.log("Err", err));
});

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

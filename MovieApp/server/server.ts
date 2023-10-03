import express from "express";
import mongoose from "mongoose";
import path from "path";
import User from "./router/User";
import Reple from "./router/Reple";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const server = express();
dotenv.config({ path: "../.env" });

const MONGOURI = process.env.MONGOURI as string;

server.use(express.static(path.join(__dirname, "../dist")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api/user", User);
server.use("/api/reple", Reple);

server.listen(5000, () => {
  mongoose
    .connect(MONGOURI)
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.log("Err", err));
});

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

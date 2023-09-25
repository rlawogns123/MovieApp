const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./router/User");
const cookieParser = require("cookie-parser");

const server = express();

server.use(express.static(path.join(__dirname, "../dist")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api/user", User);

server.listen(4000, () => {
  mongoose
    .connect(
      "mongodb+srv://rlawogns:950326@practice0.npfmpxa.mongodb.net/practice?retryWrites=true&w=majority"
    )
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.log("Err", err));
});

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const User_js_1 = __importDefault(require("./router/User.js"));
const Reple_js_1 = __importDefault(require("./router/Reple.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const url_1 = require("url");
const __dirname = (0, url_1.fileURLToPath)(new URL(".", import.meta.url));
const server = (0, express_1.default)();
server.use(express_1.default.static(path_1.default.join(__dirname, "../dist")));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cookie_parser_1.default)());
server.use("/api/user", User_js_1.default);
server.use("/api/reple", Reple_js_1.default);
server.listen(4000, () => {
    mongoose_1.default
        .connect("mongodb+srv://rlawogns:950326@practice0.npfmpxa.mongodb.net/practice?retryWrites=true&w=majority")
        .then(() => console.log("MongoDB 연결 성공"))
        .catch((err) => console.log("Err", err));
});
server.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../dist/index.html"));
});
server.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../dist/index.html"));
});

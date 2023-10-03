"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_js_1 = __importDefault(require("../model/User.js"));
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
const router = (0, express_1.Router)();
router.post("/idcheck", (req, res) => {
    const { id } = req.body;
    User_js_1.default.findOne({ id })
        .then((doc) => {
        let check = true;
        if (doc) {
            check = false;
        }
        res.status(200).json({ success: true, check });
    })
        .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false });
    });
});
router.post("/namecheck", (req, res) => {
    const { name } = req.body;
    User_js_1.default.findOne({ name })
        .then((doc) => {
        let check = true;
        if (doc) {
            check = false;
        }
        res.status(200).json({ success: true, check });
    })
        .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false });
    });
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password, name } = req.body;
    try {
        const user = new User_js_1.default({
            id,
            password,
            name,
        });
        const salt = yield genSalt(10);
        user.password = yield hash(password, salt);
        yield user.save();
        res.status(200).send("Success");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
router.post("/signin", (req, res) => {
    const { id, password } = req.body;
    User_js_1.default.findOne({ id: id })
        .then((docs) => {
        if (!docs) {
            return res.json({
                loginSuccess: false,
                messsage: "입력하신 ID에 해당하는 유저가 없습니다.",
            });
        }
        docs.comparePassword(password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    messsage: "비밀번호가 틀렸습니다.",
                });
            docs.generateToken((err, user) => {
                if (err)
                    return res.status(400).send(err);
                res.cookie("x_auth", user.token).status(200).send("Success");
            });
        });
    })
        .catch((err) => {
        return res.status(400).send(err);
    });
});
router.get("/auth", auth_js_1.default, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        id: req.user.id,
        name: req.user.name,
    });
});
router.get("/logout", auth_js_1.default, (req, res) => {
    User_js_1.default.findOneAndUpdate({ _id: req.user._id }, { token: "" })
        .then(() => {
        res.clearCookie("x_auth");
        return res.status(200).send({ success: true, logout: "로그아웃 완료" });
    })
        .catch((err) => {
        res.json({ success: false, err });
    });
});
exports.default = router;

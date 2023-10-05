"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Reple_js_1 = __importDefault(require("../model/Reple.js"));
const router = (0, express_1.Router)();
router.post("/submit", (req, res) => {
    const temp = {
        reple: req.body.reple,
        movieId: req.body.movieId,
        // uid: req.body.uid,
    };
    // User.findOne({ uid }).then((userInfo) => {
    //   temp.author = userInfo._id;
    //   const newReple = new Reple(temp);
    //   newReple
    //     .save()
    //     .then(() => {
    //       return res.status(200).json({ success: true });
    //     })
    //     .catch((err) => {
    //       return res.status(400).json({ success: false });
    //     });
    // });
    temp.author = req.body.uid;
    const newReple = new Reple_js_1.default(temp);
    newReple
        .save()
        .then(() => {
        return res.status(200).json({ success: true });
    })
        .catch((err) => {
        return res.status(400).json({ success: false });
    });
});
router.post("/getreple", (req, res) => {
    const { movieId } = req.body;
    Reple_js_1.default.find({ movieId })
        .populate("author")
        .then((repleInfo) => {
        return res.status(200).json({ success: true, repleList: repleInfo });
    })
        .catch((err) => {
        console.log(err);
        return res.status(400).json({ success: false });
    });
});
exports.default = router;

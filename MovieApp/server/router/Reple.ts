import { Router } from "express";

import Reple from "../model/Reple";
import User from "../model/User";

const router = Router();

router.post("/submit", (req, res) => {
  const temp = {
    reple: req.body.reple,
    movieId: req.body.movieId,
    author: req.body.uid,
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
  const newReple = new Reple(temp);

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

  Reple.find({ movieId })
    .populate("author")
    .then((repleInfo) => {
      return res.status(200).json({ success: true, repleList: repleInfo });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  Reple.deleteOne({ _id: req.body.repleId })
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false });
    });
});

export default router;

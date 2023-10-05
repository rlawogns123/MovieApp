import { Router } from "express";
import Reple from "../model/Reple.js";

const router = Router();

router.post("/submit", (req, res) => {
  const temp = {
    reple: req.body.reple,
    movieId: req.body.movieId,
    author: req.body.name,
  };

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
    .then((repleInfo) => {
      return res.status(200).json({ success: true, repleList: repleInfo });
    })
    .catch((err) => {
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

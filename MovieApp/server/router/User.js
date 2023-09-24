import express from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/idcheck", (req, res) => {
  const { id } = req.body;

  User.findOne({ id })
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

  User.findOne({ name })
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

router.post("/signup", async (req, res) => {
  const { id, password, name } = req.body;

  const user = new User({
    id,
    password,
    name,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });

  // const payload = {
  //   user: {
  //     id: user.idm,
  //   },
  // };

  // jwt.sign(payload, "jwtSecret", { expiresIn: "1h" }, (err, token) => {
  //   if (err) {
  //     return res.status(400).json({ success: false });
  //   } else {
  //     return res.send({ token });
  //   }
  // });
});

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default router;

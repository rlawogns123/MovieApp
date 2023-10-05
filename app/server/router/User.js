import { Router } from "express";
import User from "../model/User.js";
import auth from "../middleware/auth.js";
// import { genSalt, hash } from "bcryptjs";
import pkg from "bcryptjs";

const router = Router();
const { genSalt, hash } = pkg;

router.post("/idcheck", (req, res) => {
  const { id } = req.body;

  User.findOne({ userId: id })
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
  const { userId, password, name } = req.body;

  try {
    const user = new User({
      userId,
      password,
      name,
    });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
    res.status(200).send("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/signin", (req, res) => {
  const { userId, password } = req.body;

  User.findOne({ userId })
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
          if (err) return res.status(400).send(err);
          res.cookie("x_auth", user.token).status(200).send("Success");
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.body.user._id,
    isAuth: true,
    id: req.body.user.id,
    name: req.body.user.name,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.body.user._id }, { token: "" })
    .then(() => {
      res.clearCookie("x_auth");
      return res.status(200).send({ success: true, logout: "로그아웃 완료" });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

export default router;

// import { Router } from "express";
// import User from "../model/User";
// import auth from "../middleware/auth";
// import { genSalt, hash } from "bcryptjs";

// const router = Router();

// router.post("/idcheck", (req, res) => {
//   const { id } = req.body;

//   User.findOne({ userId: id })
//     .then((doc) => {
//       let check = true;
//       if (doc) {
//         check = false;
//       }
//       res.status(200).json({ success: true, check });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// router.post("/namecheck", (req, res) => {
//   const { name } = req.body;

//   User.findOne({ name })
//     .then((doc) => {
//       let check = true;
//       if (doc) {
//         check = false;
//       }
//       res.status(200).json({ success: true, check });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// router.post("/signup", async (req, res) => {
//   const { userId, password, name } = req.body;

//   try {
//     const user = new User({
//       userId,
//       password,
//       name,
//     });

//     const salt = await genSalt(10);
//     user.password = await hash(password, salt);

//     await user.save();
//     res.status(200).send("Success");
//   } catch (err: any) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/signin", (req, res) => {
//   const { userId, password } = req.body;

//   User.findOne({ userId })
//     .then((docs) => {
//       if (!docs) {
//         return res.json({
//           loginSuccess: false,
//           messsage: "입력하신 ID에 해당하는 유저가 없습니다.",
//         });
//       }

//       docs.comparePassword(password, (err, isMatch) => {
//         if (!isMatch)
//           return res.json({
//             loginSuccess: false,
//             messsage: "비밀번호가 틀렸습니다.",
//           });

//         docs.generateToken((err, user: any) => {
//           if (err) return res.status(400).send(err);
//           res.cookie("x_auth", user.token).status(200).send("Success");
//         });
//       });
//     })
//     .catch((err) => {
//       return res.status(400).send(err);
//     });
// });

// router.get("/auth", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.body.user._id,
//     isAuth: true,
//     id: req.body.user.id,
//     name: req.body.user.name,
//   });
// });

// router.get("/logout", auth, (req, res) => {
//   User.findOneAndUpdate({ _id: req.body.user._id }, { token: "" })
//     .then(() => {
//       res.clearCookie("x_auth");
//       return res.status(200).send({ success: true, logout: "로그아웃 완료" });
//     })
//     .catch((err) => {
//       res.json({ success: false, err });
//     });
// });

// export default router;

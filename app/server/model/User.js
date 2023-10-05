import mongoose, { Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
});

userSchema.methods.comparePassword = function (pwd, cb) {
  const user = this;

  bcrypt.compare(pwd, user.password, function (err, isMatch) {
    if (err) return cb(err, false);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;

  user
    .save()
    .then(() => {
      cb(null, user);
    })
    .catch((err) => {
      cb(err, null);
    });
};

userSchema.statics.findByToken = function (token) {
  let user = this;

  return jwt.verify(token, "secretToken", (err, decoded) => {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};

const User = mongoose.model("User", userSchema);

export default User;

// import mongoose, { Document, Model } from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// export interface UserInterface {
//   userId: string;
//   password: string;
//   name: string;
//   token: string;
// }

// export interface UserDocuments extends Document, UserInterface {
//   comparePassword: (pwd: string, cb: ComparePasswordCallback) => void;
//   generateToken: (cb: GenerateTokenCallback) => void;
// }

// type ComparePasswordCallback = (err: Error | null, isMatch: boolean) => void;

// type GenerateTokenCallback = (
//   err: Error | null,
//   user: UserInterface | null
// ) => void;

// interface UserModel extends Model<UserInterface, {}, UserDocuments> {
//   findByToken(token: string): Promise<UserInterface>;
// }

// const userSchema = new mongoose.Schema<UserInterface, UserModel, UserDocuments>(
//   {
//     userId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     token: {
//       type: String,
//     },
//   }
// );

// userSchema.methods.comparePassword = function (pwd, cb) {
//   const user = this;

//   bcrypt.compare(pwd, user.password, function (err, isMatch) {
//     if (err) return cb(err, false);
//     cb(null, isMatch);
//   });
// };

// userSchema.methods.generateToken = function (cb) {
//   const user = this;

//   const token = jwt.sign(user._id.toHexString(), "secretToken");
//   user.token = token;

//   user
//     .save()
//     .then(() => {
//       cb(null, user);
//     })
//     .catch((err) => {
//       cb(err, null);
//     });
// };

// userSchema.statics.findByToken = function (token: string) {
//   let user = this;

//   return jwt.verify(token, "secretToken", (err, decoded) => {
//     return user
//       .findOne({ _id: decoded, token: token })
//       .then((user) => user)
//       .catch((err) => err);
//   });
// };

// const User = mongoose.model<UserInterface, UserModel>("User", userSchema);

// export default User;

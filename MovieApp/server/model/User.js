const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
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
    if (err) return cb(err);
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
      res.json({ success: false, err });
    });
};

userSchema.statics.findByToken = function (token) {
  let user = this;

  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

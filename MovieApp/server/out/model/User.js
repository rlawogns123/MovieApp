"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
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
    bcryptjs_1.default.compare(pwd, user.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
userSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jsonwebtoken_1.default.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    user
        .save()
        .then(() => {
        cb(null, user);
    })
        .catch((err) => {
        res.json({ success: false, err });
        // err.json({ success: false, err });
    });
};
userSchema.statics.findByToken = function (token) {
    let user = this;
    return jsonwebtoken_1.default.verify(token, "secretToken", function (err, decoded) {
        return user
            .findOne({ _id: decoded, token: token })
            .then((user) => user)
            .catch((err) => err);
    });
};
const User = mongoose_1.default.model("User", userSchema);
// module.exports = { User };
exports.default = User;

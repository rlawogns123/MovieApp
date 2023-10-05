"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const repleSchema = new mongoose_1.default.Schema({
    reple: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movieId: {
        //   type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
    },
}, { collection: "reples", timestamps: true });
const Reple = mongoose_1.default.model("Reple", repleSchema);
exports.default = Reple;

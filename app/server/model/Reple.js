import mongoose from "mongoose";

const repleSchema = new mongoose.Schema(
  {
    reple: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
  },
  { collection: "reples", timestamps: true }
);

const Reple = mongoose.model("Reple", repleSchema);

export default Reple;

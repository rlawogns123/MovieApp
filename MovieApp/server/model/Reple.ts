import mongoose from "mongoose";

export interface RepleInterface {
  reple: string;
  author: mongoose.Schema.Types.ObjectId;
  movieId: string;
}

const repleSchema = new mongoose.Schema<RepleInterface>(
  {
    reple: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
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

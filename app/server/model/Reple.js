// import mongoose from "mongoose";

// export interface RepleInterface {
//   reple: string;
//   author: string;
//   movieId: string;
// }

// const repleSchema = new mongoose.Schema<RepleInterface>(
//   {
//     reple: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       ref: "User",
//       required: true,
//     },
//     movieId: {
//       type: String,
//       required: true,
//     },
//   },
//   { collection: "reples", timestamps: true }
// );

// const Reple = mongoose.model("Reple", repleSchema);

// export default Reple;

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

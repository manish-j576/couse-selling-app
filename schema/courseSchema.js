import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // model name from Schema.js
      required: true,
    },
    imageURL : { type : String , require : false}
  },
  {
    timestamps: true,
  }
);
export const Course = mongoose.model("Course", CourseSchema);

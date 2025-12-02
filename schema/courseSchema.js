import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // model name from Schema.js
      required: true,
    },
    imageURL : { type : String , require : false}
  },
  {
    timestamps: true,
  }
);
export const CourseModel = mongoose.model("Course", CourseSchema);

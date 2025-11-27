import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courseId: { type: [String], required: false },
  },
  {
    timestamps: true,
  }
);

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    users: { type: [String], required: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
export const Admin = mongoose.model("Admin", AdminSchema);
export const Course = mongoose.model("Course", CourseSchema);

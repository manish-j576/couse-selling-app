
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import {userRouter} from "./routes/user.js"
import { courseRouter } from "./routes/course.js";
import { adminRouter } from "./routes/admin.js";
const app = express();

app.use(express.json());
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
  } catch (e) {
    console.log("connection to database failed inside index.js");
  }
};

startServer();

app.use("/api/user", userRouter);
app.use("api/course",courseRouter);
app.use("/api/admin", adminRouter)

app.listen(3000);

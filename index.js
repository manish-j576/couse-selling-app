
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import {userRouter} from "./routes/user.js"
import { courseRouter } from "./routes/course.js";
import { adminRouter } from "./routes/admin.js";
const app = express();

app.use(express.json());
dotenv.config();




app.use("/api/user", userRouter);
app.use("api/course",courseRouter);
app.use("/api/admin", adminRouter)

async function main(){
  await connectDB()
  app.listen(3000);
  console.log("listening on PORT : 3000")
}

main()
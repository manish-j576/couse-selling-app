console.log("1");
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { connectDB } from "./db.js";
import { User, Admin, Course } from "./Schema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { authMiddleware } from "./middleware.js";

const app = express();

app.use(express.json());
const startServer = async () => {
  try {
    await connectDB();
  } catch (e) {
    console.log("connection to database failed inside index.js");
  }
};

startServer();
//user will signup and create an account in the database
app.post("/api/user/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const response = await User.findOne({ email: email });

    if (response) {
      res.status(400).json({
        message: "User already exist",
      });
    }
    const hashedPassowrd = await bcrypt.hash(password, 10);
    await User.create({
      name: req.body.name,
      username: req.body.username,
      email : req.body.email,
      password: hashedPassowrd,
    });
    res.status(200).json({
      messege: "Data Insertion successfully",
    });
  } catch (e) {
    console.log("Signup end point failed");
  }
});
//user will authenticate and receive token that will get save for client
app.post("/api/user/login", async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const foundUser = await User.findOne({email:email})

        if(!foundUser){
            res.status(400).json({
                message : "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(!isMatch){
             res.status(400).json({
               message: "Incorrect Password",
             });
        }else{
            const token = jwt.sign(
              { email : foundUser.email}, 
              process.env.JWT_SECRET, 
              { expiresIn: "24h" }
            );

            res.status(200).json({
                token : token
            })
        }
    }catch(e){
        console.error("error occured")
    }


});

app.post("/api/user/purchase",authMiddleware , async (req, res) => {
    res.status(200).json({
        message : "response from /purchase endpoint"
    })
});

app.post("/api/user/courses",authMiddleware, (req, res) => {
    res.status(200).json({
        messege : "response from /course endpoint"
    })
});



// admin routes
app.post("/api/admin/signup", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const response = await Admin.findOne({ email: email });

      if (response) {
        res.status(400).json({
          message: "Admin already exist",
        });
      }
      const hashedPassowrd = await bcrypt.hash(password, 10);
      await Admin.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassowrd,
      });
      res.status(200).json({
        messege: "Data Insertion successfully",
      });
    } catch (e) {
      console.log("Signup end point failed");
    }


});
app.post("/api/admin/login", async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const foundAdmin = await Admin.findOne({email:email})

        if(!foundAdmin){
            res.status(400).json({
                message : "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, foundAdmin.password);

        if(!isMatch){
             res.status(400).json({
               message: "Incorrect Password",
             });
        }else{
            const token = jwt.sign(
              { email : foundAdmin.email}, 
              process.env.JWT_SECRET, 
              { expiresIn: "24h" }
            );

            res.status(200).json({
                token : token
            })
        }
    }catch(e){
        console.error("error occured")
    }
});
app.post("/api/admin/createCourse", (req, res) => {});
app.delete("/api/admin/deleteCourse", (req, res) => {});
app.post("/api/admin/addContent", (req, res) => {});

app.listen(3000);

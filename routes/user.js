import { Router } from "express";
import bcrypt from "bcrypt";
import { userAuthMiddleware } from "../middleware/userMiddleware.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../schema/userSchema.js";
import { PurchaseModel } from "../schema/purchaseSchema.js";
import { CourseModel } from "../schema/courseSchema.js";
const userRouter = Router();


//user will signup and create an account in the database
userRouter.post("/signup", async (req, res) => {
  try {
    //TODO is to add zod validation
    
    const {email , password} = req.body;
    const response = await UserModel.findOne({ email: email });

    if (response) {
      res.status(401).json({
        message: "User already exist",
      });
    }
    const hashedPassowrd = await bcrypt.hash(password, 10);
    await UserModel.create({
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
userRouter.post("/login", async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        console.log(email)
        console.log(password)
        const foundUser = await UserModel.findOne({email:email})
        console.log("reached 1")
        console.log(foundUser)
        if(!foundUser){
          res.status(404).json({
            message : "user not found"
          })
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch){
          res.status(401).json({
            message: "Incorrect Password",
          });
        }else{
          const token = jwt.sign(
            { id:foundUser._id}, 
            process.env.JWT_USER_SECRET, 
            { expiresIn: "24h" }
          );
            //TODO try to implement cookie based authentication and session based authnetication


            res.status(200).json({
                token : token
            })
        }
    }catch(e){
        console.error("error occured at login endpoint")
    }
});

// to get the purchased courses
userRouter.get("/courses", userAuthMiddleware,async (req, res) => {
  try{
    const courseIdArr = await PurchaseModel.find({userId : req.userId},"courseId")
    const purchasedCourses = await Promise.all(
          courseIdArr.map(async (e) =>{
            const courseId = e.courseId.toString();
            const courseDetails = await CourseModel.findOne({
              _id : courseId
            })
            return courseDetails;
          }))
     res.status(200).json(purchasedCourses)
  }catch(e){
    res.status(200).json({
      messege: "error response from /purchased endpoint",
    });
  }
  
});

export { userRouter };
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminAuthMiddleware } from "../middleware/adminMiddleware.js";
import { AdminModel } from "../schema/adminSchema.js";
import { CourseModel } from "../schema/courseSchema.js";


const adminRouter = Router();


// admin routes
adminRouter.post("/signup", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const response = await AdminModel.findOne({ email: email });

      if (response) {
        res.status(400).json({
          message: "Admin already exist",
        });
      }
      const hashedPassowrd = await bcrypt.hash(password, 10);
      await AdminModel.create({
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
adminRouter.post("/login", async (req, res) => {
    try{
      const email = req.body.email;
      const password = req.body.password;
      const foundAdmin = await AdminModel.findOne({email:email})
      
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
          { id : foundAdmin._id}, 
          process.env.JWT_ADMIN_SECRET, 
          { expiresIn: "24h" }
        );
        res.status(200).json({
          token : token
        })
      }
      
    }catch(e){
        console.error("error occured again")
    }
});
adminRouter.post("/createCourse", adminAuthMiddleware,async (req, res) => {
    //TODO is to take the image from the user and create a pipeline that will upload the imageURL in here
  const {name , description , price , imageURL , adminId} = req.body

  try{
    await CourseModel.create({
      name,
      description,
      price,
      imageURL,
      adminId
    })

    res.status(200).json({
      message : "Data inserted successfully"
    })
  }catch(e){
    res.status(403).json({
      message : "Error occured while uploading to database"
    })
  }
});


// adminRouter.delete("/deleteCourse", adminAuthMiddleware, async (req, res) => {
//   const courseId = req.body
//   try{
//     await CourseModel.deleteMany({
//       _id : courseId
//     })
//     res.status(200).json({
//       message : "Course Deleted successfully"
//     })

//   }catch(e){
//     res.status(403).json({
//       message : "Error occured while deleting the course"
//     })
//   }
// });
adminRouter.put("/changeCourse",adminAuthMiddleware,async (req,res) => {
    const adminId = req.adminId
    const {name , description , price , imageURL , courseId} = req.body 
    try{
       await CourseModel.updateOne({
        _id : courseId,
        adminId : adminId
      },{
        $set : {
          name : name,
          description : description,
          price : price,
          imageURL : imageURL
        }
      })
      res.status(200).json({
        message: "Course updated successfully",
      });

    }catch(e){
      res.status(403).json({
        message : "Error occured while updating"
      })
    }
})
adminRouter.post("/addContent",adminAuthMiddleware, (req, res) => {

    res.status(200).json({
      messege: "/addContent",
    });
});


export {adminRouter};
import { Router } from "express";
import { PurchaseModel } from "../schema/purchaseSchema.js";
import { userAuthMiddleware } from "../middleware/userMiddleware.js";
import { CourseModel } from "../schema/courseSchema.js";

const courseRouter = Router();
//to purchase a course
courseRouter.post("/purchase" , userAuthMiddleware, async (req, res) => {
  //ideally we should accept the payment and then added the course in the users purchased Courses but for now we will just bypass that
    const{courseId} = req.body
  try{
        const response = await PurchaseModel.create({
            userId : req.userId,
            courseId : courseId
        })
        res.status(200).json({
            message : "Course purchases successfully"
        })
    }catch(e){
        res.status(200).json({
              message : "response from /purchase endpoint"
          })
    }
});
// to get all the coutses that are present 
// 
courseRouter.get("/preview",async (req, res) => {
    try{
        const response = await CourseModel.find({} , "name description price imageURL")
        res.status(200).json({
            message : "Data fetched from course table",
            response : response
        })
    }catch(e){
        res.status(200).json({
            messege : "error occured at preview end point"
        })
    }
});

export {courseRouter};
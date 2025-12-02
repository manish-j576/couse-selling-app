import { Router } from "express";

const courseRouter = Router();
//to purchase a course
courseRouter.post("/purchase" , async (req, res) => {
  //ideally we should accept the payment and then added the course in the users purchased Courses but for now we will just bypass that
    res.status(200).json({
        message : "response from /purchase endpoint"
    })
});
// to get all the coutses that are present 
courseRouter.get("/preview", (req, res) => {
    res.status(200).json({
        messege : "response from /course endpoint"
    })
});

export {courseRouter};
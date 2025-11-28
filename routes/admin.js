import { Router } from "express";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";
import { Admin} from "../Schema.js";
import jwt from "jsonwebtoken";


const adminRouter = Router();


// admin routes
admin.post("/signup", async (req, res) => {
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
admin.post("/login", async (req, res) => {
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
admin.post("/createCourse", authMiddleware, (req, res) => {
    res.status(200).json({
        messege : "/createCourse"
    })
});


admin.delete("/deleteCourse", authMiddleware,(req, res) => {
res.status(200).json({
  messege: "/deleteCourse",
});
});
admin.post("/addContent",authMiddleware, (req, res) => {

    res.status(200).json({
      messege: "/addContent",
    });
});


export {adminRouter};
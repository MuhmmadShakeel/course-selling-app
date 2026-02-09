import User from "../Model/usermodel.js"
import {  hashPassword,comparePassword } from "../Model/usermodel.js"
import * as z from "zod"; 
import jwt from 'jsonwebtoken'
import config from "../config.js";
import Purchase from "../Model/purchasemodel.js";
import { Course } from "../Model/coursemodel.js";
export const signup=async(req,res)=>{
try {
    const {name,fullname,email,password,}=req.body
    const userSchema=z.object({
        name:z.string().min(3,{message:"use your valid name of atleat 3 character"}),
        fullname:z.string().min(3,{message:"use your valid name of atleast 3 charater"}),
        email:z.string(),
        password:z.string().min(8,{message:"password must be atleat 6 digit long"}).max(50)
    })
    const validateData=userSchema.safeParse(req.body)
    if(!validateData.success){
        return res.status(400).json({error:validateData.error.issues.map(err=>err.message)})
    }
    if(!name  || !fullname || !email || !password ){
        return res.status(400).json({message:"all fields require"})
    }
    const hashedPassword=await hashPassword(password)
const existingUser=await User.findOne({email})
if(existingUser){
    return res.status(400).json({message:"This user already exixts"})
}
const user=await User.create({
 name,fullname,email,
 password:hashedPassword
})
res.status(201).json({message:"User Register Successfully",user})
} catch (error) {
   console.log("server error")
}
}


export const Login=async(req,res)=>{
const {email,password}=req.body
if(!email || !password){
    return res.status(401).json({message:"all fields require"})
}
const userexists=await User.findOne({email})
if(!userexists){
    return res.status(404).json({message:"User Not Found"})
}
const comparedpassword= await comparePassword(password,userexists.password)
if(!comparedpassword){
    return await res.status(401).json({message:"password not matched"})
}

const token=jwt.sign({
    id:userexists._id,
},    config.JWT_USER_PASSWORD,
{expiresIn:"3d"}
);
const cookieeOptions={
    expires: new Date(Date.now() + 24*60 * 60 * 7000),
    httpOnly : true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"Strict",
}
res.cookie("jwt",token,cookieeOptions)
    return await res.status(200).json({message:"Login successfully",userexists,token})
}

export const Logout=(req,res)=>{
    try {
        res.clearCookie("jwt");
    res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json({error:"error in logout"})
    }
}

export const PurchaseCourse=async(req,res)=>{
const userId=req.userId;
try {
    const purchased=await Purchase.find({userId})
    if(!purchased){
        return res.status(403).json({message:"courses not available"})
    }
    let purchasedCourseId=[]
   for (let i = 0; i < purchased.length; i++) {
    purchasedCourseId.push(purchased[i].courseId);
}

           const courseData=await Course.find({
            _id:{$in:purchasedCourseId}
        })
    return res.status(200).json({message:"you have purchses these coourses",purchased,courseData})
} catch (error) {
    return res.status(500).json({error:"error to show purchased courses"})
}
}





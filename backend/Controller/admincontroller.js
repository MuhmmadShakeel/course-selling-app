import Admin from "../Model/adminmodel.js";
import {  hashPassword,comparePassword } from "../Model/usermodel.js"
import * as z from "zod"; 
import jwt from 'jsonwebtoken'
import config from "../config.js";

export const adminsignup=async(req,res)=>{
try {
    const {name,fullname,email,password,}=req.body
    const adminSchema=z.object({
        name:z.string().min(3,{message:"use your valid name of atleat 3 character"}),
        fullname:z.string().min(3,{message:"use your valid name of atleast 3 charater"}),
        email:z.string(),
        password:z.string().min(8,{message:"password must be atleat 6 digit long"}).max(50)
    })
    const validateData=adminSchema.safeParse(req.body)
    if(!validateData.success){
        return res.status(400).json({error:validateData.error.issues.map(err=>err.message)})
    }
    if(!name  || !fullname || !email || !password ){
        return res.status(400).json({message:"all fields require"})
    }
    const hashedPassword=await hashPassword(password)
const existingUser=await Admin.findOne({email})
if(existingUser){
    return res.status(400).json({message:"This user already exixts"})
}
const admin=await  Admin.create({
 name,fullname,email,
 password:hashedPassword
})
res.status(201).json({message:"User Register Successfully",admin})
} catch (error) {
   console.log("server error")
}
}

export const adminLogin=async(req,res)=>{
const {email,password}=req.body
if(!email || !password){
    return res.json({message:"all fields require"})
}
const adminexists=await Admin.findOne({email})
if(!adminexists){
    return res.json({message:"User Not Found"})
}
const comparedpassword= await comparePassword(password,adminexists.password)
if(!comparedpassword){
    return await res.status(401).json({message:"password not matched"})
}

const token=jwt.sign({
    id:adminexists._id,
},    config.JWT_ADMIN_PASSWORD,
{expiresIn:"3d"}
);
const cookieeOptions={
    expires: new Date(Date.now() + 24*60 * 60 * 7000),
    httpOnly : true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"Strict",
}
res.cookie("jwt",token,cookieeOptions)
    return await res.status(200).json({message:"Login successfully",adminexists,token})
}

export const adminLogout=(req,res)=>{
    try {
        if(!req.cookies.jwt){
            return res.status(402).json({message:"Login FIrst"})
        }
        res.clearCookie("jwt");
    res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
                console.log(error)

        return res.status(500).json({error:"error in logout"})
    }
}
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})
const Admin=mongoose.model('admin',adminSchema)
export default Admin

export const hashPassword=async(password)=>{
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)
return hashedPassword;
}

export const comparePassword=async(password,hashedPassword)=>{
    const comparedpassword=await bcrypt.compare(password,hashedPassword)
    return comparedpassword;
}
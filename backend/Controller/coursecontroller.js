import { Course } from "../Model/coursemodel.js";
import { v2 as cloudinary } from 'cloudinary';
import Purchase from "../Model/purchasemodel.js";
import fs from 'fs';

export const createCourse = async (req, res) => {
const adminId = req.adminId;
  const { title, description, price } = req.body;
  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    // multer provides single file in req.file when using upload.single('image')
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required. Use 'image' as the form-data key." });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid image format. Only JPG/JPEG and PNG are allowed." });
    }

    // Upload to Cloudinary
    const filePath = req.file.path || `${req.file.destination}/${req.file.filename}`;
    const cloud_response = await cloudinary.uploader.upload(filePath, { folder: 'courses' });

    if (!cloud_response || cloud_response.error) {
      return res.status(500).json({ error: "Image upload to Cloudinary failed" });
    }

    // Remove local temp file (optional cleanup)
    fs.unlink(filePath, (err) => {
      if (err) console.warn('Failed to delete temp file:', err);
    });

    // Save to DB
    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
  createrId: adminId
    };

    const course = await Course.create(courseData);
    return res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateCourse=async(req,res)=>{
  const adminId=req.adminId
  const {courseId} =req.params;
  const {title,description,price,image}=req.body
  try {
    const updatedCourse=await Course.findByIdAndUpdate({_id:courseId,createrId:adminId},{
      title,
      description,
      price,
      image: {
        public_id: image?.public_id,
        url: image?.secure_url,
      }
    })
    if(!updatedCourse){
                return await res.status(404).json({message:"course not found"})
    }
          return await res.status(200).json({message:"course updated successfully",updatedCourse})
  } catch (error) {
    res.status(401).json({message:"error in updating the course"})
    console.log("error in fetching the data")
  }
}

export const deleteCourse=async(req,res)=>{
const adminId = req.adminId;
  const {courseId}=req.params;
  try {
    const deleteCourse=await Course.findByIdAndDelete({_id:courseId,createrId:adminId})
    if(!deleteCourse){
    return res.status(400).json({message:"course not found"})
    }
    return res.status(200).json({message:"course deleted successfully"})
  } catch (error) {
    console.log("server error")
    return res.status(500).json({error:"server error"})
  }
}

export const getCourses=async(req,res)=>{
  try {
    const courses=await Course.find({})
    if(!courses){
      return res.ststus(201).json({message:"no course availabe"})
    }
    return res.status(200).json({courses})
  } catch (error) {
    return res.status(500).json({message:"server error"})
  }
}

export const getcourseDetail=async(req,res)=>{
  const {courseId}=req.params
  try {
      const courseDetail=await Course.findById(courseId)
      if(!courseDetail){
     return res.status(401).json({message:"course details not found"})
      }
      return res.status(200).json({courseDetail})
  } catch (error) {
    return res.status(500).json({error:"server error"})
  }
}

export const buyCourses=async(req,res)=>{
    const {userId}=req;
    const {courseId}=req.params
    try {
      const course=await Course.findById(courseId)
      if(!course){
        return res.status(404).json({error:"course not found"})
      }
      const existingUser=await Purchase.findOne({courseId,userId})
      if(existingUser){
        return res.status(400).json({error:"you have already buy this course"})
      }
      const newPurchase=new Purchase({userId,courseId})
      newPurchase.save()
      return res.status(200).json({message:"Course Purchase Successfully",newPurchase})

    } catch (error) {
      return res.status(400).json({error:"error in course buying"})
    }
}
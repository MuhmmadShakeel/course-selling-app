import express from 'express'
import { createCourse, deleteCourse, getCourses, updateCourse, getcourseDetail, buyCourses } from '../Controller/coursecontroller.js';
import upload from '../Middleware/upload.js';
import { userMiddleware } from '../Middleware/miduser.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
const courseRoute=express.Router();
courseRoute.post("/create-course",upload.single("image"),adminMiddleware, createCourse); // 👈 field name must match frontend
courseRoute.put("/update-course/:courseId",upload.single("image"),adminMiddleware,updateCourse); // 👈 field name must match frontend
courseRoute.delete("/delete-course/:courseId",adminMiddleware,deleteCourse); // 👈 field name must match frontend
courseRoute.get("/courses",getCourses); // 👈 field name must match frontend
courseRoute.get("/:courseId",getcourseDetail); // 👈 field name must match frontend
courseRoute.get("/buy/:courseId",userMiddleware, buyCourses); // 👈 field name must match frontend

export default courseRoute;
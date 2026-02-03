import express from 'express'
import { createCourse } from '../Controller/coursecontroller.js';
import upload from '../Middleware/upload.js';
const courseRoute=express.Router();
courseRoute.post("/create-course",upload.single("image"),createCourse); // 👈 field name must match frontend
export default courseRoute;
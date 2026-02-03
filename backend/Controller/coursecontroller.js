import { Course } from "../Model/coursemodel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const createCourse = async (req, res) => {
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
    };

    const course = await Course.create(courseData);
    return res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
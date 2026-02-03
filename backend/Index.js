import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import courseRoute from './Routes/courserouter.js'
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
const app = express();
app.use(express.json());
// Using multer via route-level middleware; do not use express-fileupload globally

//port 
const PORT = process.env.PORT || 5000;
//database
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/default_db';
try {
   await mongoose.connect(DB_URL);
    console.log("Connected to the database successfully");
} catch (error) {
    console.error("Error connecting to the database:", error);
}

// definig routes
app.use('/api/v1/course',courseRoute)

//cloudinary configuration code
    cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
    });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
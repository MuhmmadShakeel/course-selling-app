import jwt from "jsonwebtoken";
import config from "../config.js";

export const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token,config.JWT_ADMIN_PASSWORD);
    req.adminId = decoded.id;
    next();
  } catch (error) {
        console.log("only admin can create course")
    return res.status(401).json({ message: error.message });
  }
};

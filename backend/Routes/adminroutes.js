import express from 'express'
import { adminLogin, adminLogout, adminsignup } from '../Controller/admincontroller.js';
const adminRoute=express.Router();
adminRoute.post('//adminsignup',adminsignup);
adminRoute.post('/adminlogin',adminLogin);
adminRoute.get('/adminlogout',adminLogout)
export default adminRoute;

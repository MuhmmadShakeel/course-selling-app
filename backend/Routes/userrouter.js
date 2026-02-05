import express from 'express'
import { signup , Login, Logout, PurchaseCourse} from '../Controller/usercontroller.js';
import { userMiddleware } from '../Middleware/miduser.js';
const userRoute=express.Router();
userRoute.post('/signup',signup);
userRoute.post('/login',Login);
userRoute.get('/logout',Logout)
userRoute.get('/purchases',userMiddleware,PurchaseCourse)
export default userRoute;

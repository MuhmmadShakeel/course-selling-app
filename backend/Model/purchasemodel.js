import mongoose from "mongoose";
const purchaseSchema=mongoose.Schema({
   userId:{
    type:mongoose.Types.ObjectId,
    ref:'user'
   },
   courseId:{
    type:mongoose.Types.ObjectId,
    ref:'Course'
   }
})
const Purchase=mongoose.model('purchase',purchaseSchema)
export default Purchase
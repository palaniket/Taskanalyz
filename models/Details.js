import mongoose from "mongoose";
const DetailsSchema=new mongoose.Schema({
    name:{type:String,required:true},
    taskid:{type:String,required:true},
    summary:{type:String,required:true}
});
return mongoose.models.Details || mongoose.model("Details",DetailsSchema);
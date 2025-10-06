import mongoose from "mongoose";
const Taskschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:Boolean,default:false},
    priority:{
        type:String,
        enum:["urgent","medium","low"],
        required:true
    },
    googleDetails:{type:String,default:""}
});
export default mongoose.models.Taskschema||mongoose.model("Taskschema",Taskschema);
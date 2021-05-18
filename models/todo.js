const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const listSchema=new Schema({task_description:String},{timestamps:true});
const todo= mongoose.model("task",listSchema);
module.exports=todo;    
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        trype:String,
    },
    submissionLink:{
        type:String,
    },
    score:{
        type:Number,
        default:0
    }
},{timestamps:true});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
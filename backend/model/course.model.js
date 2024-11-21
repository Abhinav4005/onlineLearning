import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        requuired:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    thumbnail:{
        type:String,
    },
    videos:[
        {
            type:String,
        }
    ]
}, { timestamps:true});

const Course = mongoose.model("Course", courseSchema);

export default Course;
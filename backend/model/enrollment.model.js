import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:true,
        },
        progress:{
            type:Number,
            default:0,
        },
        enrolledAt:{
            type:Date,
            default:Date.now(),
        }
    }, {
        timestamps:true,
    }
)

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
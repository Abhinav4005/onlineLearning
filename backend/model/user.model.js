import mongoose from "mongoose";

const userScheam = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"instructor",
        enum:['student', 'instructor']
    }
})

const User = mongoose.model("User", userScheam);

export default User;
import User from "../model/user.model.js";
import generateTokenAndCookie from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const forgotPassword = async(req, res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        console.log("user -> ", user)
        if(!user){
            res.status(400).json({error:"Email does not exist"});
        }
        const resetToken = generateTokenAndCookie(user._id, res)
        console.log("userId", user._id)
        console.log("Reset token -> ", resetToken);
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:"gameing9068@gmail.com",
                pass:"Game@09!A"
            }
        });

        const mailOption = {
            to:user.email,
            from:"gameing9068@gmail.com",
            subject:"Password Reset",
            text:`You are receiving this because you (or someone else) requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                ${resetLink}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        }

        await transporter.sendMail(mailOption);
        res.status(200).json({message:"Password reset link sent to email"})
    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const resetPassword = async(req,res)=>{
    const {token} = req.params;
    const {password} = req.body;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded -> ",decode)
    const userId = decodeToken.userId

    const user = await User.findById(userId);
    if(!user){
        res.status(400).json({error:"User not found"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({message:"Password successfully reset"})
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}
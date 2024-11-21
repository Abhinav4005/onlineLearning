import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/generateToken.js";

export const signup = async (req, res)=>{
    try {
        const {name, email, password, confirmPassword} = req.body;
        console.log("name -> ",name)

        if(password !== confirmPassword){
            return res.status(400).json({error:"Password does not match"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({error:"Email already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser= new User({
            name,
            email,
            password:hashedPassword,
            confirmPassword ,
        });

        if(newUser){
            generateTokenAndCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                name:newUser.name
            });
        } else{
            return res.status(400).json({error:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in sign up controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email})
        const isCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isCorrect){
            return res.status(400).json({error:"Invalid email or password"})
        }

        generateTokenAndCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            email:user.email,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
} 
export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller");
        res.status(500).json({error:"Internal server error"});
    }
}
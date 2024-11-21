import jwt from "jsonwebtoken";
import User from "../model/user.model";

const protectRoute = async(req, res, next)=>{
    const token = req.cookie.jwt;
    try {
        if(!token){
            return res.status(401).json({error:"Unauthorized - No token provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password -confirmPassword");

        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protect route middleware");
        res.status(500).json({error:"Internal server error"})
    }
}

export default protectRoute;
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/auth.route.js"
import forgotRoute from "./routes/forgot.route.js"
import courseRoute from "./routes/course.route.js"
import cors from "cors";

dotenv.config();

const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true, 
// }));

app.use(cors());

app.use(express.json())

app.use("/api", userRoute);
app.use("/api", forgotRoute);
app.use("/api", courseRoute)

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`)
})
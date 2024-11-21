import User from "../model/user.model.js";
import Course from "../model/course.model.js";
import Enrollment from "../model/enrollment.model.js";

export const enrollStudent = async(req,res)=>{
    const {studentId, courseId} = req.body;
    try {
        const student = await User.findById(studentId);
        if(!student){
            return res.status(400).json({error:"Student not found"});
        }
        const course = await Course.findById(courseId);
        
        if(!course){
            return res.status(400).json({error:"Course not found"});
        }

        const enrollment = new Enrollment({
            student:studentId,
            course:courseId,
            progress:0,
            enrolledAt:Date.now(),
        })

        await enrollment.save();
        res.status(200).json({message:"Erollment successfull", enrollment});
    } catch (error) {
        console.log("Error in enrollStudent controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const getEnrollments = async(req, res)=>{
    try {
        const enrollments = await Enrollment.find()
        .populate('student', 'name email')
        .populate("course", 'title descritpion');

        res.status(200).json(enrollments);
    } catch (error) {
        console.log("Error in getEnrollmets controller");
        res.status(500).json({error:"Internal sever error"});
    }
}

export const getStudentEnrollment = async(req,res)=>{
    const {studentId} = req.params;
    try {
        const enrollments = await Enrollment.find({student:studentId})
        .populate("course", "title description");
        if(enrollments.length === 0){
            return res.status(404).json({error:"No Enrollments found for this student"});
        }

        res.status(200).json(enrollments);
    } catch (error) {
        console.log("Error in getStudentController", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const getCourseEnrollments = async(req, res)=>{
    const {courseId} = req.params;
    try {
        const enrollments = await Enrollment.find({course:courseId})
        .populate("student", "name email");

        if(enrollments.length === 0){
            return res.status(404).json({error:"No student enrolled in this course"});
        }

        res.status(200).json(enrollments);
    } catch (error) {
        console.log("Error in getStudentEnrollment controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const updateProgress = async(req, res) =>{
    const {enrollmentId, progress} = req.body;
    try {
        const enrollment = await Enrollment.findById(enrollmentId);
        if(!enrollment){
            res.status(400).json({error:"Enrollment not found"})
        }
        enrollment.progress = progress;
        await enrollment.save()

        res.status(200).json({message:"Progress updated successfully", enrollment})
    } catch (error) {
        console.log("Error in updateProgress controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const deleteEnrollment = async(req,res)=>{
    const {enrollmentId} = req.params;
    try {
        const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
        if(!enrollment){
            res.status(400).json({error:"Enrollment not found"});
        }
        res.status(200).json({message:"Enrollment deleted successfully"});
    } catch (error) {
        console.log("Error in deleteEnrollment controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
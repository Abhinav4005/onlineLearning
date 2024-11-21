import Assignment from "../model/assignment.model";
import Course from "../model/course.model";

export const createAssignMent = async(req, res)=>{
    const {courseId, title, description, submissionLink, score} = req.body;
    try {
        const course = await Course(courseId);
        if(!course){
            res.status(404).json({error:"Course not found"})
        }
        const assingment = new Assignment({
            course:courseId,
            title,
            description,
            submissionLink,
            score
        });

        await assingment.save();
        res.status(201).json({message:"Assingment created successfully", assingment});
    } catch (error) {
        console.log("Error in createAssignment controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getAllAssingnment = async(req, res)=>{
    try {
        const assignment = await Assignment.find()
        .populate('course', 'title description');

        res.status(200).json(assignment);
    } catch (error) {
        console.log("Error in getAllAssignment controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getAssignmentByCourse = async(req, res)=>{
    const {courseId} = req.params;
    try {
        const assignment = await Assignment.find({course:courseId})
        .populate('course', 'title description');

        if(assignment.length ===0){
            return res.status(404).json({error:"No assignment found for this course"});
        }
        res.status(200).json(assignment);
    } catch (error) {
        console.log("Error in getAssignmentByCourse controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const updateAssingment = async(req, res)=>{
    const {assignmentId} = req.params;
    const {title, description, submissionLink, score} = req.body;
    try {
        const assignment = await Assignment.findByIdAndUpdate(assignmentId);
        if(!assignment){
            return res.status(404).json({error:"Assingnment not found"});
        }
        if(title) assignment.title = title;
        if(description) assignment.description = description;
        if(submissionLink) assignment.submissionLink = submissionLink;
        if(score !== undefined) assignment.score = score

        await assignment.save();
        res.status(200).json({message:"Assignment updated successfully", assignment});
    } catch (error) {
        console.log("Error in updateAssignment controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const deleteAssignment = async(req, res)=>{
    const {assingnmentId} = req.params;
    try {
        const assignment = await Assignment.findByIdAndDelete(assingnmentId);
        if(!assignment){
            return res.status(404).json({error:"Assignment not found"});
        }
        res.status(200).json({message:"Assignment delete successfully"});
    } catch (error) {
        console.log("Error in deletAssignment controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
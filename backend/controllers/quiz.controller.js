import Course from "../model/course.model";
import Quiz from "../model/quiz.model";

export const createQuiz = async(req,res)=>{
    const {title, courseId, questions} = req.body;
    try {
        const course = await Course.findById(courseId);
        if(!course){
            res.status(400).json({error:"Course not found"});
        }
        const quiz = new Quiz({
            title,
            course:courseId,
            questions
        });

        await quiz.save();
        res.status(201).json({message:"Quiz created successfully", quiz});
    } catch (error) {
        console.log("Error in createQuiz controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getAllQuizess = async(req,res)=>{
    try {
        const quizess = await Quiz.find()
        .populate("course", "title description");

        res.status(200).json(quizess);
    } catch (error) {
        console.log("Error in getAllQuizess controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getQuizessByCourse = async(req, res)=>{
    const {courseId} = req.params;
    try {
        const quizess = await Quiz.find({course:courseId})
        .populate('course', "title description")

        if(quizess.length === 0){
            return res.status(404).json({error:"No quizess for this course"});
        }

        res.status(200).json(quizess);
    } catch (error) {
        console.log("Error in getQuizessByCourse controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const updateQuiz = async(req, res)=>{
    const {quizId} = req.params;
    const {title, question} = req.body;
    try {
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(404).json({error:"Quiz not found"});
        }
        if(title) quiz.title = title;
        if(question) quiz.questions = question;

        await quiz.save();
        res.status(200).json({message:"Quiz updated successfully", quiz});
    } catch (error) {
        console.log("Error in updateQuiz controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const deleteQuiz = async(req, res)=>{
    const {quizId} = req.params;
    try {
        const quiz = await Quiz.findByIdAndDelete(quizId);
        if(!quiz){
            res.status(404).json({error:"Quiz not found"});
        }
        res.status(200).json({message:"Quiz deleted successfully"});
    } catch (error) {
        console.log("Error in deleteQuiz controller", error.message);
        res.status(500).json("Internal server error");
    }
}
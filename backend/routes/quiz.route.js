import express from "express";
import { createQuiz, deleteQuiz, getAllQuizess, getQuizessByCourse, updateQuiz } from "../controllers/quiz.controller";

const router = express.Router();

router.post("quiz/create", createQuiz);

router.get("quiz/getAllQuiz", getAllQuizess);

router.get("/quiz/course/:courseId", getQuizessByCourse);

router.put("quiz/:quizId", updateQuiz);

router.delete("/quiz/delete/:quizId", deleteQuiz);

export default router;
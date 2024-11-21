import express from "express";
import { createCourse, deleteCourse, getCourse, getCourseById, updateCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/courses/create", createCourse);

router.get("/courses/getAll", getCourse);

router.get("/courses/getCourseById/:courseId", getCourseById);

router.put("/courses/updateCourse/:courseId", updateCourse);

router.delete("/course/deleteCourse/:courseId", deleteCourse);

export default router;
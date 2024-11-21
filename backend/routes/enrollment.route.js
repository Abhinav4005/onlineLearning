import express from "express"
import { deleteEnrollment, enrollStudent, getCourseEnrollments, getEnrollments, getStudentEnrollment, updateProgress } from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/enroll", enrollStudent);

router.get("/enroll", getEnrollments);

router.get("/enroll/student/:studentId", getStudentEnrollment);

router.get("/enroll/course/:courseId", getCourseEnrollments);

router.put("/enroll/updateProgress", updateProgress);

router.delete("/enroll/deleteEnrollment", deleteEnrollment);
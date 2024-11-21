import express from "express";
import { createAssignMent, deleteAssignment, getAllAssingnment, getAssignmentByCourse, updateAssingment } from "../controllers/assignment.controller";

const router = express.Router();

router.post("/assignment/create", createAssignMent);

router.get("/assignment/getAllAssignment", getAllAssingnment);

router.get("/assignment/getAssignmentByCourseId", getAssignmentByCourse);

router.put("/assignment/update", updateAssingment);

router.delete("/assignement/delete", deleteAssignment);

export default router;
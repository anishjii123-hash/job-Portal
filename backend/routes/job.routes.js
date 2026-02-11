import express from "express";
import isAuthencation from "../middleware/isAuthencation.js";// isAuthencation
import { allJobs, getAdminJobs, getJobById, jobCreate } from "../Controllers/job.controllers.js";


const router = express.Router();

router.post("/post",isAuthencation, jobCreate);
router.get("/get",isAuthencation, allJobs);
router.get("/getAdminId",isAuthencation,getAdminJobs)
router.get("/get/:id",isAuthencation,getJobById);

export default router;
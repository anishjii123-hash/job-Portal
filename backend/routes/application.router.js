import express from "express";

import isAuthencation from "../middleware/isAuthencation.js";// isAuthencation
import { applicationApply, getApplicants, getApplication, updataApplication } from "../Controllers/application.controller.js";

const router = express.Router();

router.post("/apply/:jobId",isAuthencation, applicationApply);
router.get("/get",isAuthencation, getApplication);
router.get("/:jobId/applicants",isAuthencation,getApplicants)
router.post("/status/:id/update",isAuthencation,updataApplication);



export default router;
import express from "express";
import { companyUpdate, getcompanyById, getcompanydetails, registercompany } from "../Controllers/company.controllers.js";
import isAuthencation from "../middleware/isAuthencation.js";// isAuthencation
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/company",isAuthencation, registercompany);
router.get("/get",isAuthencation, getcompanydetails);
router.get("/get/:id",isAuthencation,getcompanyById)
router.put("/update/:id",isAuthencation,singleUpload,companyUpdate);

export default router;



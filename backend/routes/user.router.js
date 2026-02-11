import express from "express";
import { LoginUser, LogOutUser, registerUser, updateProfile } from "../Controllers/user.controller.js";
import isAuthencation from "../middleware/isAuthencation.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", singleUpload,registerUser);
router.post("/login", LoginUser);
router.get("/logout",LogOutUser);
router.post("/profile/update",isAuthencation,singleUpload,updateProfile);

export default router;
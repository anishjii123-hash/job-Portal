import express from "express";
import { changePassword, forgetPassword, LoginUser, LogOutUser, registerUser, updateProfile, verifyOtp } from "../Controllers/user.controller.js";
import isAuthencation from "../middleware/isAuthencation.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", singleUpload,registerUser);
router.post("/login", LoginUser);
router.post("/forgetPassword",forgetPassword)
router.post("/verifyOtp/:email",verifyOtp)
router.post("/changePassword/:email",changePassword)
router.get("/logout",LogOutUser);
router.post("/profile/update",isAuthencation,singleUpload,updateProfile);

export default router;
 import User from "../Models/user.models.js"
import bcrypt from "bcryptjs";
import { get } from "http";
import jwt from "jsonwebtoken";
import { getDataUri } from "../ulties/datauri.js";
import cloudinary from "../ulties/cloudinary.js";

export const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;
  try {
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }
     const file = req.file;
     const fileUri = getDataUri(file);
      const cloudRespond = await cloudinary.uploader.upload(fileUri.content);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
          profilePhoto: cloudRespond.secure_url,
      }

    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true
    });
  } catch (error) {
    console.log(" Register error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
export const LoginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(401).json({
        message: "Role does not match",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user: userData,  
        success: true,
      });
  } catch (error) {
    console.log(" Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
 export const LogOutUser =async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    }catch(error){
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }       
 }

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // may be undefined

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    const userId = req.userId;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Ensure profile exists
    if (!user.profile) user.profile = {};

    // Update text fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // ✅ FILE UPLOAD SAFE HANDLING
    if (file) {
      const fileUri = getDataUri(file);
      const cloudRespond = await cloudinary.uploader.upload(
        fileUri.content
      );

      user.profile.resume = cloudRespond.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log("❌ Update profile error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



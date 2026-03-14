 import User from "../Models/user.models.js"
import bcrypt from "bcryptjs";
import { get } from "http";
import jwt from "jsonwebtoken";
import { getDataUri } from "../ulties/datauri.js";
import cloudinary from "../ulties/cloudinary.js";
import { sentOtp } from "../mailVerification/otpSent.js"


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
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
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
export const forgetPassword = async (req,res) =>{
    try{

    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }
    const otp = Math.floor(100000 + Math.random() *900000).toString();
    const otpExpiry = new Date(Date.now() + 10*60*1000) // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    // await sentOtp(email,otp)
     await sentOtp(email,otp)
    return res.status(200).json({
        success:true,
        message:"OTP sent successfully"
    })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const verifyOtp = async (req,res) =>{
    const {otp} = req.body;
    const email = req.params.email;

    try{

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not defined"
            })
        }
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"OTP not found please request for new OTP"
            })
        }
        if (user.otp.toString() !== otp.toString()){
            return res.status(400).json({
                success:false,
                message:"OTP does not match"
            })
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:"OTP has expired please request for new OTP"
            })
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"OTP verified successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const changePassword = async (req,res) =>{
    const {newPassword,comfirmPassword} = req.body;
    const email = req.params.email;
    
    if(!newPassword || !comfirmPassword){
        return res.status(400).json({
            success:false,
            message:"All field are required"
        })
    }
    if(newPassword !== comfirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password does't Match Please try again"
        })
    }

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does't Exist"
            })
        }
        const hashPassword = await bcrypt.hash(newPassword,10)
         user.password = hashPassword;
         await user.save();

         return res.status(200).json({
            success:true,
            message:"Password successfully change"
         })

    }catch(error){
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }
}
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
    const file = req.file;

    const userId = req.userId;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // ✅ CHECK DUPLICATE PHONE NUMBER
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await User.findOne({ phoneNumber });

      if (existingUser) {
        return res.status(400).json({
          message: "Phone number already exists",
          success: false,
        });
      }
    }

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    if (!user.profile) user.profile = {};

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
      
    if (file) {
  const fileUri = getDataUri(file);

  const cloudRespond = await cloudinary.uploader.upload(
    fileUri.content,
    {
      resource_type: "raw"
    }
  );

  user.profile.resume = cloudRespond.secure_url;
  user.profile.resumeOriginalName = file.originalname;
}

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: user,
    });

  } catch (error) {
    console.log("❌ Update profile error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

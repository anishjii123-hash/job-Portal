import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true,"Full name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true,"Email is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true,"Phone number is required"],
    
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "recruiter"],
    required: true,
  },
  profile: {
    bio: { type: String },
    skills: [String],
    resume: { type: String },
    resumeOriginalName: { type: String },
    companyName: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    profilePhoto: { type: String, default: "" },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

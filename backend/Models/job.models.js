// import mongoose from "mongoose";
// const jobSchema = new mongoose.Schema({
//     title:{
//         type:String,
//         require:true,
    
//     },
//      discreption:{
//         type:String,
//         require:true,
    
//     },
//      requarement:{
//         type:[String],
//         require:true,
    
//     },
//     expreienceLevel:{
//         type:Number,
//         require:true,
//     },
//      salary:{
//         type:Number,
//         require:true,
//      },
//      location:{
//         type:String,
//         require:true,
    
//     }, jobType:{
//         type:String,
//         require:true,
    
//     }, position:{
//         type:Number,
//         require:true,
    
//     }, company:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Company",
//         require:true,   
    
//     }, created_by:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         require:true,   
    
//     },
//     applicant:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Applications",

//     }]
// },{timestamps:true})
// export const Job = mongoose.model("Job",jobSchema) 
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: [String],
      required: true,
    },

    experienceLevel: {
      type: Number,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔥 IMPORTANT
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);

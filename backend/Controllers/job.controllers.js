import { application } from "express";
import { Job } from "../Models/job.models.js";

export const jobCreate = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const parsedSalary = Number(salary);
    const parsedExperience = Number(experience);

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      isNaN(parsedSalary) ||
      isNaN(parsedExperience)
    ) {
      return res.status(400).json({
        message: "All fields are required and must be valid",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),

      salary: parsedSalary,
      location,
      jobType,
      experienceLevel: parsedExperience,
      position,
      company: companyId,
      created_by: req.userId,
    });

    res.status(201).json({
      success: true,
      job,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const allJobs = async (req,res)=>{
 try{
    const keyword = req.query.keyword || "";

    const query ={
        $or:[
            {title:{$regex:keyword,$options:"i"}},
           { description:{$regex:keyword,$options:"i"}}
    ]}
     const jobs = await Job.find(query).populate({
        path:"company",
     }).sort({createdAt:-1});
     if(!jobs){
        return res.status(404).json({
            message:"No jobs found",
            success:false
        })
     }
     return res.status(200).json({
        message:"Job fetch successfully",jobs,
        success:true
     })

 }catch(error){
    console.log("Fetching all jobs error:", error);
 }
}
export const getJobById = async (req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(401).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
          message:"Jobs fetched successfully",job,
          success:true
        })

    }catch(error){
        console.log(" Fetching job by ID error:", error);
    }
}
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId; 

    const jobs = await Job.find({ created_by: adminId })
      .sort({ createdAt: -1 })
      .populate("company");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin",
        success: false
      });
    }

    return res.status(200).json({
      message: "Admin jobs fetched successfully",
      success: true,
      jobs
    });

  } catch (error) {
    console.log("Fetching admin jobs error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

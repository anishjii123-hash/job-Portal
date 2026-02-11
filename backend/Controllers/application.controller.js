 import { Application } from "../Models/application.models.js";
import { Job } from "../Models/job.models.js";


 export const applicationApply = async (req, res) => {
 try {
    const userId = req.userId;
console.log("🍪 Incoming cookies:", req.cookies);

    const { jobId } = req.params  
    console.log("anish check", jobId); 

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application: newApplication,
    });

  } catch (error) {
   // console.error("Application error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getApplication = async (req,res)=>{
    try{
        const userId = req.userId;
         const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
    });
      if(!applications){
        return res.status(404).json({
            message:"No applications found",
            success:false,
        })
      }
      return res.status(200).json({
        message:"Applications Fetched successfully",
        success:true,
        applications, 
      })


    }catch(error){
        console.log("Get applcation erro:",error)
        

    }
}

export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params
     console.log("PARAMS 👉", req.params);
     console.log("🍪 Incoming cookies:", req.cookies);


    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID missing",
      });
    }
console.log("🍪 Incoming cookies:", req.cookies);

    // 🔎 check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // ✅ fetch applicants from Application collection
    const applications = await Application.find({ job: jobId })
      .populate("applicant")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      applications,
    });

  } catch (error) {
    console.log("get application error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updataApplication = async(req,res)=>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(404).json({
                message:"Stutus is required",
                syccess:false,
            })
        }
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false,
            })
        }
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message:"update successfully...",
            success:true,
        })


    }catch(error){
        console.log("Update application error:,error")
    }
}

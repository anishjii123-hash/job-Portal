import { Company } from "../Models/company.models.js";
import { getDataUri } from "../ulties/datauri.js";
import cloudinary from "../ulties/cloudinary.js";
import mongoose from "mongoose";

export const registercompany = async (req, res) => {
  const { companyName } = req.body;

  try {
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const existingCompany = await Company.findOne({ 
  name: companyName,
  user_Id: req.userId
});
console.log("BODY 👉", req.body);
console.log("USER ID 👉", req.userId);


    if (existingCompany) {
      return res.status(400).json({
        message: "You have already registered your company",
        success: false,
      });
    }
    const newCompany = await Company.create({
      name: companyName,
      user_Id: req.userId, 
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company: newCompany,
      success: true,
      
    });

  } catch (error) {
    console.error("❌ Company registration error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getcompanydetails = async (req, res) => {
  try {
    const user_Id = req.userId; 

    if (!user_Id) {
      return res.status(400).json({
        message: "User ID not provided or unauthorized",
        success: false,
      });
    }
    const companies = await Company.find({ user_Id: req.userId });

    if (!companies) {
      return res.status(404).json({
        message: "Company details not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company details fetched successfully",
      companies,
      success: true,
    });
  } catch (error) {
    console.error("❌ Get company details error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getcompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid company id",
        success: false
      });
    }

    const companydetails = await Company.findById(id);

    if (!companydetails) {
      return res.status(404).json({
        message: "Company details not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company details fetched successfully",
      companydetails,
      success: true
    });

  } catch (error) {
    console.error("❌ Get company by Id error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

 export const companyUpdate = async (req,res)=>{
    try{
        const {name,description,website,location}=req.body;
        console.log(req.body);
    let logo;
if (req.file) {
  const fileUri = getDataUri(req.file);
  const cloudRespond = await cloudinary.uploader.upload(fileUri.content);
  logo = cloudRespond.secure_url;
}
const companyupdata = {
  name,
  description,
  website,
  location,
  ...(logo && { logo })
};
        const company = await Company.findByIdAndUpdate(req.params.id,companyupdata,{new:true})
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            }
            )
        }
        return res.status(200).json({
            message:"complany updated successfully",company,
            success:true
        })
        
    }catch(error){
        console.log("❌ company update error:", error);
    }
 }
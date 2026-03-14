// import mongoose from "mongoose";


// export const connectDB = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("Mongodb connected successfully")

//     }catch(err){
//        console.log("Mongodb connection failed",err)
//     }
// }
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/assets/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/discription/${job._id}`)}
      className="
      p-4 sm:p-5 
      rounded-xl 
      cursor-pointer
      bg-[#140021]/80
      backdrop-blur-md
      border border-purple-800/40
      hover:border-purple-500
      hover:shadow-purple-900/40
      hover:shadow-lg
      transition-all
      duration-300
      "
    >
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* COMPANY */}
        <div className="flex items-center gap-3">

          {/* logo */}
          <div className="p-[2px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
            <Avatar className="h-12 w-12 bg-white">
              <AvatarImage
                src={job?.company?.logo || "/company.png"}
                className="object-cover"
              />
            </Avatar>
          </div>

          {/* company name */}
          <div>
            <h1 className="font-semibold text-sm sm:text-base text-white">
              {job?.company?.name}
            </h1>

            <p className="text-xs text-gray-400">
              India
            </p>
          </div>

        </div>

        {/* JOB INFO */}
        <div className="mt-4">

          <h1 className="font-bold text-base sm:text-lg text-white">
            {job?.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mt-1">
            {job?.description}
          </p>

        </div>

        {/* BADGES */}
        <div className="flex flex-wrap gap-2 mt-4">

          <Badge className="text-blue-400 bg-purple-900/30 border border-purple-700">
            {job?.position}
          </Badge>

          <Badge className="text-red-400 bg-purple-900/30 border border-purple-700">
            {job?.jobType}
          </Badge>

          <Badge className="text-green-400 bg-purple-900/30 border border-purple-700">
            {job?.salary}
          </Badge>

        </div>
      </motion.div>
    </div>
  
//     <div
//   onClick={() => navigate(`/discription/${job._id}`)}
//   className="p-4 sm:p-5 rounded-xl cursor-pointer 
//   bg-[#140021]/80 backdrop-blur-md 
//   border border-purple-800/40 
//   hover:border-purple-500 hover:shadow-purple-900/30 
//   hover:shadow-lg transition-all duration-300"
// >
//   <motion.div
//     initial={{ opacity: 0, x: 60 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.3 }}
//   >
//     {/* company */}
//     <div className="flex items-center gap-3">
//       <Button className="p-4 sm:p-5" variant="outline" size="icon">
//         <Avatar>
//           <AvatarImage src={job?.company?.logo} />
//         </Avatar>
//       </Button>

//       <div>
//         <h1 className="font-semibold text-sm sm:text-base text-white">
//           {job?.company?.name}
//         </h1>
//         <p className="text-xs sm:text-sm text-gray-400">India</p>
//       </div>
//     </div>

//     {/* job info */}
//     <div className="mt-3">
//       <h1 className="font-bold text-base sm:text-lg text-white">
//         {job?.title}
//       </h1>

//       <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
//         {job?.description}
//       </p>
//     </div>

//     {/* badges */}
//     <div className="flex flex-wrap gap-2 mt-4">
//       <Badge className="text-blue-400 bg-purple-900/30 border border-purple-700">
//         {job?.position}
//       </Badge>

//       <Badge className="text-red-400 bg-purple-900/30 border border-purple-700">
//         {job?.jobType}
//       </Badge>

//       <Badge className="text-green-400 bg-purple-900/30 border border-purple-700">
//         {job?.salary}
//       </Badge>
//     </div>
//   </motion.div>
// </div>
    // <div
  
    //   onClick={() => navigate(`/discription/${job._id}`)}
       
    //   className="p-5 rounded-md shadow-xl bg-white border border-gray-100"
    // >
  

    //     <motion.div
    //                      initial={{ opacity: 0, x: 60 }}
    //                      animate={{ opacity: 1, x: 0 }}
    //                      transition={{ duration: 0.3 }}
                        
    //                    >
   
    //   <div className="flex items-center ">
    //     <Button className="p-6" variant="outline" size="icon">
    //       <Avatar>
    //         <AvatarImage src={job?.company?.logo} />
    //       </Avatar>
    //     </Button>
    //     <div>
    //       <h1 className="font-medium text-lg mx-3 ">{job?.company?.name}</h1>
    //       <p className="text-sm text-gray-500 mx-3 ">India</p>
    //     </div>
    //   </div>
    //   <div>
    //     <h1 className="font-semibold text-lg my-2"> {job?.title} </h1>
    //     <p className="text-sm text-gray-600 ">{job?.description} </p>
    //   </div>
    //   <div className="flex item-center gap-2 mt-4">
    //     <Badge className={"text-blue-700 font-bold bg-accent "} variant="ghost">
    //       {" "}
    //       {job?.position}{" "}
    //     </Badge>
    //     <Badge className={"text-red-600 font-bold bg-accent "} variant="ghost">
    //       {" "}
    //       {job?.jobType}
    //     </Badge>
    //     <Badge
    //       className={"text-green-700 font-bold bg-accent  "}
    //       variant="ghost"
    //     >
    //       {" "}
    //       {job?.salary}{" "}
    //     </Badge>
    //   </div>
    //   </motion.div>
    // </div>
  );
};

export default LatestJobCard;

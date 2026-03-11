// import { Button, buttonVariants } from "@/assets/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Bookmark } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { useNavigate, useParams } from "react-router-dom";

// import React, { use } from "react";

// const Job = ({ job }) => {
//   const navigate = useNavigate();
//   const dateFuncation = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDiffrence = currentTime - createdAt;
//     return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
//   };
//   return (
//     <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
//       <div className="flex item-center justify-between">
//         <p className="text-sm text-gray-500">
//           {dateFuncation(job?.createdAt) === 0
//             ? "Today"
//             : `${dateFuncation(job?.createdAt)}days ago`}
//         </p>
//         <Button variant="outline" className="rounded-full" size="icon">
//           <Bookmark />
//         </Button>
//       </div>

//       <div className="flex items-center ">
//         <Button className="p-6" variant="outline" size="icon">
//           <Avatar>
//             <AvatarImage src={job?.company?.logo} />
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className="font-medium text-lg mx-3 ">{job?.company?.name}</h1>
//           <p className="text-sm text-gray-500 mx-3 ">India</p>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-semibold text-lg my-2"> {job?.title} </h1>
//         <p className="text-sm text-gray-600 ">{job?.description} </p>
//       </div>
//       <div className="flex item-center gap-2 mt-4">
//         <Badge className={"text-blue-700 font-bold bg-accent "} variant="ghost">
//           {" "}
//           {job?.position}{" "}
//         </Badge>
//         <Badge className={"text-red-600 font-bold bg-accent "} variant="ghost">
//           {" "}
//           {job?.jobType}
//         </Badge>
//         <Badge
//           className={"text-green-700 font-bold bg-accent  "}
//           variant="ghost"
//         >
//           {" "}
//           {job?.salary}{" "}
//         </Badge>
//       </div>
//       <div className="flex item-center gap-4 mt-4">
//         <Button
//           variant="outline"
//           onClick={() => {
//             navigate(`/discription/${job?._id}`);
//           }}
//         >
//           {" "}
//           View Details
//         </Button>
//         <Button className="bg-[#7209b7]">Save for Later</Button>
//       </div>
//     </div>
//   );
// };

// export default Job;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Bookmark, MapPin, Clock, IndianRupee } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";

// const Job = ({ job }) => {
//   const navigate = useNavigate();

//   const dateFuncation = (mongoTime) => {
//     const createdAt = new Date(mongoTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
//   };

//   return (
//     <div className="w-full p-5 rounded-2xl shadow-xl 
//     bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] 
//     text-white border border-[#2a1a4a]
//     hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

//       {/* Top */}
//       <div className="flex items-center justify-between">
//         <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1">
//           <Clock size={14} />
//           {dateFuncation(job?.createdAt) === 0
//             ? "Today"
//             : `${dateFuncation(job?.createdAt)} days ago`}
//         </p>

//         <Button
//           size="icon"
//           variant="outline"
//           className="rounded-full border-gray-600 text-white hover:bg-[#7209b7]"
//         >
//           <Bookmark size={18} />
//         </Button>
//       </div>

//       {/* Company */}
//       <div className="flex items-center gap-3 mt-4">
//         <Avatar className="w-12 h-12 border border-gray-500">
//           <AvatarImage src={job?.company?.logo} />
//         </Avatar>

//         <div>
//           <h1 className="font-semibold text-base sm:text-lg">
//             {job?.company?.name}
//           </h1>

//           <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
//             <MapPin size={14} /> India
//           </p>
//         </div>
//       </div>

//       {/* Job Title */}
//       <div className="mt-4">
//         <h1 className="font-bold text-lg sm:text-xl">
//           {job?.title}
//         </h1>

//         <p className="text-sm text-gray-300 mt-1 line-clamp-2">
//           {job?.description}
//         </p>
//       </div>

//       {/* Tags */}
//       <div className="flex flex-wrap items-center gap-2 mt-4">

//         <Badge className="bg-blue-500/20 text-blue-400 border border-blue-400">
//           {job?.position}
//         </Badge>

//         <Badge className="bg-red-500/20 text-red-400 border border-red-400">
//           {job?.jobType}
//         </Badge>

//         <Badge className="bg-green-500/20 text-green-400 border border-green-400 flex items-center gap-1">
//           <IndianRupee size={14} /> {job?.salary}
//         </Badge>

//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3 mt-5">

//         <Button
//           variant="outline"
//           className="border-gray-500 text-white hover:bg-white hover:text-black w-full sm:w-auto"
//           onClick={() => navigate(`/discription/${job?._id}`)}
//         >
//           View Details
//         </Button>

//         <Button className="bg-[#7209b7] hover:bg-[#5a0894] w-full sm:w-auto">
//           Save Job
//         </Button>

//       </div>
//     </div>
//   );
// };

// export default Job;
import { Button } from "@/assets/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Clock, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const dateFuncation = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-xl shadow-xl 
    bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033]
    text-white border border-[#2a1a4a]
    hover:scale-[1.02] transition duration-300">

      {/* Top */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1">
          <Clock size={14}/>
          {dateFuncation(job?.createdAt) === 0
            ? "Today"
            : `${dateFuncation(job?.createdAt)} days ago`}
        </p>

        <Button size="icon" variant="outline" className="rounded-full border-gray-500">
          <Bookmark size={18}/>
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="w-12 h-12 border-2 border-purple-600">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <MapPin size={14}/> India
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h1 className="text-lg sm:text-xl font-bold">{job?.title}</h1>
        <p className="text-gray-300 text-sm mt-1 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-400">
          {job?.position}
        </Badge>

        <Badge className="bg-red-500/20 text-red-400 border border-red-400">
          {job?.jobType}
        </Badge>

        <Badge className="bg-green-500/20 text-green-400 border border-green-400 flex items-center gap-1">
          <IndianRupee size={14}/> {job?.salary}
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <Button
          variant="outline"
          className="border-gray-500 bg-white w-full text-black"
          onClick={() => navigate(`/discription/${job?._id}`)}
        >
          View Details
        </Button>

      </div>
    </div>
  );
};

export default Job;
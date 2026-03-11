// import React, { useState } from "react";
// import Navbar from "./shares/Navbar";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "../ui/button";
// import { Pen, Mail, Phone } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "flowbite-react";
// import AppliedJobs from "./AppliedJobs";
// import EditProfileDialog from "./EditProfileDialog";
// import { useSelector } from "react-redux";
// import useGetAppliedJob from "@/hooks/useGetApplyiedJob";

// const isResume = true;

// const Profile = () => {
//   useGetAppliedJob();

//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center mt-20 text-xl font-semibold">
//           Please login to view your profile
//         </div>
//       </>
//     );
//   }

//   return (
//     <div>
//       <Navbar />

//       <div className="max-w-4xl mx-auto bg-white border rounded-2xl my-5 p-8">
//         {/* TOP SECTION */}
//         <div className="flex justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar>
//               <AvatarImage src={user?.profile?.profilePhoto} />
//             </Avatar>

//             <div>
//               <h1 className="font-medium text-xl">{user.fullName}</h1>
//               <p>{user?.profile?.bio || "No bio added"}</p>
//             </div>
//           </div>

//           <Button onClick={() => setOpen(true)} variant="outline">
//             <Pen />
//           </Button>
//         </div>

//         {/* CONTACT */}
//         <div className="my-5">
//           <div className="flex items-center gap-3 my-2">
//             <Mail />
//             <span>{user.email}</span>
//           </div>

//           <div className="flex items-center gap-3 my-2">
//             <Phone />
//             <span>{user.phoneNumber}</span>
//           </div>
//         </div>

//         {/* SKILLS */}
//         <div>
//           <h1 className="font-bold text-lg my-3">Skills</h1>
//           <div className="flex items-center gap-2 flex-wrap">
//             {user?.profile?.skills?.length > 0 ? (
//               user.profile.skills.map((skill, index) => (
//                 <Badge key={index}>{skill}</Badge>
//               ))
//             ) : (
//               <p>No skills added yet.</p>
//             )}
//           </div>
//         </div>

//         {/* RESUME */}
//         <div className="grid w-full max-w-sm gap-1.5 mt-3">
//           <Label className="text-md font-bold">Resume</Label>
//           {isResume && user?.profile?.resume ? (
//             <a
//               href={user.profile.resume}
//               target="_blank"
//               className="text-blue-500 hover:underline"
//             >
//               {user.profile.resumeOriginalName}
//             </a>
//           ) : (
//             <p>No resume uploaded.</p>
//           )}
//         </div>
//         <div className="my-5">
//           <h1 className="font-bold text-lg my-3">Applied Jobs</h1>
//           <AppliedJobs />
//         </div>
//       </div>

//       <EditProfileDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from "react";
// import Navbar from "./shares/Navbar";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "../ui/button";
// import {
//   Pen,
//   Mail,
//   Phone,
//   User,
//   Award,
//   FileText
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "flowbite-react";
// import AppliedJobs from "./AppliedJobs";
// import EditProfileDialog from "./EditProfileDialog";
// import { useSelector } from "react-redux";
// import useGetAppliedJob from "@/hooks/useGetApplyiedJob";

// const Profile = () => {
//   useGetAppliedJob();

//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((state) => state.auth);

//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center mt-20 text-xl font-semibold">
//           Please login to view your profile
//         </div>
//       </>
//     );
//   }

//   return (
//     <div>
//       <Navbar />

//       <div className="max-w-4xl mx-auto bg-white border rounded-2xl my-6 p-8 shadow-sm">

//         {/* TOP SECTION */}
//         <div className="flex justify-between items-center">

//           <div className="flex items-center gap-4">

//             <Avatar className="w-16 h-16">
//               <AvatarImage src={user?.profile?.profilePhoto} />
//             </Avatar>

//             <div>
//               <h1 className="font-semibold text-2xl flex items-center gap-2">
//                 <User size={20} />
//                 {user.fullName}
//               </h1>

//               <p className="text-gray-600">
//                 {user?.profile?.bio || "No bio added"}
//               </p>
//             </div>

//           </div>

//           <Button
//             onClick={() => setOpen(true)}
//             variant="outline"
//             className="flex items-center gap-2"
//           >
//             <Pen size={16} />
//             Edit
//           </Button>

//         </div>

//         {/* CONTACT */}
//         <div className="my-6 border-t pt-5">

//           <h1 className="font-semibold text-lg mb-3">Contact Information</h1>

//           <div className="flex items-center gap-3 text-gray-700 my-2">
//             <Mail size={18} />
//             <span>{user.email}</span>
//           </div>

//           <div className="flex items-center gap-3 text-gray-700 my-2">
//             <Phone size={18} />
//             <span>{user.phoneNumber}</span>
//           </div>

//         </div>

//         {/* SKILLS */}
//         <div className="border-t pt-5">

//           <h1 className="font-semibold text-lg flex items-center gap-2 mb-3">
//             <Award size={18} />
//             Skills
//           </h1>

//           <div className="flex items-center gap-2 flex-wrap">

//             {user?.profile?.skills?.length > 0 ? (
//               user.profile.skills.map((skill, index) => (
//                 <Badge key={index} className="bg-purple-100 text-purple-700">
//                   {skill}
//                 </Badge>
//               ))
//             ) : (
//               <p className="text-gray-500">No skills added yet.</p>
//             )}

//           </div>

//         </div>

//         {/* RESUME */}
//         <div className="border-t pt-5 mt-5">

//           <Label className="text-md font-semibold flex items-center gap-2">
//             <FileText size={18} />
//             Resume
//           </Label>

//           {user?.profile?.resume ? (
//             <a
//               href={user.profile.resume}
//               target="_blank"
//               className="text-blue-500 hover:underline"
//             >
//               {user.profile.resumeOriginalName}
//             </a>
//           ) : (
//             <p className="text-gray-500">No resume uploaded.</p>
//           )}

//         </div>

//         {/* APPLIED JOBS */}
//         <div className="border-t pt-5 mt-6">

//           <h1 className="font-semibold text-lg mb-3">
//             Applied Jobs
//           </h1>

//           <AppliedJobs />

//         </div>

//       </div>

//       <EditProfileDialog open={open} setOpen={setOpen} />

//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import Navbar from "./shares/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  Pen,
  Mail,
  Phone,
  User,
  Award,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "flowbite-react";
import AppliedJobs from "./AppliedJobs";
import EditProfileDialog from "./EditProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetApplyiedJob";

const Profile = () => {
  useGetAppliedJob();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-xl font-semibold text-white">
          Please login to view your profile
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto border border-purple-900 rounded-2xl my-10 p-8 bg-[#140021] shadow-lg">

        {/* TOP SECTION */}
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4">

            <Avatar className="w-16 h-16 border-2 border-purple-500">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="font-semibold text-2xl flex items-center gap-2">
                <User size={20} />
                {user.fullName}
              </h1>

              <p className="text-gray-300">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>

          </div>

          <Button
            onClick={() => setOpen(true)}
            className="bg-purple-700 hover:bg-purple-800 flex items-center gap-2"
          >
            <Pen size={16} />
            Edit
          </Button>

        </div>

        {/* CONTACT */}
        <div className="my-6 border-t border-purple-800 pt-5">

          <h1 className="font-semibold text-lg mb-3">
            Contact Information
          </h1>

          <div className="flex items-center gap-3 text-gray-300 my-2">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 my-2">
            <Phone size={18} />
            <span>{user.phoneNumber}</span>
          </div>

        </div>

        {/* SKILLS */}
        <div className="border-t border-purple-800 pt-5">

          <h1 className="font-semibold text-lg flex items-center gap-2 mb-3">
            <Award size={18} />
            Skills
          </h1>

          <div className="flex items-center gap-2 flex-wrap">

            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-purple-700 text-white hover:bg-purple-800"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-400">No skills added yet.</p>
            )}

          </div>

        </div>

        {/* RESUME */}
        <div className="border-t border-purple-800 pt-5 mt-5">

          <Label className="text-md font-semibold flex items-center gap-2">
            <FileText size={18} />
            Resume
          </Label>

          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              className="text-purple-400 hover:underline"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <p className="text-gray-400">No resume uploaded.</p>
          )}

        </div>

        {/* APPLIED JOBS */}
        <div className="border-t border-purple-800 pt-5 mt-6">

          <h1 className="font-semibold text-lg mb-3">
            Applied Jobs
          </h1>

          <AppliedJobs />

        </div>

      </div>

      <EditProfileDialog open={open} setOpen={setOpen} />

    </div>
  );
};

export default Profile;
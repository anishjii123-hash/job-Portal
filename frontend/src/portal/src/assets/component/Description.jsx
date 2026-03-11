
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/assets/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLY_API_END_POINT, JOBS_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobsSlice";
import { toast } from "sonner";

const Description = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const { jobId } = useParams();
  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(setSingleJob(null));
  }, [jobId,user?._id]);

  const [isApplied, setIsApplied] = useState(false);
  const jobApply = async () => {
    try {
      const res = await axios.post(
        `${APPLY_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message;

      if (msg === "You have already applied for this job") {
        setIsApplied(true);
      }

      toast.error(msg || "Job apply failed");
    }
  };

  // ================= FETCH SINGLE JOB =================
      useEffect(() => {
     const fetchSingleJob = async () => {
       try {
       const res = await axios.get(
           `${JOBS_API_END_POINT}/get/${jobId}`,
           { withCredentials: true }
         );

         if (res.data.success) {
           dispatch(setSingleJob(res.data.job));

           const alreadyApplied =
             res.data.job?.applications?.some(
               (application) =>
                 application?.applicant?.toString() === user?._id
             ) || false;

           setIsApplied(alreadyApplied);
         }
      } catch (error) {
         toast.error("Error while fetching job");
       }
     };

     if (jobId && user?._id) {
       // if (jobId) {
       fetchSingleJob();
     }
   }, [jobId, user?._id,dispatch]);

   return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] text-white py-8 sm:py-10">
  <div className="max-w-5xl mx-auto px-4 sm:px-6">

    {/* ================= HEADER CARD ================= */}
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 sm:p-8 shadow-xl">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
            {singleJob?.title}
          </h1>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400">
              {singleJob?.position}
            </Badge>

            <Badge className="bg-red-500/20 text-red-300 border border-red-400">
              {singleJob?.jobType}
            </Badge>

            <Badge className="bg-green-500/20 text-green-300 border border-green-400">
              ${singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={jobApply}
          disabled={isApplied}
          className={`w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-semibold transition-all
          ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
    </div>

    {/* ================= DETAILS CARD ================= */}
    <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 sm:p-8 shadow-xl">

      <h2 className="text-lg sm:text-xl font-semibold border-b border-white/20 pb-3 sm:pb-4">
        Job Description
      </h2>

      <p className="text-gray-300 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
        {singleJob?.description}
      </p>

      {/* ================= JOB INFO GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 text-gray-200 text-sm sm:text-base">

        <p>
          <span className="font-semibold text-white">Role:</span>{" "}
          {singleJob?.title}
        </p>

        <p>
          <span className="font-semibold text-white">Location:</span>{" "}
          {singleJob?.location}
        </p>

        <p>
          <span className="font-semibold text-white">Experience:</span>{" "}
          {singleJob?.experienceLevel} years
        </p>

        <p>
          <span className="font-semibold text-white">Salary:</span>{" "}
          ${singleJob?.salary}
        </p>

        <p>
          <span className="font-semibold text-white">Applicants:</span>{" "}
          {singleJob?.applications?.length || 0}
        </p>

        <p>
          <span className="font-semibold text-white">Posted Date:</span>{" "}
          {singleJob?.createdAt?.split("T")[0]}
        </p>

      </div>
    </div>
  </div>
</div>
//     <div className="min-h-screen bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] text-white py-10">
//   <div className="max-w-5xl mx-auto px-6">

//     {/* ================= HEADER CARD ================= */}
//     <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">

//       <div className="flex items-start justify-between flex-wrap gap-4">

//         <div>
//           <h1 className="text-3xl font-bold tracking-wide">
//             {singleJob?.title}
//           </h1>

//           <div className="flex flex-wrap gap-3 mt-4">
//             <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400">
//               {singleJob?.position}
//             </Badge>

//             <Badge className="bg-red-500/20 text-red-300 border border-red-400">
//               {singleJob?.jobType}
//             </Badge>

//             <Badge className="bg-green-500/20 text-green-300 border border-green-400">
//               ${singleJob?.salary}
//             </Badge>
//           </div>
//         </div>

//         <Button
//           onClick={jobApply}
//           disabled={isApplied}
//           className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all
//           ${
//             isApplied
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-[#7209b7] hover:bg-[#5f32ad]"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>
//     </div>

//     {/* ================= DETAILS CARD ================= */}
//     <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">

//       <h2 className="text-xl font-semibold border-b border-white/20 pb-4">
//         Job Description
//       </h2>

//       <p className="text-gray-300 mt-4 leading-relaxed">
//         {singleJob?.description}
//       </p>

//       {/* ================= JOB INFO GRID ================= */}
//       <div className="grid md:grid-cols-2 gap-6 mt-8 text-gray-200">

//         <p>
//           <span className="font-semibold text-white">Role:</span>{" "}
//           {singleJob?.title}
//         </p>

//         <p>
//           <span className="font-semibold text-white">Location:</span>{" "}
//           {singleJob?.location}
//         </p>

//         <p>
//           <span className="font-semibold text-white">Experience:</span>{" "}
//           {singleJob?.experienceLevel} years
//         </p>

//         <p>
//           <span className="font-semibold text-white">Salary:</span>{" "}
//           ${singleJob?.salary}
//         </p>

//         <p>
//           <span className="font-semibold text-white">Applicants:</span>{" "}
//           {singleJob?.applications?.length || 0}
//         </p>

//         <p>
//           <span className="font-semibold text-white">Posted Date:</span>{" "}
//           {singleJob?.createdAt?.split("T")[0]}
//         </p>

//       </div>

//     </div>
//   </div>
// </div>
    //  <div className="min-h-screen bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] text-white max-w-screen mx-auto my-10 ">

    //   {/* ================= HEADER ================= */}
    //   <div className="flex items-center justify-between">
    //     <div>
    //       <h1 className="font-bold flex  text-xl">{singleJob?.title}</h1>

    //       <div className="flex items-center gap-2 mt-4">
    //         <Badge className="text-blue-700 font-bold bg-accent" variant="ghost">
    //           {singleJob?.position}
    //         </Badge>
    //         <Badge className="text-red-600 font-bold bg-accent" variant="ghost">
    //           {singleJob?.jobType}
    //         </Badge>
    //         <Badge className="text-green-700 font-bold bg-accent" variant="ghost">
    //           {singleJob?.salary}
    //         </Badge>
    //       </div>
    //     </div>

    //     <Button
    //       onClick={jobApply}
    //       disabled={isApplied}
    //       className={`rounded-lg px-6 py-2 text-white transition-all
    //         ${
    //           isApplied
    //             ? "bg-gray-500 cursor-not-allowed"
    //             : "bg-[#7209b7] hover:bg-[#5f32ad]"
    //         }`}
    //     >
    //       {isApplied ? "Already Applied" : "Apply Now"}
    //     </Button>
    //   </div>

    //   {/* ================= DETAILS ================= */}
    //   <div className="mt-8">
    //     <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
    //       {singleJob?.description}
    //     </h1>

    //     <div className=" text-semi-bold mt-4 space-y-2">
    //       <p><b>Role:</b>    {singleJob?.title}</p>
    //       <p><b>Location:</b> {singleJob?.location}</p>
    //       <p><b>Description:</b> {singleJob?.description}</p>
    //       <p><b>Experience:</b> {singleJob?.experienceLevel} years</p>
    //       <p><b>Salary:</b> $ {singleJob?.salary}</p>
    //       <p>
    //         <b>Applied Applicants:</b>{" "}
    //         {singleJob?.applications?.length || 0}
    //       </p>
    //       <p>
    //         <b>Posted Date:</b>{" "}
    //         {singleJob?.createdAt?.split("T")[0]}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Description;

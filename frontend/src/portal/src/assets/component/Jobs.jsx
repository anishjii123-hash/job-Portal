// import React, { Suspense, useEffect, useMemo, lazy, useState } from "react";
// import { useSelector } from "react-redux";
// import Navbar from "./shares/Navbar";
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { motion } from "framer-motion";

// // ✅ lazy components
// const FilterCard = lazy(() => import("./FilterCard"));
// const Job = lazy(() => import("./Job"));

// const Jobs = () => {
//   useGetAllJobs();

//   const { allJobs, searchQuery } = useSelector((state) => state.job);
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   // ✅ filter optimization
//   useEffect(() => {
//     if (!searchQuery) {
//       setFilteredJobs(allJobs);
//       return;
//     }

//     const query = searchQuery.toLowerCase();

//     const result = allJobs.filter(
//       (job) =>
//         job.title.toLowerCase().includes(query) ||
//         job.description.toLowerCase().includes(query) ||
//         job.location.toLowerCase().includes(query)
//     );

//     setFilteredJobs(result);
//   }, [allJobs, searchQuery]);

//   return (
//     <div>
//       <Navbar />

//       <div className="max-w-7xl mx-auto mt-5">
//         <div className="flex gap-5">
//           {/* LEFT FILTER */}
//           <div className="w-1/5">
//             <Suspense fallback={<p>Loading filters...</p>}>
//               <FilterCard />
//             </Suspense>
//           </div>

//           {/* RIGHT JOB LIST */}
//           {filteredJobs.length === 0 ? (
//             <p>Job not found</p>
//           ) : (
//             <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//               <Suspense fallback={<p>Loading jobs...</p>}>
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="grid grid-cols-3 gap-4"
//                 >
//                   {filteredJobs.map((job) => (
//                     <Job key={job._id} job={job} />
//                   ))}
//                 </motion.div>
//               </Suspense>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;
import React, { Suspense, useEffect, useState, lazy } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shares/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

// ✅ Lazy components
const FilterCard = lazy(() => import("./FilterCard"));
const Job = lazy(() => import("./Job"));

const icons = [Briefcase, Calendar, MapPin];

const Jobs = () => {
  useGetAllJobs();

  const { allJobs, searchQuery } = useSelector((state) => state.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // ✅ filter optimization
  useEffect(() => {
    if (!searchQuery) {
      setFilteredJobs(allJobs);
      return;
    }

    const query = searchQuery.toLowerCase();

    const result = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );

    setFilteredJobs(result);
  }, [allJobs, searchQuery]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1A0033] via-[#12001F] to-[#0B0016] text-white overflow-hidden">

      {/* Floating background icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Icon
              key={i}
              className="absolute text-[#6A38C2] opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="max-w-7xl mx-auto mt-5 px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* LEFT FILTER */}
          <div className="w-full lg:w-1/5">
            <Suspense fallback={<p className="text-white">Loading filters...</p>}>
              <FilterCard />
            </Suspense>
          </div>

          {/* RIGHT JOB LIST */}
          <div className="flex-1">
            {filteredJobs.length === 0 ? (
              <p className="text-white text-center mt-10">No jobs found</p>
            ) : (
              <div className="h-[80vh] lg:h-[88vh] overflow-y-auto pb-5">
                <Suspense fallback={<p className="text-white">Loading jobs...</p>}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredJobs.map((job) => (
                      <Job key={job._id} job={job} />
                    ))}
                  </motion.div>
                </Suspense>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
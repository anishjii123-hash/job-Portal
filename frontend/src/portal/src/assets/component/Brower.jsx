
// import React, { Suspense, lazy, useEffect } from "react";
// const Navbar = lazy(() =>import( "./shares/Navbar"));
// const Job = lazy(() => import("./Job"));
// import { useSelector } from "react-redux";
// import { setSearchQuery } from "@/redux/jobsSlice";
// import { useDispatch } from "react-redux";
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { motion } from "framer-motion";

// const Brower = () => {
//   useGetAllJobs();
//   const { allJobs } = useSelector((state) => state.job);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     return () => {
//       dispatch(setSearchQuery(""));
//     };
//   });
//  // useEffect(() => {
//   //  return () => {
//    //   dispatch(setSearchQuery(""));
//    // };
//  // }, [dispatch]);

//   return (

    // <div>
    //   <Suspense fallback={<p>Loading job...</p>}>
    //     <Navbar />
    //   </Suspense>

    //   <motion.div
    //     initial={{ opacity: 0, x: 60 }}
    //     animate={{ opacity: 1, x: 0 }}
    //     transition={{ duration: 0.3 }}
    //   >
    //     <div className="max-w-7xl mx-auto my-10">
    //       <h1 className="font-bold text-xl">
    //         Search Result ({allJobs.length})
    //       </h1>
    //       <div className="grid grid-cols-3 gap-4 mt-5">
    //         {allJobs.map((job, index) => {
    //           return (
    //             <Suspense fallback={<p>Loading job...</p>}>
    //               <Job key={job._id} job={job} />
    //             </Suspense>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </motion.div>
    // </div>
//   );
// };

// export default Brower;

import React, { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobsSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const Navbar = lazy(() => import("./shares/Navbar"));
const Job = lazy(() => import("./Job"));

const icons = [Briefcase, Calendar, MapPin];

const Brower = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1A0033] via-[#12001F] to-[#0B0016] text-white overflow-hidden">
      
      {/* Background Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Icon
              key={i}
              className="absolute text-[#6A38C2] opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 40}px`,
                height: `${30 + Math.random() * 40}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          );
        })}
      </div>

      <Suspense fallback={<p className="text-center mt-20">Loading Navbar...</p>}>
        <Navbar />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-7xl mx-auto my-10 px-4"
      >
        <h1 className="font-bold text-2xl mb-6">
          Search Result ({allJobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <Suspense key={job._id} fallback={<p>Loading job...</p>}>
              <Job job={job} />
            </Suspense>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Brower;
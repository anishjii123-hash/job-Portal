
import React, { Suspense, lazy, useEffect } from "react";
//const Navbar = lazy(() =>import( "./shares/Navbar"));
const Job = lazy(() => import("./Job"));
import { useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobsSlice";
import { useDispatch } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Brower = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  });
 // useEffect(() => {
  //  return () => {
   //   dispatch(setSearchQuery(""));
   // };
 // }, [dispatch]);

  return (
    <div>
      {/* <Suspense fallback={<p>Loading job...</p>}>
        <Navbar />
      </Suspense> */}

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto my-10">
          <h1 className="font-bold text-xl">
            Search Result ({allJobs.length})
          </h1>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {allJobs.map((job, index) => {
              return (
                <Suspense fallback={<p>Loading job...</p>}>
                  <Job key={index} job={job} />
                </Suspense>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Brower;

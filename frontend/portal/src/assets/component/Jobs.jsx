import React, { Suspense, useEffect, useMemo, lazy, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shares/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

// ✅ lazy components
const FilterCard = lazy(() => import("./FilterCard"));
const Job = lazy(() => import("./Job"));

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
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* LEFT FILTER */}
          <div className="w-1/5">
            <Suspense fallback={<p>Loading filters...</p>}>
              <FilterCard />
            </Suspense>
          </div>

          {/* RIGHT JOB LIST */}
          {filteredJobs.length === 0 ? (
            <p>Job not found</p>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <Suspense fallback={<p>Loading jobs...</p>}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 gap-4"
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
  );
};

export default Jobs;

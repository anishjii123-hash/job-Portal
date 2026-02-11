
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
      fetchSingleJob();
    }
  }, [jobId, user?._id, dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold bg-accent" variant="ghost">
              {singleJob?.position}
            </Badge>
            <Badge className="text-red-600 font-bold bg-accent" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-green-700 font-bold bg-accent" variant="ghost">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={jobApply}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition-all
            ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="mt-8">
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          {singleJob?.description}
        </h1>

        <div className=" text-semi-bold mt-4 space-y-2">
          <p><b>Role:</b>    {singleJob?.title}</p>
          <p><b>Location:</b> {singleJob?.location}</p>
          <p><b>Description:</b> {singleJob?.description}</p>
          <p><b>Experience:</b> {singleJob?.experienceLevel} years</p>
          <p><b>Salary:</b> $ {singleJob?.salary}</p>
          <p>
            <b>Applied Applicants:</b>{" "}
            {singleJob?.applications?.length || 0}
          </p>
          <p>
            <b>Posted Date:</b>{" "}
            {singleJob?.createdAt?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;

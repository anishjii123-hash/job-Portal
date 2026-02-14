import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobsSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOBS_API_END_POINT}/get?keyword=${searchQuery}`,
          { withCredentials: true },
        );

        if (res.data.success) {
          //console.log("ALL JOBS:", res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        // console.log("FETCH JOB ERROR:", error.response?.status);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;

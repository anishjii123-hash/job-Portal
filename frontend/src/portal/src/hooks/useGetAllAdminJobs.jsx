import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllAdminJobs, setAllJobs } from "@/redux/jobsSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/getAdminId`, {
          withCredentials: true,
        });

        if (res.data.success) {
          //console.log("ALL JOBS:", res.data.jobs);
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        //console.log("FETCH JOB ERROR:", error.response?.status);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;

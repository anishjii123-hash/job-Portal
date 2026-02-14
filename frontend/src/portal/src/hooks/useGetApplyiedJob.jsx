import { useEffect } from "react";
import axios from "axios";
import { APPLY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllAppliedJob } from "@/redux/jobsSlice";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const res = await axios.get(`${APPLY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        //console.log("FETCHED APPLIED JOBS:", res.data);
        if (res.data.success) {
          // console.log("ALL APPLIED JOB:", res.data);
          dispatch(setAllAppliedJob(res.data.applications));
        }
      } catch (error) {
        //console.log("FETCH JOB ERROR:", error.response?.status || error.message);
      }
    };

    fetchAppliedJob();
  }, [dispatch]);
};

export default useGetAppliedJob;

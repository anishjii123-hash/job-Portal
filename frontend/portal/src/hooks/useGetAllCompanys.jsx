import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanys = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanys = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        // console.log("API RESPONSE:", res.data.companies);

        if (res.data.success) {
          dispatch(
            setCompanies(
              Array.isArray(res.data.companies)
                ? res.data.companies
                : res.data
                  ? [res.data]
                  : [],
            ),
          );
        }
      } catch (error) {
        //console.log("FETCH JOB ERROR:", error.response?.status);
      }
    };

    fetchCompanys();
  }, [dispatch]);
};

export default useGetAllCompanys;

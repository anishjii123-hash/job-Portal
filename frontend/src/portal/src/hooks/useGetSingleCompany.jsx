import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

const useGetSingleCompany = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId || typeof companyId !== "string") return;

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true },
        );

        if (res.data?.success) {
          // console.log("COMPANY:", res.data.companydetails);
          dispatch(setSingleCompany(res.data.companydetails));
        }
      } catch (error) {
        //console.log(
        // "FETCH COMPANY ERROR:",
        // error.response?.data || error.message
        //);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetSingleCompany;

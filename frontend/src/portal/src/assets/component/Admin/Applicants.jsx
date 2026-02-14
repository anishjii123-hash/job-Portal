 
 
  import { Suspense,lazy } from 'react';
  const Navbar = lazy(()=>import("../shares/Navbar")) ;

import React, { useEffect } from 'react'
const ApplicantTable  = lazy(()=>import('./ApplicantTable'))
import axios from "axios";
import { APPLY_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicantSlice";
import { useSelector } from "react-redux";

const Applicants = () => {
  const {applicants} = useSelector(store => store.applicant);
  const { jobId } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
  const fetchApplicant = async () => {
    try {
      const res = await axios.get(
        `${APPLY_API_END_POINT}/${jobId}/applicants`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setAllApplicants(res.data.applications));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching applicants");
    }
  };

  fetchApplicant();
}, [dispatch, jobId]);


  return (
    <div>
      <Suspense fallback={<p className="text-center mt-4">Loading content...</p>}>
         <Navbar/>
      </Suspense>
  
      <div className='max-w-7xl mx-auto' >
        <h1 className="font-bold text-xl my-5" >Applicants {applicants?.length}
</h1>
<Suspense fallback={<p className="text-center mt-4">Loading content...</p>}>
    <ApplicantTable/>
</Suspense>
       
      </div>
    </div>
  )
}

export default Applicants

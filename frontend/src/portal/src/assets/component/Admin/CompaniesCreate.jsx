
import { Suspense,lazy } from "react"
const  Navbar = lazy(()=>import('../shares/Navbar')) 

import { Button } from "@/assets/ui/button"
import { Label } from '@radix-ui/react-label'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {  useState } from 'react'
import { setSingleCompany } from '@/redux/companySlice'

 const CompaniesCreate = () => {
         const navigate = useNavigate();
     const dispatch = useDispatch()
const [companyName, setCompanyName] = useState(""); 

const registerNewCompany = async () => {
  if (!companyName || companyName.trim() === "") { 
    toast.error("Company name is required");
    return;
  }

  try {
    const res = await axios.post(
      `${COMPANY_API_END_POINT}/company`,
      { companyName: companyName.trim() }, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      }
    );

    if (res.data.success) {
   
      dispatch(setSingleCompany(res.data.company));

      toast.success(res.data.message);

      const companyId = res?.data?.company?._id;
      navigate(`/admin/companies/${companyId}`);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Company creation failed");
  }
};
  return (
    <div>
      <Suspense fallback={<p className="text-center mt-4">Loading content...</p>} >
             <Navbar/>
      </Suspense>
    
      <div className='max-w-4xl mx-auto' >
        <div className='my-10'>
        <h1 className='font-bold text-2xl'  > Your Company Name </h1>
        <p className='text-gray-500' > What would you like to give your company name? you can change this later.</p>
      </div>
      <Label>Company Name </Label>
      <input
      type="text"
      className='my-2 w-150  flex justify-between'
      onChange={(e) => setCompanyName(e.target.value)}
      placeholder='JobHunt , Google etc.'/>
      <div className='flex item-center  gap-2 my-10'>
        <Button variant='outline' onClick={()=> navigate("/admin/companies")} >Cancel</Button>
        <Button onClick={registerNewCompany} >Countinue</Button>
      </div>
      
     </div>
    </div>
  )
}
export default CompaniesCreate
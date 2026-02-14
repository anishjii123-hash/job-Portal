
import Navbar from "../shares/Navbar";
import { Button } from "@/assets/ui/button"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobBYText } from "@/redux/jobsSlice";

const AdminJobs = () => {
    useGetAllAdminJobs()
  const dispatch = useDispatch()
  const [search,setSearch] = useState("")
  useEffect(()=>{
     dispatch(setSearchJobBYText(search))
  
  },[search])
    const navigate = useNavigate()
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10' >
        <div className='flex item-center justify-between my-6' >
            <input
              onChange={(e) => setSearch(e.target.value)}
            className='w-fit'
            placeholder='Filter by name , role'/>
            <Button onClick={()=>navigate("/admin/jobs/create")} >New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs

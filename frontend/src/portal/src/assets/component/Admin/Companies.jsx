

import { Suspense,lazy } from 'react';
const CompaniesTable  = lazy(()=>import('./CompaniesTable'))

const Navbar = lazy(()=>import("../shares/Navbar"));
import { Button } from "@/assets/ui/button"

import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGetAllCompanys from '@/hooks/useGetAllCompanys';
import { useDispatch } from 'react-redux';
import { setSearchCompany } from '@/redux/companySlice';
import { useEffect } from 'react';

const Companies = () => {
  const dispatch = useDispatch()
  const [search,setSearch] = useState("")
  useGetAllCompanys();
  useEffect(()=>{
     dispatch(setSearchCompany(search))
  
  },[search])
    const navigate = useNavigate()
  return (
    <div>
      <Suspense fallback={<p className="text-center mt-4">Loading content...</p>} >
         <Navbar/>
      </Suspense>
     
      <div className='max-w-6xl mx-auto my-10' >
        <div className='flex item-center justify-between my-6' >
            <input
              onChange={(e) => setSearch(e.target.value)}
            className='w-fit'
            placeholder='Filter by name'/>
            <Button onClick={()=>navigate("/admin/companies/create")} >New Company</Button>

        </div>
        <CompaniesTable/>

      </div>
    </div>
  )
}

export default Companies

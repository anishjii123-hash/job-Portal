import React from 'react'
import { Table,TableBody,TableCell,TableCaption,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {  MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import axios from 'axios'
import { APPLY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'


const shortlist = ["Accepted","Rejected"]
const ApplicantTable = () => {
    const {applicants} = useSelector(store => store.applicant)
    const statusHandler = async(status,id) =>{
      try{
        axios.defaults.withCredentials = true
        const res = await axios.post(`${APPLY_API_END_POINT}/status/${id}/update`,{status}
        )
        if(res.data.success){
          toast.success(res.data.message)
        }

      }catch(error){
         toast.error(error.responce.data.message)
      }
    }

  return (
    <div>
    <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Full Name</TableHead>
                   <TableHead>E-mail</TableHead>
                      <TableHead>Contact</TableHead>
                         <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                               <TableHead className="float-right cursor-pointer" >
                                Action</TableHead>
                
            </TableRow>
              </TableHeader>
            <TableBody>
              {
                applicants?.map((item)=>(
                   <tr key={item._id}>
                    <TableCell>{item?.applicant?.fullName}</TableCell>
                    <TableCell>{item?.applicant?.email}</TableCell>
                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                    {
                      item?.applicant?.profile?.resume ? (  <TableCell className="text-blue-600 cursor-pointer" >
                        <a href={item?.applicant?.profile?.resumeOriginalName} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>):
                      (<TableCell  className="text-blue-600 cursor-pointer" >No Resume</TableCell>)
                    }
                  
                    <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="text-right" >
                         <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    {
                            shortlist.map((status,index)=>{
                                return(
                                    <div onClick={()=>statusHandler(status,item._id)} key={index} className='flex w-fit item-center my-2 cursor-pointer' >
                                             <span>{status}</span>
                                    </div>
                                    
                                )
                            })
                        }
                  </PopoverContent>
                </Popover> 
                    </TableCell>
                    
                </tr>
                ))
              }
                
            </TableBody>
      
    </Table>
    </div>
  )
}

export default ApplicantTable

import { Table,TableBody,TableCell,TableCaption,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useEffect, useState } from 'react'
import { Edit2, MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { setSearchCompany } from "@/redux/companySlice"
import { useNavigate } from "react-router-dom"
import { Eye } from "lucide-react"
const AdminJobsTable = () => {
  const { searchCompany = "" } = useSelector(store => store.company);
  const { allAdminJobs = [] ,searchJobByText } = useSelector(store => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchJobByText) {
      setFilterJobs(allAdminJobs);
    } else {
      const filtered = allAdminJobs.filter(job =>
        job?.title?.
          toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||  job?.company?.name?.
          toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
      setFilterJobs(filtered);
    }
  }, [allAdminJobs, searchJobByText]);

  return (
    <Table>
      <TableCaption>A list of your recent Jobs.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No jobs found.
            </TableCell>
          </TableRow>
        ) : (
          filterJobs.map((job) => (
            <TableRow key={job._id}>
            
              <TableCell>{job?.company?.name || "N/A"}</TableCell>
              <TableCell>{job?.title || "N/A"}</TableCell>

              <TableCell>
                {job?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>

              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className="flex item-center w-full gap-2 cursor-pointer mt-2" >
                      <Eye className="w-4" />
                      <span>Applicant</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
 export default AdminJobsTable

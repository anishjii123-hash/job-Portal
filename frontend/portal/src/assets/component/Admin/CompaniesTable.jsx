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
import { useNavigate } from "react-router-dom"


const CompaniesTable = () => {
    const { companies = [], searchCompany = "" } = useSelector(state => state.company);
     const [filterCompany,setFilterCompany] = useState(companies)
     const navigate = useNavigate();

useEffect(() => {
  if (!searchCompany) {
    setFilterCompany(companies);
  } else {
    const filtered = companies.filter(company =>
      company?.name?.toLowerCase().includes(searchCompany.toLowerCase())
    );
    setFilterCompany(filtered);
  }
}, [companies, searchCompany]);


 
  return (
    <div>
     <Table>
        <TableCaption>
            A list of your recent registered companies.
        </TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead >Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
  {filterCompany.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        No companies found.
      </TableCell>
    </TableRow>
  ) : (
    filterCompany.map((company) => (
      company ? ( 
        <TableRow key={company._id}>
          <TableCell>
            <Avatar>
              <AvatarImage
                src={company.logo || "https://static.vecteezy.com/..."}
              />
            </Avatar>
          </TableCell>
          <TableCell>{company.name || "N/A"}</TableCell>
          <TableCell>{company.createdAt?.split("T")[0] || "N/A"}</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent>
                <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 cursor-pointer">
                  <Edit2 />
                  <span  >Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableRow>
      ) : null
    ))
  )}
</TableBody>
     </Table>
    </div>
  )
}

export default CompaniesTable

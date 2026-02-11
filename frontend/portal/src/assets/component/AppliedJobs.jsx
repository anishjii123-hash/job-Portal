
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AppliedJobs = () => {
  const { allAppliedJob } = useSelector(store => store.job)

  return (
    <div>
      <Table>
        <TableCaption>A List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJob.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No applied jobs yet
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJob.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{new Date(appliedJob.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{appliedJob?.job?.title || "Untitled Job"}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name || "Unknown Company"}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
  appliedJob?.status === "pending"
    ? "bg-yellow-500"
    : appliedJob?.status === "accepted"
    ? "bg-green-500"
    : "bg-red-500"
}`}>
{appliedJob?.status?.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobs

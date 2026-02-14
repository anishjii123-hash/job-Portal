
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/Input";
import React, { useState } from 'react';
import Navbar from "../shares/Navbar";
import { Button } from "@/assets/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOBS_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,       
    companyId: ""
  });

  const companies = useSelector(store => store.company?.companies) || [];

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: name === "position" ? Number(value) : value
    });
  };
  const selectEventHander = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHander = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${JOBS_API_END_POINT}/post`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success("Job posted successfully");
        navigate("/admin/jobs");
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHander}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>Title</Label>
              <Input name="title" value={input.title} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Salary</Label>
              <Input name="salary" value={input.salary} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Experience</Label>
              <Input name="experience" value={input.experience} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            {companies.length > 0 && (
              <div className="col-span-2">
                <Label>Company</Label>
                <Select onValueChange={selectEventHander}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 ${
              loading ? "bg-gray-400" : "bg-green-700 hover:bg-black"
            }`}
          >
            {loading ? "Please wait..." : "NEW POST JOB"}
          </Button>

          {companies.length === 0 && (
            <p className="text-xs text-red-500 font-bold text-center mt-2">
              * Please register a company first, before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;

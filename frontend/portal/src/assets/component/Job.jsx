import { Button, buttonVariants } from "@/assets/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";

import React, { use } from "react";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dateFuncation = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex item-center justify-between">
        <p className="text-sm text-gray-500">
          {dateFuncation(job?.createdAt) === 0
            ? "Today"
            : `${dateFuncation(job?.createdAt)}days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center ">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg mx-3 ">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500 mx-3 ">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-lg my-2"> {job?.title} </h1>
        <p className="text-sm text-gray-600 ">{job?.description} </p>
      </div>
      <div className="flex item-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold bg-accent "} variant="ghost">
          {" "}
          {job?.position}{" "}
        </Badge>
        <Badge className={"text-red-600 font-bold bg-accent "} variant="ghost">
          {" "}
          {job?.jobType}
        </Badge>
        <Badge
          className={"text-green-700 font-bold bg-accent  "}
          variant="ghost"
        >
          {" "}
          {job?.salary}{" "}
        </Badge>
      </div>
      <div className="flex item-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => {
            navigate(`/discription/${job?._id}`);
          }}
        >
          {" "}
          View Details
        </Button>
        <Button className="bg-[#7209b7]">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;

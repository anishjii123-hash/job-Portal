import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/assets/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/discription/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100"
    >
        <motion.div
                         initial={{ opacity: 0, x: 60 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.3 }}
                        
                       >
   
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
      </motion.div>
    </div>
  );
};

export default LatestJobCard;

import React, { useState } from "react";
import Navbar from "./shares/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Pen, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "flowbite-react";
import AppliedJobs from "./AppliedJobs";
import EditProfileDialog from "./EditProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetApplyiedJob";

const isResume = true;

const Profile = () => {
  useGetAppliedJob();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-xl font-semibold">
          Please login to view your profile
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border rounded-2xl my-5 p-8">
        {/* TOP SECTION */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user.fullName}</h1>
              <p>{user?.profile?.bio || "No bio added"}</p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>

        {/* CONTACT */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Phone />
            <span>{user.phoneNumber}</span>
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <h1 className="font-bold text-lg my-3">Skills</h1>
          <div className="flex items-center gap-2 flex-wrap">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <p>No skills added yet.</p>
            )}
          </div>
        </div>

        {/* RESUME */}
        <div className="grid w-full max-w-sm gap-1.5 mt-3">
          <Label className="text-md font-bold">Resume</Label>
          {isResume && user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <p>No resume uploaded.</p>
          )}
        </div>
        <div className="my-5">
          <h1 className="font-bold text-lg my-3">Applied Jobs</h1>
          <AppliedJobs />
        </div>
      </div>

      <EditProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

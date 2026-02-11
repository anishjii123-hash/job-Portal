import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobsSlice";
import { useState } from "react";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchHandler = () => {
    dispatch(setSearchQuery(searchText));
    navigate("/browser");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job </span>
        </h1>
        <p>
          Lorem 15 tationem ullam corporis suscipit laboriosam, nisi ut aliquid{" "}
          <br /> tationem ullam corporis suscipit laboriosam, nisi ut
        </p>
        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full iten-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Search job here..."
            onChange={(e) => setSearchText(e.target.value)}
            className="outline-none border-none w-full"
          />
          <button
            onClick={searchHandler}
            className="bg-[#F83002] text-white px-6 py-2 rounded-full "
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

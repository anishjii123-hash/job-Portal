// import React, { use } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "@/redux/jobsSlice";
// import { useState } from "react";

// const HeroSection = () => {
//   const [searchText, setSearchText] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchHandler = () => {
//     dispatch(setSearchQuery(searchText));
//     navigate("/browser");
//   };
//   return (
//     <div className="text-center">
//       <div className="flex flex-col gap-5 my-10">
//         <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
//           No.1 Job Hunt Website
//         </span>
//         <h1 className="text-5xl font-bold">
//           Search, Apply & <br /> Get Your{" "}
//           <span className="text-[#6A38C2]">Dream Job </span>
//         </h1>
//         <p>
//           Lorem 15 tationem ullam corporis suscipit laboriosam, nisi ut aliquid{" "}
//           <br /> tationem ullam corporis suscipit laboriosam, nisi ut
//         </p>
//         <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full iten-center gap-4 mx-auto">
//           <input
//             type="text"
//             placeholder="Search job here..."
//             onChange={(e) => setSearchText(e.target.value)}
//             className="outline-none border-none w-full"
//           />
//           <button
//             onClick={searchHandler}
//             className="bg-[#F83002] text-white px-6 py-2 rounded-full "
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobsSlice";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchQuery(searchText));
    navigate("/browser");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] text-white px-6">

      <div className="text-center max-w-4xl w-full">

        {/* badge */}
        <span className="mx-auto inline-block px-5 py-2 rounded-full bg-purple-900/40 border border-purple-700 text-purple-300 text-sm">
          🚀 No.1 Job Hunt Website
        </span>

        {/* heading */}
        <h1 className="text-3xl sm:text-5xl font-bold mt-6 leading-tight">
          Search, Apply & <br />
          Get Your{" "}
          <span className="text-purple-400">
            Dream Job
          </span>
        </h1>

        {/* description */}
        <p className="text-gray-400 mt-4 text-sm sm:text-base">
          Discover thousands of job opportunities from top companies.  
          Start your career journey today and find the perfect role.
        </p>

        {/* search box */}
        <div className="mt-8 flex items-center bg-[#140021]/80 backdrop-blur-md border border-purple-800 rounded-full p-2 max-w-xl mx-auto shadow-lg">

          <input
            type="text"
            placeholder="Search jobs, companies..."
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent outline-none px-4 text-sm sm:text-base placeholder-gray-400"
          />

          <button
            onClick={searchHandler}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-full text-white text-sm sm:text-base"
          >
            Search
          </button>

        </div>

      </div>
    </div>
  );
};

export default HeroSection;
// import React, { useState } from "react";
// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"
// import { USER_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../../redux/AuthSlice";

// const Signup = () => {

//   const [input, setInput] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });
//   const {loading} = useSelector(state=> state.auth);

//      const dispatch = useDispatch()
//     const navigate = useNavigate()

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

  
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(input);
//      const formData = new FormData()
//      formData.append("fullName",input.fullName)
//          formData.append("email",input.email)
//             formData.append("phoneNumber",input.phoneNumber)
//                formData.append("password",input.password)
//                    formData.append("role",input.role)
//                     if (input.file) {
//    formData.append("file", input.file);
//    }
//     try {
//         dispatch(setLoading(true))
//       const res = await axios.post(
//         `${USER_API_END_POINT}/register`,
//         formData,
//          {
//            headers: {
//              "Content-Type": "multipart/form-data"
//           },
//           withCredentials: true,
//         }
//       );

//        if (res.data.success) {
//          navigate("/login");
//          toast.success(res.data.message);
//        }
//      } catch (error) {
//       console.log(error);
//        toast.error(error.response?.data?.message || "Something went wrong");
//      }
//       finally{
//          dispatch(setLoading(false))
//         }
//     };
//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center max-w-7xl mx-auto cursor-pointer">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Sign Up</h1>

//           <div className="my-2">
//             <label>Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={input.fullName}
//               onChange={changeEventHandler}
//               placeholder="Anish Kumar Sharma"
//               className="w-full border p-2 rounded-md mt-1"
//             />
//           </div>

    
//           <div className="my-2">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={changeEventHandler}
//               placeholder="anish@gmail.com"
//               className="w-full border p-2 rounded-md mt-1"
//             />
//           </div>

//           <div className="my-2">
//             <label>phoneNumber No.</label>
//             <input
//               type="number"
//               name="phoneNumber"
//               value={input.phoneNumber}
//               onChange={changeEventHandler}
//               placeholder="9650XXXXXX"
//               className="w-full border p-2 rounded-md mt-1"
//             />
//           </div>

//           {/* Password */}
//           <div className="my-2">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={changeEventHandler}
//               placeholder="XXXXXX"
//               className="w-full border p-2 rounded-md mt-1"
//             />
//           </div>

//           {/* Role Selection */}
//           <div className="my-3">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 name="role"
//                 value="recruiter"
//                 checked={input.role === "recruiter"}
//                 onChange={changeEventHandler}
//               />
//               Recruiter
//             </label>

//             <label className="ml-4">
//               <input
//                 type="radio"
//                 name="role"
//                 value="student"
//                 checked={input.role === "student"}
//                 onChange={changeEventHandler}
//               />
//               Student
//             </label>
//           </div>

//           {/* File Upload */}
//           <div className="flex items-center gap-2 my-2">
//             <label>Profile</label>
//             <input
//               accept="image/*"
//               type="file"
//               onChange={changeFileHandler}
//               className="cursor-pointer"
//             />
//           </div>

//               <button
//   type="submit"
//   disabled={loading}
//   className={`w-full m-4 py-2 rounded-xl text-white flex justify-center items-center ${
//     loading
//       ? "bg-gray-400 cursor-not-allowed"
//       : "bg-green-700 hover:bg-green-500"
//   }`}
// >
//   {loading ? "Please wait..." : "Sign Up"}
// </button>

//           {/* Submit */}
//           {/* <button
//             type="submit"
//             className="w-full bg-green-700 text-white py-2 rounded-xl hover:bg-green-500 mt-3"
//           >
//             Sign Up
//           </button> */}

//           {/* Link to Login */}
//           <span className="w-full flex justify-center mt-2">
//             Already have an account?
//             <Link to="/login" className="text-blue-500 hover:underline ml-1">
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

//  export default Signup;

import React, { useState, useCallback, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/AuthSlice";
import { motion } from "framer-motion";

// ✅ Lazy Navbar (optional but good)
const Navbar = lazy(() => import("./Navbar"));

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ optimized handlers
  const changeEventHandler = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const changeFileHandler = useCallback((e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
         <Suspense fallback={null}>
        <Navbar />
      </Suspense>
          <motion.div
                         initial={{ opacity: 0, x: 60 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.3 }}
                        
                       >
   

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
            placeholder="Anish Kumar Sharma"
            className="w-full border p-2 rounded-md my-2"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="anish@gmail.com"
            className="w-full border p-2 rounded-md my-2"
          />

          {/* Phone */}
          <input
            type="number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="9650XXXXXX"
            className="w-full border p-2 rounded-md my-2"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="******"
            className="w-full border p-2 rounded-md my-2"
          />

          {/* Role */}
          <div className="my-3">
            {["recruiter", "student"].map((role) => (
              <label key={role} className="mr-4">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>

          {/* File */}
          <input
            accept="image/*"
            type="file"
            onChange={changeFileHandler}
            className="my-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 rounded-xl text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-500"
            }`}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>

          <p className="text-center mt-2">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
      </motion.div>
    </div>
  );
};

export default Signup;


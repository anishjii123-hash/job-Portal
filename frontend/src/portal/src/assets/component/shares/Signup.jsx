

// import React, { useState, useCallback, lazy, Suspense } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../../redux/AuthSlice";
// import { motion } from "framer-motion";

// // ✅ Lazy Navbar (optional but good)
// const Navbar = lazy(() => import("./Navbar"));

// const Signup = () => {
//   const [input, setInput] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: null,
//   });

//   const { loading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ✅ optimized handlers
//   const changeEventHandler = useCallback((e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const changeFileHandler = useCallback((e) => {
//     setInput((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const formData = new FormData();
//     Object.entries(input).forEach(([key, value]) => {
//       if (value) formData.append(key, value);
//     });

//     try {
//       dispatch(setLoading(true));

//       const res = await axios.post(
//         `${USER_API_END_POINT}/register`,
//         formData,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div>
//          <Suspense fallback={null}>
//         <Navbar />
//       </Suspense>
//           <motion.div
//                          initial={{ opacity: 0, x: 60 }}
//                          animate={{ opacity: 1, x: 0 }}
//                          transition={{ duration: 0.3 }}
                        
//                        >
   

//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Sign Up</h1>

//           {/* Full Name */}
//           <input
//             type="text"
//             name="fullName"
//             value={input.fullName}
//             onChange={changeEventHandler}
//             placeholder="Anish Kumar Sharma"
//             className="w-full border p-2 rounded-md my-2"
//           />

//           {/* Email */}
//           <input
//             type="email"
//             name="email"
//             value={input.email}
//             onChange={changeEventHandler}
//             placeholder="anish@gmail.com"
//             className="w-full border p-2 rounded-md my-2"
//           />

//           {/* Phone */}
//           <input
//             type="number"
//             name="phoneNumber"
//             value={input.phoneNumber}
//             onChange={changeEventHandler}
//             placeholder="9650XXXXXX"
//             className="w-full border p-2 rounded-md my-2"
//           />

//           {/* Password */}
//           <input
//             type="password"
//             name="password"
//             value={input.password}
//             onChange={changeEventHandler}
//             placeholder="******"
//             className="w-full border p-2 rounded-md my-2"
//           />

//           {/* Role */}
//           <div className="my-3">
//             {["recruiter", "student"].map((role) => (
//               <label key={role} className="mr-4">
//                 <input
//                   type="radio"
//                   name="role"
//                   value={role}
//                   checked={input.role === role}
//                   onChange={changeEventHandler}
//                 />
//                 {role.charAt(0).toUpperCase() + role.slice(1)}
//               </label>
//             ))}
//           </div>

//           {/* File */}
//           <input
//             accept="image/*"
//             type="file"
//             onChange={changeFileHandler}
//             className="my-2"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full mt-4 py-2 rounded-xl text-white ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-700 hover:bg-green-500"
//             }`}
//           >
//             {loading ? "Please wait..." : "Sign Up"}
//           </button>

//           <p className="text-center mt-2">
//             Already have an account?
//             <Link to="/login" className="text-blue-500 ml-1">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useCallback, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/AuthSlice";

import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Upload } from "lucide-react";

// Lazy Navbar
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
    <div className="min-h-screen bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033]">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center px-4"
      >
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-[#1A0033] border border-gray-700 rounded-2xl p-8 mt-10 shadow-2xl text-white"
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-[#6A38C2]">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="mb-6 relative">
            <User className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
            <input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Full Name"
              className="w-full pl-14 pr-4 py-4 rounded-xl border border-gray-600 bg-[#12001F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6 relative">
            <Mail className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="w-full pl-14 pr-4 py-4 rounded-xl border border-gray-600 bg-[#12001F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6 relative">
            <Phone className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
            <input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Phone Number"
              className="w-full pl-14 pr-4 py-4 rounded-xl border border-gray-600 bg-[#12001F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <Lock className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full pl-14 pr-4 py-4 rounded-xl border border-gray-600 bg-[#12001F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
              required
            />
          </div>

          {/* Role */}
          <div className="flex justify-center gap-10 mb-6 text-lg">
            {["recruiter", "student"].map((role) => (
              <label key={role} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                  className="accent-[#6A38C2] w-5 h-5"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>

          {/* File */}
          <div className="mb-6 relative">
            <Upload className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
            <input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-600 bg-[#12001F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-2xl text-white font-bold text-lg flex justify-center items-center ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-600"
            }`}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-300 text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default React.memo(Signup);
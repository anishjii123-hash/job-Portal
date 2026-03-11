// // import React, { useState } from 'react';
// // import Navbar from './Navbar';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { toast } from 'sonner';
// // import axios from "axios";
// // import { USER_API_END_POINT } from "@/utils/constant";
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setLoading, setUser } from '../../../redux/AuthSlice';
// // const Login = () => {
// //   const [input, setInput] = useState({
// //     email: "",
// //     password: "",
// //     role: "",
// //   });
// //   const {loading} = useSelector(state=> state.auth);

// //      const navigate = useNavigate()
// //      const dispatch = useDispatch()
// //   const changeEventHandler = (e) => {
// //     setInput({...input, [e.target.name]: e.target.value });
// //   };

// // const onSubmit = async (e) => {
// //     e.preventDefault();
  
// //    try{
// //     dispatch(setLoading(true))
// //     const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
// //       headers:{
// //         "Content-Type":"application/json"
// //       },
// //       withCredentials:true
// //     })
    
// //     if(res.data.success){
// //       dispatch(setUser(res.data.user))
// //       navigate("/")
// //       toast.success(res.data.message)
// //     }
// //    }catch(error){
// //     console.log(error)
// //     toast.error(error.response?.data?.message)
// //    }
// //    finally{
// //     dispatch(setLoading(false))
// //    }
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="flex items-center justify-center max-w-7xl mx-auto cursor-pointer">
// //         <form
// //           onSubmit={onSubmit}
// //           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
// //         >
// //           <h1 className="font-bold text-xl mb-5">Login</h1>

          
// //           <div className="my-2">
// //             <label>Email</label>
// //             <input
// //               type="email"
// //               value={input.email}
// //               name="email"
// //               onChange={changeEventHandler}
// //               placeholder="anish@gmail.com"
// //               className="w-full border p-2 rounded-md mt-1"
// //             />
// //           </div>

        
// //           <div className="my-2">
// //             <label>Password</label>
// //             <input
// //               type="password"
// //               value={input.password}
// //               name="password"
// //               onChange={changeEventHandler}
// //               placeholder="XXXXXX"
// //               className="w-full border p-2 rounded-md mt-1"
// //             />
// //           </div>

        
// //           <div className="my-3">
// //             <label className="mr-4">
// //               <input
// //                 type="radio"
// //                 name="role"
// //                 value="recruiter"
// //                 checked={input.role === "recruiter"}
// //                 onChange={changeEventHandler}
// //               />
// //               Recruiter
// //             </label>

// //             <label className="ml-4">
// //               <input
// //                 type="radio"
// //                 name="role"
// //                 value="student"
// //                 checked={input.role === "student"}
// //                 onChange={changeEventHandler}
// //               />
// //               Student
// //             </label>
// //           </div>

        
    
// //     {
// //       <button
// //   type="submit"
// //   disabled={loading}
// //   className={`w-full m-4 py-2 rounded-xl text-white flex justify-center items-center ${
// //     loading
// //       ? "bg-gray-400 cursor-not-allowed"
// //       : "bg-green-700 hover:bg-green-500"
// //   }`}
// // >
// //   {loading ? "Please wait..." : "Login"}
// // </button>

// //     /* {loading ? 
// //       <Button className="w-full flex items-center justify-center gap-2 bg-gray-400 text-white py-2 rounded-xl">
// //         <Loader2 className="h-4 w-4 animate-spin" />
// //         Please wait...
// //       </Button>
// //      : 
// //       <button
// //         type="submit"
// //         className="w-full bg-green-700 text-white py-2 rounded-xl hover:bg-green-500"
// //       >
// //         Login
// //       </button>
// //     } */}
          
       
// //           <span className="w-full flex justify-center mt-2">
// //             Don’t have an account?{" "}
// //             <Link to="/signup" className="text-blue-500 hover:underline ml-1">
// //               Sign Up
// //             </Link>
// //           </span>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState, useCallback } from "react";
// import Navbar from "./Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "../../../redux/AuthSlice";

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });

//   const { loading } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = useCallback((e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const onSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       try {
//         dispatch(setLoading(true));

//         const res = await axios.post(
//           `${USER_API_END_POINT}/login`,
//           input,
//           {
//             headers: { "Content-Type": "application/json" },
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           dispatch(setUser(res.data.user));
//           toast.success(res.data.message);
//           navigate("/");
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Login failed");
//       } finally {
//         dispatch(setLoading(false));
//       }
//     },
//     [dispatch, input, navigate]
//   );

//   return (
//     <div>
//       <Navbar />
//         <motion.div
//                          initial={{ opacity: 0, x: 60 }}
//                          animate={{ opacity: 1, x: 0 }}
//                          transition={{ duration: 0.3 }}
                        
//                        >
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={onSubmit}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Login</h1>

//           {/* Email */}
//           <div className="my-2">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={changeEventHandler}
//               placeholder="anish@gmail.com"
//               className="w-full border p-2 rounded-md mt-1"
//               required
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
//               required
//             />
//           </div>

//           {/* Role */}
//           <div className="my-3">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 name="role"
//                 value="recruiter"
//                 checked={input.role === "recruiter"}
//                 onChange={changeEventHandler}
//               />{" "}
//               Recruiter
//             </label>

//             <label className="ml-4">
//               <input
//                 type="radio"
//                 name="role"
//                 value="student"
//                 checked={input.role === "student"}
//                 onChange={changeEventHandler}
//               />{" "}
//               Student
//             </label>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-xl text-white ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-700 hover:bg-green-500"
//             }`}
//           >
//             {loading ? "Please wait..." : "Login"}
//           </button>

//           {/* Signup link */}
//           <span className="w-full flex justify-center mt-3">
//             Don’t have an account?
//             <Link to="/signup" className="text-blue-500 ml-1 hover:underline">
//               Sign Up
//             </Link>
//           </span>
//         </form>
//       </div>

//        </motion.div>
//     </div>
   
//   );
// };

// export default React.memo(Login);

import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/AuthSlice";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        dispatch(setLoading(true));

        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          input,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, input, navigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033]">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center px-4"
      >
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md bg-[#1A0033] border border-gray-700 rounded-2xl p-8 mt-10 shadow-2xl text-white"
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-[#6A38C2]">
            Login
          </h1>

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
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="accent-[#6A38C2] w-5 h-5"
              />
              Recruiter
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="accent-[#6A38C2] w-5 h-5"
              />
              Student
            </label>
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
            {loading ? "Please wait..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-300 text-lg">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default React.memo(Login);
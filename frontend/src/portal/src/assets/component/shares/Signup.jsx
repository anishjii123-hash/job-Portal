

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
              autoComplete="username"
            value={input.fullName}
            onChange={changeEventHandler}
            placeholder="Anish Kumar Sharma"
            className="w-full border p-2 rounded-md my-2"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            autoComplete="email"
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
              autoComplete="new-password"

            value={input.password}
            onChange={changeEventHandler}
            placeholder="******"
            className="w-full border p-2 rounded-md my-2"
          />

          {/* Role */}
          <div className="my-3">
            {["recruiter", "student"].map((role) => (
              <label key={role} htmlFor={role} className="mr-4">
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


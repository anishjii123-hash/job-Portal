


import React, { useState, useCallback } from "react";
//import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/AuthSlice";

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
    <div>
  
        <motion.div
                         initial={{ opacity: 0, x: 60 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.3 }}
                        
                       >
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={onSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          {/* Email */}
          <div className="my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
                autoComplete="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="anish@gmail.com"
              className="w-full border p-2 rounded-md mt-1"
              required
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"

              value={input.password}
              onChange={changeEventHandler}
              placeholder="XXXXXX"
              className="w-full border p-2 rounded-md mt-1"
              required
            />
          </div>

          {/* Role */}
          <div className="my-3">
            <label htmlFor="role" className="mr-4">
              <input
                type="radio"
                name="role"
                id="recruiter"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />{" "}
              Recruiter
            </label>

            <label htmlFor="student" className="ml-4">
              <input
                type="radio"
                name="role"
                id="student"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />{" "}
              Student
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-500"
            }`}
          >
            {loading ? "Please wait..." : "Login"}
          </button>

          {/* Signup link */}
          <span className="w-full flex justify-center mt-3">
            Don’t have an account?
            <Link to="/signup" className="text-blue-500 ml-1 hover:underline">
              Sign Up
            </Link>
          </span>
        </form>
      </div>

       </motion.div>
    </div>
   
  );
};

export default React.memo(Login);


import React, { useCallback } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/assets/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/AuthSlice";

const Navbar = React.memo(() => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Logout Successfully");
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  }, [dispatch, navigate]);

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          Job.<span className="text-red-700 text-3xl">Portal</span>
        </Link>

        {/* NAV LINKS */}
        <nav>
          <ul className="flex items-center gap-6 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browser">Browser</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* AUTH */}
        {!user ? (
          <div className="flex gap-3">
            <Link to="/login">
              <Button className="bg-purple-700 hover:bg-purple-800">
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <img
                src={user?.profile?.profilePhoto || "/avatar.png"}
                alt="profile"
                loading="lazy"
                className="w-11 h-11 rounded-full border-2 border-gray-300"
              />
            </Popover.Button>

            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg p-3 z-50">
                <ul className="flex flex-col gap-2 text-gray-700">
                  {user?.role === "student" && (
                    <li className="hover:text-blue-600">
                      <Link to="/profile">View Profile</Link>
                    </li>
                  )}
                  <li
                    onClick={logoutHandler}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
      </div>
    </header>
  );
});

export default Navbar;

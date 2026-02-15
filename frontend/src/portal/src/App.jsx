import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./assets/component/shares/Navbar";

import Login from "./assets/component/shares/Login";
import Signup from "./assets/component/shares/Signup";
import Home from "./assets/component/Home";
import Jobs from "./assets/component/Jobs";
import Brower from "./assets/component/Brower";
import Profile from "./assets/component/Profile";
import Description from "./assets/component/Description";
import Companies from "./assets/component/Admin/Companies";
import CompaniesCreate from "./assets/component/Admin/CompaniesCreate";
import CompanySetUp from "./assets/component/Admin/CompanySetUp";
import AdminJobs from "./assets/component/Admin/AdminJobs";
import PostJob from "./assets/component/Admin/PostJob";
import Applicants from "./assets/component/Admin/Applicants";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/jobs",
//     element: <Jobs />,
//   },
//   {
//     path: "/discription/:jobId",
//     element: <Description />,
//   },
//   {
//     path: "/browser",
//     element: <Brower />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/admin/companies",
//     element: <Companies />,
//   },
//   {
//     path: "/admin/companies/create",
//     element: <CompaniesCreate />,
//   },
//   {
//     path: "/admin/companies/:id",
//     element: <CompanySetUp />,
//   },
//   {
//     path: "/admin/jobs",
//     element: <AdminJobs />,
//   },
//   {
//     path: "/admin/jobs/create",
//     element: <PostJob />,
//   },
//   {
//     path: "/admin/jobs/:jobId/applicants",
//     element: <Applicants />,
//   },
// ]);

// const App = () => {
//   return (
//     <div>
//       <RouterProvider router={appRouter} />
//     </div>
//   );
// };

// export default App;
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,  
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "jobs", element: <Jobs /> },
      { path: "discription/:jobId", element: <Description /> },
      { path: "browser", element: <Brower /> },
      { path: "profile", element: <Profile /> },
      { path: "admin/companies", element: <Companies /> },
      { path: "admin/companies/create", element: <CompaniesCreate /> },
      { path: "admin/companies/:id", element: <CompanySetUp /> },
      { path: "admin/jobs", element: <AdminJobs /> },
      { path: "admin/jobs/create", element: <PostJob /> },
      { path: "admin/jobs/:jobId/applicants", element: <Applicants /> },
    ],
  },

]);
 const App = () => {
   return (
     <div>
       <RouterProvider router={appRouter} />
     </div>
   );
 };
export default App;


import React, { useEffect, lazy, Suspense } from "react";
import HeroSection from "./HeroSection";
const CategoryCarousel = lazy(()=> import("./CategoryCarousel"));
const LatestJobs = lazy(()=>import("./LatestJobs"));
 const Footer = lazy(()=> import("./Footer"));
import useGetAllJobs from "./../../hooks/useGetAllJobs";

//import React, {useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      
      <HeroSection />
      <Suspense fallback={<p className="text-center mt-4">Loading content...</p>}>
      <CategoryCarousel />
      </Suspense>
       <Suspense fallback={<p className="text-center mt-4">Loading content...</p>}> 
      <LatestJobs />
      </Suspense>
      <Suspense fallback={<p className="text-center mt-4">Loading content...</p>}>
         <Footer />
      </Suspense>
    
    </div>
  );
};

export default Home;

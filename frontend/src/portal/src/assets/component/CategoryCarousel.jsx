// import React from "react";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
// import { Button } from "../ui/button";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "@/redux/jobsSlice";
// import { useNavigate } from "react-router-dom";



// const category = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Science",
//   "DevOps Engineer",
//   "Full Stack Developer",
//   "Mobile App Developer",
//   "UI/UX Designer",
//   "Product Manager",
//   "QA Engineer",
//   "Cybersecurity Specialist",
// ];

// const CategoryCarousel = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate();
//    const searchHandler = (searchText) => {
//       dispatch(setSearchQuery(searchText))
//       navigate("/browser")

//    }
  

//   return (
//     <>
//     <Carousel className="w-full max-w-xl mx-auto my-20 ">
//       <CarouselContent>
//         {category.map((cat, index) => (
//           <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
//             <Button variant="outline" className="w-full rounded-full " onClick={() => searchHandler(cat)}>{cat}</Button>

//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious/>
//         <CarouselNext/>
//     </Carousel>
//     </>
//   );
// };

// export default CategoryCarousel;

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobsSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "DevOps Engineer",
  "Full Stack Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Product Manager",
  "QA Engineer",
  "Cybersecurity Specialist",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (searchText) => {
    dispatch(setSearchQuery(searchText));
    navigate("/browser");
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-center text-[#6A38C2] mb-8">
        Explore Job Categories
      </h2>

      <Carousel className="relative">
        <CarouselContent className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex-none w-48 sm:w-56 md:w-60 snap-start"
            >
              <Button
                variant="outline"
                className="w-full rounded-full bg-[#12001F] text-white hover:bg-[#6A38C2] transition-all"
                onClick={() => searchHandler(cat)}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
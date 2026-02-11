import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
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
  const dispatch = useDispatch()
  const navigate = useNavigate();
   const searchHandler = (searchText) => {
      dispatch(setSearchQuery(searchText))
      navigate("/browser")

   }
  

  return (
    <>
    <Carousel className="w-full max-w-xl mx-auto my-20 ">
      <CarouselContent>
        {category.map((cat, index) => (
          <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
            <Button variant="outline" className="w-full rounded-full " onClick={() => searchHandler(cat)}>{cat}</Button>

          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
    </>
  );
};

export default CategoryCarousel;


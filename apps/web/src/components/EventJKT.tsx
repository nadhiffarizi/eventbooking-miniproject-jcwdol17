"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const EventJKT: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="carousel w-full relative overflow-hidden rounded-lg ">
      <div
        className={`carousel-item relative w-full flex transition-transform duration-1000 ease-in-out transform`}
        style={{
          transform: `translateX(-${(currentSlide - 1) * 100}%)`,
        }}
      >
        <div className="flex w-full">
          <div id="slide1" className="w-full flex-shrink-0">
            <img
              src="https://cdn.pixabay.com/photo/2014/02/21/12/23/human-271221_1280.jpg"
              alt="Slide 1"
              className="w-full"
              width={1920}
              height={1080}
            />
          </div>
          <div id="slide2" className="w-full flex-shrink-0">
            <img
              src="https://cdn.pixabay.com/photo/2014/02/21/12/23/human-271221_1280.jpg"
              alt="Slide 2"
              className="w-full"
              width={1920}
              height={1080}
            />
          </div>
          <div id="slide3" className="w-full flex-shrink-0">
            <img
              src="https://cdn.pixabay.com/photo/2014/02/21/12/23/human-271221_1280.jpg"
              alt="Slide 3"
              className="w-full"
              width={1920}
              height={1080}
            />
          </div>
          <div id="slide4" className="w-full flex-shrink-0">
            <img
              src="https://cdn.pixabay.com/photo/2014/02/21/12/23/human-271221_1280.jpg"
              alt="Slide 4"
              className="w-full"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventJKT;

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
          transform: `translateX(-${(currentSlide - 1) * 100}%)`
        }}>
        <div className="flex w-full">
          <div id="slide1" className="w-full flex-shrink-0">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
              alt="Slide 1"
              className="w-full"
              layout="responsive"
              width={1920}
              height={1080}
            />
          </div>
          <div id="slide2" className="w-full flex-shrink-0">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
              alt="Slide 2"
              className="w-full"
              layout="responsive"
              width={1920}
              height={1080}
            />
          </div>
          <div id="slide3" className="w-full flex-shrink-0">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
              alt="Slide 3"
              className="w-full"
              layout="responsive"
              width={1920}
              height={1080}
            />
          </div>
          <div id="slide4" className="w-full flex-shrink-0">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
              alt="Slide 4"
              className="w-full"
              layout="responsive"
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

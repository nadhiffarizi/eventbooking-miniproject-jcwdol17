import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="hero bg-[#f9f9f9] h-[60vh] rounded-[80%] shadow-2xl pt-8 px-4 py-8 lg:py-12">
      <div className="hero-content flex-col lg:flex-row items-center lg:items-start text-center lg:text-left">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Top Event"
          className="max-w-sm rounded-lg shadow-2xl"
          width={500}
          height={600}
        />
        <div className="mt-6 lg:mt-0 lg:ml-10">
          <h1 className="text-3xl lg:text-5xl font-bold">Event of The Year</h1>
          <p className="py-4 lg:py-6">
            Get ready for the event that will shake up the year! Vitae Ceremony
            is the pinnacle of excitement, innovation, and entertainment.
            Featuring outstanding performances, interactive activities, and
            captivating experiences, this event is designed to leave
            unforgettable memories.
          </p>
          <Link href="/transaction">
            <button className="btn btn-primary text-lg lg:text-xl">
              Buy Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

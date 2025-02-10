// pages/index.tsx

import React from "react";
import HeroEvents from "../events/HeroEvents";
import Link from "next/link";
const Events: React.FC = () => {
  return (
    <div className="container mx-auto px-auto pt-4 bg-white">
      <h1 className="text-3xl font-bold text-black justify-center items-center flex">
        Create Your Own Event on Vitae!
      </h1>
      <Link className="flex mt-4 pt-4 justify-center" href="/events/create">
        <button className="border hover:scale-110 transition duration-300 ease-in-out hover:text-white text-black bg-primary py-2 px-4 rounded flex justify-center items-center">
          Create New Event
        </button>
      </Link>
      <HeroEvents />
    </div>
  );
};

export default Events;

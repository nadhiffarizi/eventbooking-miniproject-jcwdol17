// pages/index.tsx
import React from "react";
import HeroEvents from "../events/HeroEvents";
const Home: React.FC = () => {
  return (
    <div className="container mx-auto bg-[#fc9247]">
      <HeroEvents />
    </div>
  );
};

export default Home;

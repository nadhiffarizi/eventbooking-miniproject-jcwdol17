"use client";
import Event from "../components/Event";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import EventJKT from "@/components/EventJKT";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto bg-gray-200 text-black ">
      <Hero />
      <Event />
      <div className="rounded-full text-white py-8">
        <Categories />
      </div>
      <EventJKT />
      <Footer />
    </div>
  );
};

export default Home;

"use client";
"use client";
import { signOut, useSession } from "next-auth/react";
import Event from "../components/Event";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EventJKT from "@/components/EventJKT";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const router = useRouter();
  const { data: sesssion } = useSession();

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

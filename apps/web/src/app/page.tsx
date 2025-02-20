"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Event from "../components/Event";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import EventJKT from "@/components/EventJKT";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/review-card";
import FeedbackForm from "@/components/UI-Components/feedback";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home: React.FC = () => {
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);
  const router = useRouter();
  const { data: sesssion } = useSession();
  return (
    <div className="container mx-auto bg-gray-200 text-black">
      <Hero />
      <Event />
      <EventJKT />
      <ReviewCard />
      {hasPurchased && <FeedbackForm />}

      <Footer />
    </div>
  );
};

export default Home;

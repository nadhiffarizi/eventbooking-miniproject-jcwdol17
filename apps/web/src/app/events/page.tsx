"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import HeroEvents from "../events/HeroEvents";
import Link from "next/link";
import { serverHost } from "@/config";

const Events: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session?.user.role === "organizer") {
        // try {
        //   const res = await fetch(`${serverHost}api/event/get`, {
        //     method: "GET"
        //     // credentials: "include"
        //   });
        //   const data = await res.json();
        //   setUserRole(data.first_name);
        // } catch (error) {
        //   console.error("Error fetching user role:", error);
        // }
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="container mx-auto px-auto pt-4 bg-white">
      {userRole === "organizer" && (
        <Link className="flex mt-4 pt-4 justify-center" href="/events/create">
          <button className="border hover:scale-110 transition duration-300 ease-in-out hover:text-white hover:bg-blue-500 text-black bg-primary py-2 px-4 rounded flex justify-center items-center">
            Create New Event
          </button>
        </Link>
      )}
      <HeroEvents />
    </div>
  );
};

export default Events;

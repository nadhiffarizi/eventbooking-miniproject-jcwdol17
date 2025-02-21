"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { serverHost } from "@/config";

interface Event {
  id: number;
  event_name: string;
  image_url: string;
  description: string;
  price: number;
  total?: number;
  subtotal?: number;
}

const Hero: React.FC = () => {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${serverHost}api/event/get`, {
          method: "GET"
        });
        const data = await res.json();
        setEvent(data["data"][0]);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    if (event) {
      setTickets([
        {
          id: event.id,
          event_name: event.event_name,
          price: event.price,
          image_url: event.image_url,
          description: event.description
        }
      ]);
    }
  }, [event]);

  const handleGetTickets = () => {
    const ticketString = encodeURIComponent(JSON.stringify(tickets));
    router.push(`/payment/${event?.id}`);
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="relative bg-gradient-to-r from-yellow-300 to-red-500 h-[70vh] rounded-[70%] shadow-2xl flex items-center justify-center px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl items-center">
        <div className="flex justify-center">
          <img
            src={
              event.image_url ||
              "https://cdn.pixabay.com/photo/2023/04/03/12/59/crowd-7896788_1280.jpg"
            }
            alt={event.event_name}
            className="rounded-2xl shadow-xl"
            width={300}
            height={150}
          />
        </div>

        <div className="text-center lg:text-left text-white">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            {event.event_name}
          </h1>
          <p className="py-4 lg:py-6 text-lg lg:text-xl">
            Get ready for an event that will redefine excitement!
          </p>
          <button
            onClick={handleGetTickets}
            className="mt-4 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg text-lg lg:text-xl shadow-md hover:bg-red-100 transition-all">
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

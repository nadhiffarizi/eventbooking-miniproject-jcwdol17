// import { products } from "@/data";
import Image from "next/image";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { serverHost } from "@/config";

interface Event {
  id: number;
  event_name: string;
  image_url: string;
  description: string;
}

const Event: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${serverHost}api/event/get`, {
          method: "GET",
        });
        const data = await res.json();
        setEvents(data["data"]);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col border-b mt-4">
      <header className="flex items-center justify-between px-4 py-2 text-xl font-bold underline">
        <span>Ongoing Events</span>
      </header>
      <section className="section-event overflow-x-auto py-4 mt-4">
        <div className="flex gap-4">
          {events.map((event) => (
            <Link
              href={`/event-detail/${event.id}`}
              key={event.id}
              className="min-w-[250px]"
            >
              <div className="card bg-white shadow-xl">
                <figure>
                  <img
                    src={
                      event.image_url ||
                      "https://cdn.pixabay.com/photo/2023/04/03/12/59/crowd-7896788_1280.jpg"
                    }
                    width={250}
                    height={200}
                    alt={event.event_name}
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg text-black font-semibold">
                    {event.event_name}
                  </h2>
                  <p className="text-sm mt-2 text-black">{event.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Event;

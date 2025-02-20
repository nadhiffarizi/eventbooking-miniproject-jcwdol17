"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { serverHost } from "@/config";

interface Event {
  id: number;
  event_name: string;
  image_url: string;
  description: string;
  location: string;
}

const Event: React.FC = () => {
  const { data: session } = useSession();
  const isOrganizer = session?.user?.role === "organizer";

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${serverHost}api/event/get`, {
          method: "GET",
        });
        const data = await res.json();

        if (data && data.data) {
          setEvents(data.data);
          setFilteredEvents(data.data);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query =
        new URLSearchParams(window.location.search).get("search") || "";
      setSearchQuery(query);
    }
  }, []);

  useEffect(() => {
    const filtered = searchQuery
      ? events.filter((event) =>
          event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : events;

    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const location = event.target.value;
    setSelectedLocation(location);

    const filtered = location
      ? events.filter((event) => event.location === location)
      : events;

    setFilteredEvents(filtered);
  };

  const locations = Array.from(new Set(events.map((event) => event.location)));

  return (
    <div className="flex flex-col border-b mt-4">
      <header className="flex items-center justify-between px-4 py-2 text-xl font-bold underline">
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="ml-4 p-2 border rounded"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Hanya organizer yang bisa melihat tombol "Create Event" */}
        {isOrganizer && (
          <Link href="/createevent">
            <button className="p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              + Create Event
            </button>
          </Link>
        )}
      </header>

      <section className="section-event overflow-x-auto py-4 mt-4">
        <div className="flex gap-4">
          {filteredEvents.map((event) => (
            <Link
              href={`/eventdetail/${event.id}`}
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
                    className="object-cover"
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

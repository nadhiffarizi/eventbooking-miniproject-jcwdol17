"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { serverHost } from "@/config";
import Link from "next/link";

interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  date: string;
  price: number;
  speakers: string; // 🔹 Ubah ke string
}

const EventDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id ? String(params.id) : "";

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${serverHost}api/event/eventdetail/${eventId}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching event: ${response.statusText}`);
        }
        const data = await response.json();

        setEvent({ ...data.data, speakers: data.data.speaker || "No speaker" }); // 🔹 Pastikan speaker adalah string
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleGetTickets = () => {
    const tickets = [{ id: event?.id, name: event?.name, price: event?.price }];
    const ticketsString = JSON.stringify(tickets);
    router.push(`/payment?tickets=${encodeURIComponent(ticketsString)}`);
  };

  if (loading)
    return (
      <p className="text-gray-600 text-lg text-center">
        Loading event details...
      </p>
    );
  if (error)
    return <p className="text-red-500 text-lg text-center">Error: {error}</p>;
  if (!event)
    return (
      <p className="text-orange-500 text-lg text-center">No event found.</p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800">{event.name}</h1>

        <img
          src={
            event.image ||
            "https://cdn.pixabay.com/photo/2023/04/03/12/59/crowd-7896788_1280.jpg"
          }
          alt={event.name}
          className="w-full h-64 object-cover rounded-lg mt-4"
        />

        <p className="text-gray-600 mt-4">{event.description}</p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">
            📍 <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-700">
            📅 <strong>Date:</strong> {event.date}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            💲{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(event.price)}
          </p>
        </div>

        {/* Speaker dari database */}
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-800">🎤 Speaker</h2>
          <p className="text-gray-700">{event.speakers}</p>{" "}
          {/* 🔹 Langsung tampilkan sebagai teks */}
        </div>

        <button
          onClick={handleGetTickets}
          className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
          Get Tickets
        </button>

        <Link
          href="/events"
          className="block text-center mt-4 text-blue-500 hover:underline">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetail;

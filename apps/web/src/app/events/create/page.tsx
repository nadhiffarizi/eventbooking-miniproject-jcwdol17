"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/UI-Components/card";
import { CardContent } from "@/components/UI-Components/cardContent";
import { Button } from "@/components/UI-Components/button";
import { Input } from "@/components/UI-Components/input";
import { Textarea } from "@/components/UI-Components/textArea";
import { Calendar } from "@/components/UI-Components/calendar";
import { Select } from "@/components/UI-Components/select";
import { SelectItem } from "@/components/UI-Components/SelectItem";

const CreateEvents: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEventCreated, setIsEventCreated] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "organizer") {
      router.push("/");
    }
  }, [session, status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEventCreated(true);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardContent>
          <h1 className="text-2xl text-blue-600 font-bold mb-4 underline text-center">
            Create a New Event
          </h1>

          {isEventCreated && (
            <div className="mb-4 p-4 text-black bg-green-500 rounded-lg text-center">
              Event successfully created!
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-2">
                Event Name
              </label>
              <Input
                type="text"
                placeholder="Enter event name"
                className="w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 text-sm font-medium mb-2">
                  Start Date
                </label>
                <Calendar
                  placeholder="Select start date"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 text-sm font-medium mb-2">
                  End Date
                </label>
                <Calendar
                  placeholder="Select end date"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2">
                Price
              </label>
              <Input
                type="number"
                placeholder="Enter price"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2">
                Available Seats
              </label>
              <Input
                type="number"
                placeholder="Enter available seats"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                placeholder="Write a short description about the event"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2">
                Ticket Types
              </label>
              <Select className="w-full">
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="standard-vip">Standard & VIP</SelectItem>
              </Select>
            </div>

            <div className="text-center">
              <Button className="w-full" type="submit">
                Create Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvents;

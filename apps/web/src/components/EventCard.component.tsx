import { ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import EventAttendeeModal from "./EventAttendeeModal.component";
import { IEventData } from "@/app/admin/events/page";

export default function EventCard({ eventData }: { eventData: IEventData }) {
  const eventSlug = "blablabla";
  return (
    <div className="w-full h-2/5 lg:max-h-[100px]  px-5 py-5 rounded-md ring-2 ring-red-100 bg-white">
      <div className="w-full h-1/2 flex items-start">
        {" "}
        <h1 className="text-lg font-semibold">
          {eventData.event_name.toUpperCase()}
        </h1>
      </div>
      <div className="flex flex-row justify-between w-full h-1/2 ">
        <div className="grid grid-cols-3 w-5/6 h-full">
          <div className="col-span-1 flex items-end w-full h-full">
            <p className="text-xs font-semibold">
              Seats Booked: {eventData.capacity - eventData.seat_available}
            </p>
          </div>
          <div className="col-span-1 flex items-end w-full h-full">
            <p className="text-xs font-semibold">
              Time: {eventData.date.split("T")[0]}{" "}
            </p>
          </div>
          <div className="col-span-1 flex items-end w-full h-full ">
            <p className="text-xs font-semibold">
              Payments Verified: {eventData.Transaction.length}
            </p>
          </div>
        </div>
        <div className="flex justify-end w-1/6 h-full ">
          <div className="  flex justify-center h-full text-sm font-semibold ">
            <EventAttendeeModal slug={eventData.slug} />
          </div>

          <Link href={`/admin/events/${eventData.slug}`}>
            <button className="  flex justify-center h-full text-sm font-semibold ">
              <ArrowRight className=" w-5/6 h-full stroke-slate-500 hover:stroke-red-500" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

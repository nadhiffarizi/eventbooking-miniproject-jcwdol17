import { ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import EventAttendeeModal, { IAttendee } from "./EventAttendeeModal.component";

export default function AttedeeCard({ attendee }: { attendee: IAttendee }) {
  return (
    <div className="w-full h-full  px-5 py-2 rounded-md ring-2 ring-slate-200 bg-white">
      <div className="grid grid-cols-5 w-full h-full">
        {" "}
        <div className="col-span-1 w-full h-full">
          <div className="max-w-[55px] h-full">
            <img
              src={
                attendee.customer.image_url
                  ? attendee.customer.image_url
                  : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
              }
              className="h-full object-cover rounded-full ring-2"
            />
          </div>
        </div>
        <div className="col-span-2 w-full h-full ">
          <div className="flex flex-col w-full h-full">
            <div className="w-full h-1/2 ">
              <p className="text-sm">
                {attendee.customer.first_name.toUpperCase()}{" "}
                {attendee.customer.last_name.toLocaleUpperCase()}
              </p>
            </div>
            <div className="w-full h-1/2 ">
              <p className="text-sm">{attendee.customer.email.toLowerCase()}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full h-full ">
          <div className="flex flex-col w-full h-full">
            <div className="w-full h-1/2 ">
              <p className="text-sm">Amount: {attendee.amount}</p>
            </div>
            <div className="w-full h-1/2 ">
              <p className="text-sm">Seat reserved: 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//    <p className="text-sm font-semibold">Payment proof: Available/Not </p>
//           <p className="text-sm font-semibold">Registrant: </p>

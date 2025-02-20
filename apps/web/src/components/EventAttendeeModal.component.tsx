"use client";
import * as React from "react";
import { Session, User } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardList } from "lucide-react";
import AttedeeCard from "./AttendeeCard.component";
import { useEffect, useState } from "react";
import { getRegistrantList } from "@/helper/event/event.helper";
import { useSession } from "next-auth/react";

export interface IAttendee {
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    image_url: string;
    email: string;
  };
  amount: number;
}

export default function EventAttendeeModal({ slug }: { slug: string }) {
  // session
  const { data: session } = useSession();
  // for attendee data
  const [attendee, setAttendee] = useState<IAttendee[]>([]);

  // get participant data
  useEffect(() => {
    const res = getRegistrantList(session?.user.accessToken!, slug);
    // res.then((d) => console.log(d["data"]));
    res.then((r) => {
      // console.log(r["data"]);
      setAttendee(r["data"]);
    });
  }, []);

  return (
    <div className="w-full h-full flex justify-end ">
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-transparent">
            <ClipboardList className=" w-full h-full stroke-slate-500 hover:stroke-red-500" />
          </button>
          {/* <Button variant="outline"></Button> */}
        </DialogTrigger>
        <DialogContent className="lg:max-w-[600px] sm:max-w-[425px] lg:h-[650px] ">
          <DialogHeader className=" flex flex-col gap-2 justify-center px-5">
            <DialogTitle>Attendee List</DialogTitle>
            <DialogDescription>
              Please review the attendee list to verify participant details.
              Click "Done" when you're finished.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 w-full h-[420px] overflow-auto px-5 py-5 ">
            {attendee.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center text-xl">
                {" "}
                You have no confirmed attendee
              </div>
            ) : (
              attendee.map((a: IAttendee, index: number) => {
                return (
                  <div className="w-full h-[70px]" key={index}>
                    <AttedeeCard attendee={a} key={index} />
                  </div>
                );
              })
            )}
          </div>
          <DialogFooter className="flex justify-end items-center ">
            <DialogClose asChild>
              <Button className="w-[100px] hover:bg-slate-500 bg-black text-white">
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

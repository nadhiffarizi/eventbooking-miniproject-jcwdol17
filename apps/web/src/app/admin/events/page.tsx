"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import EventCard from "@/components/EventCard.component";
import {
  getEventManageList,
  getTotalEventPage,
} from "@/helper/event/event.helper";

export interface IEventData {
  id: number;
  event_name: string;
  date: string;
  capacity: number;
  seat_available: number;
  slug: string;
  Transaction: Array<any>;
}

export default function Events() {
  const { data: session, update, status } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  let submitted = false;
  const [previousPage, setPreviousPage] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<boolean>(true);
  const { push } = useRouter();

  // for pagination
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const pathName = usePathname();
  const [btnTrigger, setBtnTrigger] = useState<boolean>(false);

  // for event Data
  const [events, setEvents] = useState<IEventData[]>([]);
  // get user data
  useEffect(() => {
    if (status === "authenticated") {
      // get total page
      const totalPageReq = getTotalEventPage(
        session.user.accessToken,
        session.user
      );

      totalPageReq.then((r) => setTotalPage(r["data"]["totalPage"]));

      // // config pagination
      const params = new URLSearchParams();
      if (currPage < 1) {
        setCurrPage(1);
        params.set("page", String(currPage));
        push(pathName + "?" + params.toString());
      } else if (currPage > totalPage) {
        setCurrPage(totalPage);

        params.set("page", String(currPage));
        push(pathName + "?" + params.toString());
      } else {
        params.set("page", String(currPage));
        push(pathName + "?" + params.toString());

        // call transaction data with limit
        const res = getEventManageList(
          session.user.id,
          session?.user.accessToken!,
          (currPage - 1) * 4,
          4
        );
        // res.then((d) => console.log(d["data"]));
        res.then((r) => {
          // console.log(r["data"]);

          setEvents(r["data"]);
        });
      }
    }
    console.log("status now: ", status);
  }, [status, currPage, btnTrigger]);

  return (
    <div className="flex justify-center items-center w-screen py-6 ">
      <div className="w-3/5 h-[650px] bg-white">
        <div className="w-full h-full py-10 px-20 shadow-md rounded-lg ring-slate-200 ring-2  bg-white">
          <div className="w-full h-[40px] ">
            <h1 className="text-lg text-red-500 font-semibold">
              Manage Your Events
            </h1>
          </div>
          <div className="flex flex-col gap-3 w-full lg:h-[450px] ">
            {events.map((e: IEventData, index: number) => {
              return <EventCard eventData={e} key={index} />;
            })}
          </div>

          <div className="group-hover:stroke-red-600 group-hover:text-red-500 flex justify-end items-center w-full h-[100px] ">
            {previousPage && (
              <Button
                onClick={() => setCurrPage(currPage - 1)}
                type="submit"
                className="bg-transparent hover:bg-transparent hover:text-red-500 rounded-none  min-w-[100px] w-[100px] h-[40px] text-lg text-black text-opacity-70"
              >
                <ArrowLeftIcon className="stroke-black" />
                Previous
              </Button>
            )}
            {nextPage && (
              <Button
                onClick={() => setCurrPage(currPage + 1)}
                type="submit"
                className="bg-transparent hover:grou hover:bg-transparent hover:text-red-500 rounded-none  min-w-[100px] w-[100px] h-[40px] text-lg text-black text-opacity-70"
              >
                Next
                <ArrowRightIcon className=" stroke-black" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { CheckIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import TransactionDetailModal from "./TransactionDetailModal.component";
import { btnContext, ITrxData } from "@/app/admin/transactions/page";
import { acceptTrx, rejectTrx } from "@/helper/transactions/transaction.helper";
import { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { serverHost } from "@/config";

export default function TransactionCard({ trxData }: { trxData: ITrxData }) {
  // var states
  const { data: session, update, status } = useSession();
  const { push, refresh, replace } = useRouter();
  const param = useSearchParams();
  const page = param?.get("page");
  const [btnTrigger, setBtnTrigger] = useState<boolean>(false);
  const [trxstatus, setTrxStatus] = useState<string>();

  const refreshStatusTrx = async () => {
    const res = await fetch(serverHost + `api/transaction/${trxData.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

    const r = res.json();
    r.then((x) => setTrxStatus(x["data"]["payment_status"]));
    push(window.location.pathname + "?" + "page=" + page);
  };

  useEffect(() => {
    setTrxStatus(trxData.payment_status);
    console.log(trxstatus);
  }, []);

  return (
    <div className="w-full h-2/5 lg:max-h-[100px]  px-5 py-5 rounded-md ring-2 ring-red-100 bg-white">
      <div className="w-full h-1/2 flex items-start">
        {" "}
        <h1 className="text-lg font-semibold">
          {trxData.event.event_name.toUpperCase()}
        </h1>
      </div>
      <div className="flex flex-row justify-between w-full h-1/2 ">
        <div className="grid grid-cols-2 w-3/4 h-full">
          <div className="col-span-1 flex items-end w-full h-full">
            <p className="text-sm font-semibold">
              Booked time: {trxData.booked_time.split("T")[0]}
            </p>
          </div>
          <div className="col-span-1 flex items-end w-full h-full">
            <p className="text-sm  font-semibold">
              Status: <span className="text-blue-500"> {trxstatus}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between w-1/4 h-full ">
          {trxstatus === "WAITING ADMIN" ? (
            <div className="w-1/3 h-full flex justify-end ">
              <button
                onClick={async () => {
                  await rejectTrx(session?.user.accessToken, trxData.id);
                  refreshStatusTrx();

                  // console.log(param?.get("page"));
                }}
                className="  h-full hover:bg-red-600 text-sm font-semibold bg-red-400 rounded-md"
              >
                <XMarkIcon className=" h-full stroke-white" />
              </button>
            </div>
          ) : (
            <div className="w-1/3 h-full flex justify-end "></div>
          )}

          <div className="w-1/3 h-full flex justify-end ">
            <TransactionDetailModal
              trxData={trxData}
              refreshData={refreshStatusTrx}
            />
          </div>

          {trxstatus === "WAITING ADMIN" ? (
            <div className="w-1/3 h-full flex justify-end">
              <button
                onClick={async () => {
                  await acceptTrx(session?.user.accessToken, trxData.id);
                  refreshStatusTrx();
                }}
                className="  flex hover:bg-green-600 justify-center h-full text-sm font-semibold bg-green-400 rounded-md"
              >
                <CheckIcon className=" w-5/6 h-full stroke-white" />
              </button>
            </div>
          ) : (
            <div className="w-1/3 h-full flex justify-end"></div>
          )}
        </div>
      </div>
    </div>
  );
}

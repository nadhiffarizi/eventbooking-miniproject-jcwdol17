"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Formik, useFormik, validateYupSchema } from "formik";
import { useRef, useState } from "react";
import * as React from "react";
import { useEffect, useContext, createContext } from "react";
import { getUserInfo } from "@/helper/profile/getUser.helper";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TransactionCard from "@/components/TransactionCard.component";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  getPendingTrx,
  getPendingTrxTotalPage,
} from "@/helper/transactions/transaction.helper";
import { Dispatch, SetStateAction } from "react";
import { string } from "yup";

export interface ITrxData {
  amount: number;
  booked_time: string;
  customer: {
    first_name: string;
  };
  event: {
    event_name: string;
  };
  payment_proof_link: string | null;
  payment_status: string;
  id: number;
}

export interface ITrxStatus {
  btnStatus: number; // -1 for reject, 0 for waiting payment, 1 for accepted payment
}

// use context for btn trigger
export const btnContext = React.createContext(undefined as any);

export default function Transactions() {
  const { data: session, update, status } = useSession();
  const [btnTrigger, setBtnTrigger] = useState(false);
  const [userData, setUserData] = useState<ITrxData>();
  const [previousPage, setPreviousPage] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<boolean>(true);
  const { push } = useRouter();

  // for pagination
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const pathName = usePathname();

  // for trx Data
  const [trx, setTrx] = useState<ITrxData[]>([]);
  const [refreshState, setRefresh] = useState<boolean>(false);

  // get user data
  useEffect(() => {
    if (status === "authenticated") {
      // get total page
      const totalPageReq = getPendingTrxTotalPage(
        session.user.accessToken,
        session.user
      );

      totalPageReq.then((r) => {
        console.log(r["data"]["totalPage"]);
        setTotalPage(r["data"]["totalPage"]);
      });

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
        const res = getPendingTrx(
          session.user.id,
          session?.user.accessToken!,
          (currPage - 1) * 4,
          4
        );
        // res.then((d) => console.log(d["data"]));
        res.then((r) => {
          console.log(r["data"]);

          setTrx([...r["data"]]);
        });
      }
    }
    console.log("status now: ", status);
  }, [status, currPage, refreshState]);

  return (
    <div className="flex justify-center items-center w-screen py-6 ">
      <div className="w-3/5 h-[650px] bg-white">
        <div className="w-full h-full py-10 px-20 shadow-md rounded-lg ring-slate-200 ring-2  bg-white">
          <div className="w-full h-[40px] ">
            <h1 className="text-lg text-red-500 font-semibold">
              Manage Your Transactions
            </h1>
          </div>
          <div className="flex flex-col gap-3 w-full lg:h-[450px] ">
            {trx.map((t: ITrxData, index: number) => {
              return <TransactionCard trxData={t} key={index} />;
            })}
          </div>

          <div className="group-hover:stroke-red-600 group-hover:text-red-500 flex justify-end items-center w-full h-[100px] ">
            {previousPage && (
              <Button
                onClick={() => {
                  setCurrPage(currPage - 1);
                  setRefresh(!refreshState);
                }}
                type="submit"
                className="bg-transparent hover:bg-transparent hover:text-red-500 rounded-none  min-w-[100px] w-[100px] h-[40px] text-lg text-black text-opacity-70"
              >
                <ArrowLeftIcon className="stroke-black" />
                Previous
              </Button>
            )}
            {nextPage && (
              <Button
                onClick={() => {
                  setCurrPage(currPage + 1);
                  setRefresh(!refreshState);
                }}
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

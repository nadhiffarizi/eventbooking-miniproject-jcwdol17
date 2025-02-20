"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Formik, useFormik, validateYupSchema } from "formik";
import { useRef, useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { getUserInfo } from "@/helper/profile/getUser.helper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BarchartComponent } from "@/components/Barchart.component";
import { PieChartComponent } from "@/components/PieChart.component";

interface IUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  referral_code: string;
  point_balance?: number;
  point_expired_date?: Date | null | string;
  coupon?: number;
  coupon_expired?: Date | null | string;
}

export default function Dashboard() {
  const { data: session, update, status } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  let submitted = false;
  const [userData, setUserData] = useState<IUserProfile>();
  const { push } = useRouter();

  // get user data
  useEffect(() => {
    if (status === "authenticated") {
      // call data
      const res = getUserInfo(session?.user.accessToken!);
      res.then((d) => console.log(d["data"]));
      res.then((r) => {
        const tempData: IUserProfile = {
          first_name: r["data"]["first_name"],
          last_name: r["data"]["last_name"],
          email: r["data"]["email"],
          referral_code: r["data"]["referral_code"],
          coupon: r["data"]["coupon"],
          coupon_expired: r["data"]["coupon_expired"],
          point_balance: r["data"]["point_balance"],
          point_expired_date: r["data"]["point_expired_date"],
        };

        setUserData(tempData);
      });
    }

    console.log("status now: ", status);
  }, [status, submitted]);

  return (
    <div className="flex justify-center items-center w-screen py-6 ">
      <div className="w-3/5 h-5/6 max-h-[700px] ">
        <div className="flex flex-col gap-3 w-full h-full py-7 px-24 shadow-md rounded-lg ring-slate-200 ring-2 bg-white">
          <div className="w-full h-[40px] ">
            <h1 className="text-lg text-red-500 font-semibold">
              {String(session?.user.first_name).substring(0, 1).toUpperCase() +
                String(session?.user.first_name).substring(1)}
              's Dashboard
            </h1>
          </div>
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-row gap-4 items-center w-full h-[150px]">
              <div className="w-1/3 h-full bg-white ring-2 ring-blue-200 rounded-lg shadow-md flex flex-col py-10 px-7">
                <div className="w-full h-1/2">
                  <h1 className="text-xl font-semibold text-red-500">
                    Events Created
                  </h1>
                </div>
                <div className="w-full h-1/2">
                  <h1 className="text-lg font-semibold">100</h1>
                </div>
              </div>
              <div className="w-1/3 h-full bg-white ring-2 ring-blue-200 rounded-lg shadow-md flex flex-col py-10 px-7">
                <div className="w-full h-1/2">
                  <h1 className="text-xl font-semibold text-red-500">
                    Revenue YTD
                  </h1>
                </div>
                <div className="w-full h-1/2">
                  <h1 className="text-lg font-semibold">IDR 100,000,000</h1>
                </div>
              </div>
              <div className="w-1/3 h-full bg-white ring-2 ring-blue-200 rounded-lg shadow-md flex flex-col py-10 px-7">
                <div className="w-full h-1/2">
                  <h1 className="text-xl font-semibold text-red-500">
                    Tickets Sold
                  </h1>
                </div>
                <div className="w-full h-1/2">
                  <h1 className="text-lg font-semibold">50</h1>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full  rounded-lg">
              <BarchartComponent />
              <PieChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ITrxData } from "@/app/admin/transactions/page";
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
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { AlertDialogComponent } from "./AlertDialog.component";
import { useSession } from "next-auth/react";
import { acceptTrx, rejectTrx } from "@/helper/transactions/transaction.helper";
import { useRouter, useSearchParams } from "next/navigation";

export default function TransactionDetailModal({
  trxData,
  refreshData,
}: {
  trxData: ITrxData;
  refreshData: () => void;
}) {
  const [dDay, setDDay] = useState<Date>();
  const { data: session, update, status } = useSession();
  const param = useSearchParams();
  const page = param?.get("page");
  const { push } = useRouter();

  useEffect(() => {
    setDDay(new Date(trxData.booked_time));
  }, []);

  return (
    <div className="w-full h-full flex justify-end ">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex hover:bg-blue-600 justify-center w-1/2 h-full text-sm font-semibold bg-blue-400 rounded-md">
            <EyeIcon className="w-5/6 h-full stroke-white " />
          </Button>
          {/* <Button variant="outline"></Button> */}
        </DialogTrigger>
        <DialogContent className="lg:max-w-[600px] sm:max-w-[425px] lg:h-[650px] ">
          <DialogHeader className=" flex flex-col gap-2 justify-center ">
            <DialogTitle>Transaction Detail</DialogTitle>
            <DialogDescription>
              Please verify the payment proof and confirm that the funds have
              been received. Click "Accept" to approve the registrant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 row-span-5 ">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 w-full h-full flex items-center justify-center">
                <div className="w-[350px] h-[350px] pr-4 ">
                  <img
                    className="h-full rounded-md ring-1"
                    src={
                      trxData.payment_proof_link
                        ? trxData.payment_proof_link
                        : "https://www.solving-finance.com/wp-content/uploads/2023/10/Example-of-a-Receipt.jpg"
                    }
                  />
                  {/* {!trxData.payment_proof_link ? (
                    <div className="w-full h-full flex items-center justify-center text-red-500">
                      Payment Proof is Not Available
                    </div>
                  ) : (
                    <img
                      className="h-full rounded-md ring-1"
                      src={
                        trxData.payment_proof_link
                          ? trxData.payment_proof_link
                          : "https://www.solving-finance.com/wp-content/uploads/2023/10/Example-of-a-Receipt.jpg"
                      }
                    />
                  )} */}
                </div>
              </div>
              <div className="col-span-1 w-full h-full py-7 ">
                <div className="grid grid-rows-5 w-full h-full gap-5">
                  <div className="w-full h-full flex-col row-span-1 0">
                    <div className="h-1/2 w-full">
                      <p className="text-sm">Event Title: </p>
                    </div>
                    <div className="h-1/2 w-full">
                      <p className="text-sm">
                        {trxData.event.event_name.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-full row-span-1">
                    <div className="h-1/2 w-full">
                      <p className="text-sm">Booked Date: </p>
                    </div>
                    <div className="h-1/2 w-full">
                      <p className="text-sm">
                        {trxData.booked_time.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-full row-span-1">
                    <div className="h-1/2 w-full">
                      <p className="text-sm">Amount: </p>
                    </div>
                    <div className="h-1/2 w-full">
                      <p className="text-sm">{trxData.amount} </p>
                    </div>
                  </div>
                  <div className="w-full h-full row-span-1">
                    <div className="h-1/2 w-full">
                      <p className="text-sm">Registrant's Name: </p>
                    </div>
                    <div className="h-1/2 w-full">
                      <p className="text-sm">
                        {trxData.customer.first_name.toUpperCase()}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {trxData.payment_status === "WAITING ADMIN" && (
            <DialogFooter className="flex justify-end items-center ">
              <DialogClose asChild>
                <Button
                  onClick={async () => {
                    await rejectTrx(session?.user.accessToken, trxData.id);
                    refreshData();
                  }}
                  className="w-[100px] hover:bg-red-800 bg-red-500 text-white"
                >
                  Reject
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={async () => {
                    await acceptTrx(session?.user.accessToken, trxData.id);
                    refreshData();
                  }}
                  className="w-[100px] hover:bg-slate-500 bg-black text-white"
                >
                  Accept
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

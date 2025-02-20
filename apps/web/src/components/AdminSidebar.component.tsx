import Link from "next/link";
import * as React from "react";

export default function AdminSidebar() {
  return (
    <div className="absolute top-0 left-0">
      <div className=" flex flex-col justify-start pt-36 w-[220px] h-screen border-r-2 border-slate-100 shadow-slate-100">
        <div className="w-full h-3/5 ">
          <div className="grid grid-row-4 w-full h-full ">
            <div className="row-span-1 w-full h-full flex justify-center items-center ">
              <Link href={"/admin/dashboard"}>
                <h1 className="text-lg hover:text-red-800">Dasboard</h1>
              </Link>
            </div>
            <div className="row-span-1 w-full h-full flex justify-center items-center">
              <Link href={"/admin/transactions"}>
                <h1 className="text-lg hover:text-red-800">Transactions</h1>
              </Link>
            </div>
            <div className="row-span-1 w-full h-full flex justify-center items-center">
              <Link href={"/admin/events"}>
                <h1 className="text-lg hover:text-red-800">Events</h1>
              </Link>
            </div>
            <div className="row-span-1 w-full h-full flex justify-center items-center">
              <Link href={"/admin/profile"}>
                <h1 className="text-lg hover:text-red-800">Profile</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Access: Organizers can view and manage their events ( ex: edit events, etc.), transactions, and basic statistics.
// Statistics Visualization: Display event data in graphical visualizations and reports by year, month, and day.
// Transaction Management: Organizers can accept, reject, and view user payment proofs.
// Notification Emails: Customers receive email notifications when their transaction is accepted or rejected. Ensure points/vouchers/coupons are returned if used in rejected transactions. Additionally, available seats are restored.
// Attendee List: Show the list of attendees for each event, including name, ticket quantity, and total price paid.

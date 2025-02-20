import AdminSidebar from "@/components/AdminSidebar.component";
import * as React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.className}`}>
      <AdminSidebar />
      {children}
    </div>
  );
}

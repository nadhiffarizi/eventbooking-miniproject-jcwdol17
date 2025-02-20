"use client";
import Navbar from "@/components/navbar";
import React from "react";
import { SessionProvider, useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </>
  );
}

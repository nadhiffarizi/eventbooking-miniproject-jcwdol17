"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bg-white border-b px-4 py-2 lg:sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-12 flex flex-wrap justify-between items-center">
        <Link href="/" className="logo mb-2 lg:mb-0">
          <Image
            className="justify-start"
            src={"/logo.png"}
            width={70}
            height={20}
            alt="logo"
          />
        </Link>
        <ul className="flex flex-wrap lg:space-x-12 text-black mb-4 lg:mb-0">
          <li className="mr-4 lg:mr-0">
            <Link href="/events" className="hover:underline text-black">
              Events
            </Link>
          </li>
          <li className="mr-4 lg:mr-0">
            <Link href="/contact" className="hover:underline text-black">
              Contact
            </Link>
          </li>
          <li className="mr-4 lg:mr-0">
            <Link
              href="/api/auth/signin"
              className="hover:underline text-black"
            >
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:underline text-black">
              Sign Up
            </Link>
          </li>
        </ul>
        <div className="flex flex-wrap items-center justify-start w-full lg:w-auto space-y-2 lg:space-y-0 lg:space-x-4 text-black">
          <input
            type="text"
            className="border mr-8 w-full lg:w-72 flex rounded-2xl px-3 py-1 placeholder:text-slate-500 bg-slate-200"
            placeholder="Search Your Event"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

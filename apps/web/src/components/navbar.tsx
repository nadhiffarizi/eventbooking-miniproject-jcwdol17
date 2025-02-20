"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { serverHost } from "@/config";
import { Menu, X } from "lucide-react";

const Navbar: React.FC<{}> = () => {
  const { data: session, status } = useSession();
  const [roleState, setRole] = useState<string | undefined>("CUSTOMER");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      setRole(session.user.role);
    }
  }, [status]);

  const conditionalNavbar = () => {
    if (session?.user.accessToken) {
      // user logged in
      return (
        <>
          {session.user.role === "CUSTOMER" ? (
            <li className="mr-4 lg:mr-0">
              <Link href="/profile" className="hover:underline text-black">
                Profile
              </Link>
            </li>
          ) : (
            <li className="mr-4 lg:mr-0">
              <Link
                href="/admin/dashboard"
                className="hover:underline text-black"
              >
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={() => signOut()}
              className="hover:underline text-black"
            >
              Logout
            </button>
          </li>
        </>
      );
    } else {
      // user logged out
      return (
        <>
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
        </>
      );
    }
  };

  const toggleDropdown = () => {
    if (session?.user) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    window.location.href = `${serverHost}api/event/search?query=${searchQuery}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="bg-white border-b px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={70} height={20} alt="logo" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-black">
          <li>
            <Link href="/events" className="hover:underline">
              Events
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          {conditionalNavbar()}
        </ul>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center space-x-2">
          <input
            type="text"
            className="border rounded-2xl px-3 py-1 bg-gray-200"
            placeholder="Search Your Event"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1 bg-primary rounded-2xl"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white absolute top-16 left-0 w-full shadow-md py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link href="/events" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            {conditionalNavbar()}
            {/* Search Bar in Mobile */}
            <div className="flex flex-col items-center mt-2 w-4/5">
              <input
                type="text"
                className="border rounded-2xl px-3 py-1 w-full bg-gray-200"
                placeholder="Search Your Event"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                className="mt-2 px-4 py-1 bg-primary rounded-2xl w-full"
              >
                Search
              </button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

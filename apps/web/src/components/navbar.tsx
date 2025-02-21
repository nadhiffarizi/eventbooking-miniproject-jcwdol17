"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { serverHost } from "@/config";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
        </ul>

        {/* Search Bar and User Authentication */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative flex items-center space-x-2">
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
              className="px-4 py-1 hidden bg-primary rounded-2xl">
              Search
            </button>
          </div>
          {session?.user ? (
            <div className="relative flex items-center space-x-2">
              <img
                src={session.user.image_url || "/default-avatar.png"}
                width={40}
                height={40}
                alt="User Avatar"
                className="rounded-full border"
              />
              <button
                className="flex items-center space-x-2 hover:underline"
                onClick={toggleDropdown}>
                <span>{session.user.name}</span>
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-md transition-all duration-200 ease-in-out transform origin-top-right scale-95">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/admin/profile"
                        className="block px-4 py-2 hover:bg-gray-200">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-200">
                        Dashboard{" "}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left block px-4 py-2 hover:bg-gray-200">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/api/auth/signin" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

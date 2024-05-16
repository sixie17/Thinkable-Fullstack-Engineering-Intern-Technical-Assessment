"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import AuthLinks from '../authLinks/AuthLinks';
import { IoMenu, IoClose } from "react-icons/io5";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="py-10 bg-black-800 text-white">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex-grow">
          <Link href="#" className="text-xl font-bold">Thinkable</Link>
        </div>
        <div className="space-x-4 hidden md:flex">
          <Link href="#" className="hover:text-gray-300">Home</Link>
          <Link href="#" className="hover:text-gray-300">Contacts</Link>
          <Link href="#" className="hover:text-gray-300">About</Link>
          <AuthLinks />
        </div>
        <div
          className="w-10 h-10 rounded-md bg-white md:hidden flex justify-center items-center text-black"
          onClick={toggleMenu}
        >
          {menuOpen ? <IoClose className="w-8 h-8" /> : <IoMenu className="w-8 h-8" />}
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col md:hidden w-full items-start py-4 bg-black-800 text-white">
          <Link href="#" className="hover:text-gray-300 py-4 w-full hover:bg-gray-700 px-4">Home</Link>
          <Link href="#" className="hover:text-gray-300 py-4 w-full hover:bg-gray-700 px-4">Contacts</Link>
          <Link href="#" className="hover:text-gray-300 py-4 w-full hover:bg-gray-700 px-4">About</Link>
          <div className="hover:text-gray-300 py-4 w-full hover:bg-black-700 px-4">
            <AuthLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import Link from 'next/link';
import React from 'react';
import ThemeToggle from "@/components/themeToggle/ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="bg-white-900 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow">
          <Link href="#" className="text-xl font-bold">Thinkable</Link>
        </div>
        <div className="flex space-x-4">
            <ThemeToggle/>
            <Link href="#" className="hover:text-gray-300 ">Home</Link>
            <Link href="#" className="hover:text-gray-300">Contacts</Link>
            <Link href="#" className="hover:text-gray-300">About</Link>
            <Link href="#" className="hover:text-gray-300">Login</Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
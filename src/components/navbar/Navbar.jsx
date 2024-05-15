import Link from 'next/link';
import React from 'react';
import AuthLinks from '../authLinks/AuthLinks';
import { IoMenu } from "react-icons/io5";

export const Navbar = () => {
  return (
    <nav className='py-10'>
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex-grow">
          <Link href="#" className="text-xl font-bold">Thinkable</Link>
        </div>
        <div className="space-x-4 hidden md:flex">
            <Link href="#" className="hover:text-gray-300 ">Home</Link>
            <Link href="#" className="hover:text-gray-300">Contacts</Link>
            <Link href="#" className="hover:text-gray-300">About</Link>
            <AuthLinks/>
        </div>
        <div className='w-10 h-10 rounded-md bg-white md:hidden flex justify-center items-center text-black'>
          <IoMenu className='w-8 h-8' />
        </div>
      </div>
        <div className="flex flex-col md:hidden w-full items-start py-4">
            {/* <ThemeToggle/> */}
            <Link href="#" className="hover:text-gray-300 py-4 w-full  hover:bg-gray-700 px-4 ">Home</Link>
            <Link href="#" className="hover:text-gray-300 py-4 w-full  hover:bg-gray-700 px-4">Contacts</Link>
            <Link href="#" className="hover:text-gray-300 py-4 w-full  hover:bg-gray-700 px-4">About</Link>
            <div className='hover:text-gray-300 py-4 w-full  hover:bg-gray-700 px-4'>
              <AuthLinks/>
            </div>
        </div>
    </nav>
  )
}
export default Navbar
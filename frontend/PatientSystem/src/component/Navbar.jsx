import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

import { HiOutlineBars3 } from "react-icons/hi2";
import { BiDiamond } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <nav className="fixed top-0 left-0 right-0  w-full z-30 h-[80px] py-8 px-4 flex justify-between ">
      {/* Left side */}
      <div className="flex items-center text-xl">
        <div className="my-2  mb-4"></div>
        <HiOutlineBars3
          size={28}
          className="cursor-pointer ml-6 text-[#79A0D5]"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-8">
        <div className="relative">
          <Link to="/profile" className="text-gray-400 group">
            <FaUserCircle className="w-4 h-4 md:w-[40px] md:h-[40px] text-[#005EB8]" />
            <div className="z-10 hidden bg-white absolute rounded-lg shadow w-32 group-focus:block top-full right-0">
              {/* <ul className='py-2 text-sm text-gray-950'>
                
                <li className='flex items-center justify-center m-2'>
                  <CiSettings size={20} className='mr-1' />
                  <a href='#'>Settings</a>
                </li>
                <li className='flex items-center justify-center m-2'>
                  <CiLogout size={20} className='mr-1' />
                  <a href='#'>Log Out</a>
                </li>
              </ul> */}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

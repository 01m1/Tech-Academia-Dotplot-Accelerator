import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <nav className="fixed top-0 left-0 right-0  w-full z-30 h-[80px] py-8 px-4 flex justify-between ">
      {/* Left side */}
      <div className="flex items-center text-xl">
        <div className="my-2  mb-4"></div>
        <HiOutlineBars3
          size={28}
          className="cursor-pointer ml-6 text-[#3E737A]"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-8">
        <div className="relative group">
          <FaUserCircle className="w-4 h-4 w-[45px] h-[45px] text-[#00273F]" />

          <div className="hidden group-hover:block group-focus:block absolute right-0 top-full bg-white rounded-lg shadow w-32">
            <ul className="py-2 text-sm text-gray-950">
              <li className="flex items-center justify-center m-2">
                <CiLogout size={20} className="mr-1" />
                <a href="/">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

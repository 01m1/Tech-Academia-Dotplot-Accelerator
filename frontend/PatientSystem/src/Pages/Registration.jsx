import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { IoSearchOutline } from "react-icons/io5";

const Registration = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <>
      <div>
        <Sidebar sidebarToggle={sidebarToggle} />

        <div
          className={`${
            sidebarToggle ? "" : "ml-28 ease-in-out duration-500"
          } w-full flex flex-col`}
        >
          <Navbar
            setSidebarToggle={setSidebarToggle}
            sidebarToggle={sidebarToggle}
          />

          <div className="text-black w-full px-10 mx-4 pt-40">
            <div className="max-w-[700px] mt-[10px] rounded-md h-[auto] mx-auto px-8 flex flex-col items-center py-10 bg-gradient-to-r from-[#FFBBF0] to-[#549CFB]">
              <div className="flex items-center bg-white justify-center w-full md:w-[513px] border px-8 py-2 rounded-md">
                <IoSearchOutline size={22} color="#D9D9D9" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="text-[#D9D9D9] w-full px-5 py-2 pl-12 outline-none"
                />
              </div>

              <div className="py-5 w-full flex flex-col items-center">hii</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;


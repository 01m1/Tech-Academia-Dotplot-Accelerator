import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { IoSearchOutline } from "react-icons/io5";
import Table from "../component/Table";

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <>
    
      <div>
        <Sidebar sidebarToggle={sidebarToggle} />

        <div
          className={`${
            sidebarToggle ? "" : "ml-32 ease-in-out duration-500"
          } w-full flex flex-col`}
        >
          <Navbar
            setSidebarToggle={setSidebarToggle}
            sidebarToggle={sidebarToggle}
          />

          <div className="text-black w-full px-10  pt-6 ">
            <div className="max-w-[800px] mt-[10px] rounded-md h-[auto] mx-auto px-8 flex flex-col items-center py-10 ">
              <div className="flex items-center bg-white justify-center w-full  border shadow px-8 py-2 rounded-md text-[14px]">
                <IoSearchOutline size={22} color="#005EB8" />
                <input
                  type="text"
                  placeholder="Search Patients ID ...."
                  className="text-black w-full px-5 py-2 pl-12 outline-none"
                />
              </div>
              <div className="flex  mt-10 items-start bg-white justify-start w-full  border shadow px-8 py-2 rounded-md text-[14px]">
                <div className="h-[360px]"></div>
              </div>

              <div className="py-5 w-full flex flex-col ">
                <h2 className="text-[22px] font-bold text-[#005EB8] mt-12  ">
                  PATIENTS DEMOGRAPHICS
                </h2>
                <div className="flex  mt-10 items-start bg-white justify-start w-full  border shadow px-8 py-2 rounded-md text-[14px]">
                  <div className="h-[360px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
import { IoHome } from "react-icons/io5";
import { RiBodyScanFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LuImport } from "react-icons/lu";
import dotplotLogo from "../assets/dotplot_logo.jpeg";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={`fixed inset-0 ${
        sidebarToggle ? "hidden" : "block"
      } w-[250px] shadow-md bg-[#00273F] h-full pt-18 px-4 z-10`}
    >
      <div className="pt-28">
        <div className="md-6 flex justify-center">
          <Link
            to="/dashboard"
            className="text-[24px] md:text-[30px] p-2 font-bold italic"
          >
            <img
              src={dotplotLogo}
              alt="Dotplot"
              className="object-cover rounded-lg w-[75px] border shadow-xl"
            />
          </Link>
        </div>
      </div>
      <ul className="text-white  mt-6 ml-6 font-semibold mx-auto ">
        <li className="mb-2 text-[14px] rounded hover:shadow hover:bg-[#3E737A] hover:text-white py-4">
          <Link to="/dashboard" className="px-4 flex items-center">
            <IoHome
              className="inline-block w-6 h-6 mr-2 -mt-2"
              aria-label="Dashboard"
            />
            <p className="text-[14px]">Dashboard</p>
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-[#3E737A] hover:text-white py-4">
          <a href="/visualiser" className="px-4 flex items-center ">
            <RiBodyScanFill
              className="inline-block w-6 h-6 mr-2 -mt-1"
              aria-label="Visualise"
            />
            <p className="text-[14px]">Visualise</p>
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-[#3E737A] hover:text-white py-4 ">
          <a href="/AddData" className="px-4 flex items-center">
            <LuImport
              className="inline-block w-6 h-6 mr-2 -mt-1"
              aria-label="Add data"
            />
            <p className="text-[14px]">Add New Data</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

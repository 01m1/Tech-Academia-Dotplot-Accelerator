import React from "react";
import { IoHome } from "react-icons/io5";
import { RiBodyScanFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdNoteAlt } from "react-icons/md";
import { LuImport } from "react-icons/lu";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={`fixed inset-0 ${
        sidebarToggle ? "hidden" : "block"
      } w-[250px] shadow-md bg-[#005EB8] h-full pt-18 px-4 z-10`}
    >
      <div className="pt-28 ">
        <div className="my-2 md-6 ml-14 mb-4">
          <Link
            to="/"
            className="text-[24px] md:text-[30px] text-white border rounded p-2 font-bold italic"
          >
            NHS
          </Link>
        </div>
      </div>
      <ul className="mt-12 text-white  ml-6 font-semibold mx-auto ">
        <li className="mb-2 text-[14px] rounded hover:shadow hover:bg-[#549CFB] hover:text-white py-4">
          <Link to="/" className="px-4 flex items-center">
            <IoHome
              className="inline-block w-6 h-6 mr-2 -mt-2"
              aria-label="Dashboard"
            />
            <p className="text-[14px]">Dashboard</p>
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-[#549CFB] hover:text-white py-4">
          <a href="/visualiser" className="px-4 flex items-center ">
            <RiBodyScanFill
              className="inline-block w-6 h-6 mr-2 -mt-1"
              aria-label="Visualise"
            />
            <p className="text-[14px]">Visualise</p>
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-[#549CFB] hover:text-white py-4">
          <a href="/registration" className="px-4 flex items-center">
            <MdNoteAlt
              className="inline-block w-6 h-6 mr-2 -mt-1"
              aria-label="Registration forms"
            />
            <p className="text-[14px]">Registration forms</p>
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-[#549CFB] hover:text-white py-4 ">
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

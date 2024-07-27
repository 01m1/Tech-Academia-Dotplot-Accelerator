import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const VisualSidebar = ({ id, name, age, height, weight, history }) => {
  return (
    <div>
      <div className="w-[270px] mx-4 rounded h-[auto]   py-10 ">
        <div className="flex items-center bg-white shadow border border-blue-500 justify-center  rounded mb-6 ">
          <IoSearchOutline size={22} color="#005EB8" className="ml-2" />
          <input
            type="text"
            placeholder="Search Patients ID ...."
            className="text-black w-full  py-2 pl-2 "
          />
        </div>
        <div className="border shadow px-8 py-2 rounded-md text-[14px] bg-[#005EB8] ">
          <ul className="flex flex-col gap-6 text-white py-14">
            <li>Patient ID: {id}</li>
            <li>Patient Name: {name}</li>
            <li>Age: {age}</li>
            <li>Height: {height}</li>
            <li>Weight: {weight}</li>
            <li>History of Breast Cancer: {history}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisualSidebar;

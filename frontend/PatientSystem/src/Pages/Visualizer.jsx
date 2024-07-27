import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import VisualSidebar from "../component/VisualSidebar";
import torso from "../assets/coordinates.png";

const Visualizer = ({ sidebarToggle, setSidebarToggle }) => {
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

          <div className="text-black w-full px-14 pt-14 md:flex max-w-[950px] mx-auto">
            <div className="     ">
              <VisualSidebar />
            </div>
            <img src={torso} alt="Torso" className="md:w-[530px]  ml-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualizer;

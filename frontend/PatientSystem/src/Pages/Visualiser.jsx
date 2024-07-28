import { useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import VisualSidebar from "../component/VisualSidebar";

const Visualiser = ({ sidebarToggle, setSidebarToggle }) => {
  const [patientTorso, setPatientTorso] = useState('http://127.0.0.1:8000/media/coordinates.png');
  
  return (
    <>
      <div>
        <Sidebar sidebarToggle={sidebarToggle} />

        <div
          className={`${
            sidebarToggle ? "ease-in-out duration-500" : "ml-28 ease-in-out duration-500"
          } w-full flex flex-col`}
        >
          <Navbar
            setSidebarToggle={setSidebarToggle}
            sidebarToggle={sidebarToggle}
          />

          <div className="text-black w-full px-14 pt-14 md:flex max-w-[950px] mx-auto">
            <div className="     ">
              <VisualSidebar setTorso={setPatientTorso}/>
            </div>
            <img src={patientTorso} alt="Torso" className="md:w-[530px]  ml-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualiser;

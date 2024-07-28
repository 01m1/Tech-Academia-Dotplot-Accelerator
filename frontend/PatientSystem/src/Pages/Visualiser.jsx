import { useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import VisualSidebar from "../component/VisualSidebar";

const Visualiser = ({ sidebarToggle, setSidebarToggle }) => {
  const [patientTorso, setPatientTorso] = useState('http://127.0.0.1:8000/media/white.png');
  const [patientTumour, setPatientTumour] = useState('http://127.0.0.1:8000/media/white.png');
  
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

          <div className="flex items-center">
            <div className="text-black w-full px-14 pt-14 flex max-w-[950px] mx-auto">
              <div>
                <VisualSidebar setTorso={setPatientTorso} setTumour={setPatientTumour}/>
              </div>
              <div className="flex flex-col items-center ml-10 mt-10">
                <img src={patientTumour}  className="h-48 w-80 mt-10"/>
                <img src={patientTorso} alt="Torso" className="md:w-[370px] ml-15" />
              </div>       
            </div>         
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualiser;

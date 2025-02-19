import { useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import VisualSidebar from "../component/VisualSidebar";

const Visualiser = ({ sidebarToggle, setSidebarToggle }) => {
  const [patientTorso, setPatientTorso] = useState('http://127.0.0.1:8000/media/coordinates.png');
  const [patientTumour, setPatientTumour] = useState(['http://127.0.0.1:8000/media/white.png']);
  
  // Dont display heading 'Tumour Images' if there is no image
  const showTumourHeader = patientTumour[0].includes('/media/white.png');
  console.log(showTumourHeader);

  const handleImageError = () => {
    setPatientTumour(['http://127.0.0.1:8000/media/white.png']);
  }
  
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
          <h1 className="text-[22px] flex flex-wrap justify-center  font-bold text-[#005EB8] mt-5">Visualise Patient Tumours</h1>
          <div className="flex items-center">
            
            <div className="text-black w-full px-14 pt-5 flex max-w-[950px] mx-auto">
              <div>
                <VisualSidebar setTorso={setPatientTorso} setTumour={setPatientTumour}/>
              </div>
              <div className="flex flex-col items-center ml-10 mt-10">
                  <img src={patientTorso} alt="Torso" className="md:w-[500px] ml-15" />          
              </div>                       
            </div>                
          </div>
          {!showTumourHeader && (
            <h1 className="text-[22px] flex flex-wrap justify-center font-bold text-[#005EB8]">
              Tumour Images
            </h1>
          )}
          <div className="flex flex-wrap justify-center mt-5 gap-10">
          {patientTumour.map((tumour, index) => (
              <div className="flex flex-col items-center mb-10" key={index}>
                <img src={tumour} className="h-48 w-80" alt={`Tumour ${index}`} onError={() => handleImageError()}/>
              </div>
            ))}
          </div> 
        </div>
      </div>
    </>
  );
};

export default Visualiser;

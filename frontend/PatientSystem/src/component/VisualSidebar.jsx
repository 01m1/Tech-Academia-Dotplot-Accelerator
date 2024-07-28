import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const VisualSidebar = ({ setTorso, setTumour }) => {

  const [PatientValue, setValue] = useState("");

  const [id, setId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [history, setHistory] = useState("");

  const setPatient = () => {
    const url = new URL('http://127.0.0.1:8000/tumour/');
    url.searchParams.append('user_id', PatientValue);
    fetch(url, {
      method: "GET",
    })
    .then((data) => {        
      return data.json();
    }).then((data) => {   
      let tumourImage;
      let realTumour;
      
      // Link to tumour images
      if (data.tumour == null) {
        tumourImage = `http://127.0.0.1:8000/media/white.png`;
      } else {
        const timestamp = new Date().getTime();
        tumourImage = `http://127.0.0.1:8000${data.tumour}?t=${timestamp}`;
      }
      if (data.tumour_image == null) {
        realTumour = `http://127.0.0.1:8000/media/white.png`;
      } else {
        const timestamp = new Date().getTime();
        realTumour = `http://127.0.0.1:8000${data.tumour_image}?t=${timestamp}`;
      }
      
      console.log(tumourImage)
      setId(data.patient_id);
      setPatientName(data.patient_name);
      setPatientAge(data.patient_age);
      setHeight(data.patient_height);
      setWeight(data.patient_weight);
      setHistory(data.patient_history);
      setTorso(tumourImage);
      setTumour(realTumour);
    })
    
  };

  return (
    <div>
      <div className="w-[270px] mx-4 rounded h-[auto]   py-10 ">
        <div className="flex items-center bg-white shadow border border-blue-500 justify-center  rounded mb-6 ">
          <IoSearchOutline size={22} color="#005EB8" className="ml-2" onClick={setPatient}/>
          <input
            type="text"
            placeholder="Search Patients ID ...."
            className="text-black w-full  py-2 pl-2 "
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="border shadow px-8 py-10 pb-20 rounded-md text-[15px] bg-[#005EB8] ">
          {!id ? (
            <h1 className="p-5 font-bold rounded text-white text-l text-center">Patient Not Found</h1>
          ) : (
            <ul className="flex flex-col gap-10 text-white pb-1 pt-7">
              <li className="font-semibold">Patient ID: {id}</li>
              <li className="font-semibold">Patient Name: {patientName}</li>
              <li className="font-semibold">Age: {patientAge}</li>
              <li className="font-semibold">Height: {height}</li>
              <li className="font-semibold">Weight: {weight}</li>
              <li className="font-semibold">History of Breast Cancer: {history}</li>
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default VisualSidebar;

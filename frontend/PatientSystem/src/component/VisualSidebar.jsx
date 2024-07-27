import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const VisualSidebar = ({ setTorso }) => {

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
      const timestamp = new Date().getTime();
      const tumourImage = `http://127.0.0.1:8000${data.tumour}?t=${timestamp}`;
      console.log(tumourImage)
      setId(data.patient_id);
      setPatientName(data.patient_name);
      setPatientAge(data.patient_age);
      setHeight(data.patient_height);
      setWeight(data.patient_weight);
      setHistory(data.patient_history);
      setTorso(tumourImage);
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
        <div className="border shadow px-8 py-2 rounded-md text-[14px] bg-[#005EB8] ">
          <ul className="flex flex-col gap-6 text-white py-14">
            <li>Patient ID: {id}</li>
            <li>Patient Name: {patientName}</li>
            <li>Age: {patientAge}</li>
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

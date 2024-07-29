import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddData = ({ sidebarToggle, setSidebarToggle }) => {
  // Store CSV Files
  const [patientcsv, setPatient] = useState("");
  const [scanscsv, setScan] = useState("");

  const setPatientData = (e) => {
    const file = e.target.files[0];
    setPatient(file);
    alert("Added Patient Data");
  };

  const setScanData = (e) => {
    const file = e.target.files[0];
    setScan(file);
    alert("Added US Scan Data");
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const scans = new FormData();
    scans.append("file", scanscsv);

    // Send data to backend

    fetch("http://127.0.0.1:8000/processusscans/", {
      method: "POST",
      body: scans,
    })
      .then((data) => {
        if (!data.ok) {
          // Error in data
          alert(
            "Please verify that both the patient and scan data have been entered correctly and are in the proper format."
          );
          return;
        } else {
          const patients = new FormData();
          patients.append("file", patientcsv);

          fetch("http://127.0.0.1:8000/processpatients/", {
            method: "POST",
            body: patients,
          })
            .then((response) => {
              if (!response.ok) {
                // Error in data
                alert(
                  "Please verify that both the patient and scan data have been entered correctly and are in the proper format."
                );
                return;
              } else {
                alert("Data submitted successfully");
                navigate("/Dashboard");

                fetch("http://127.0.0.1:8000/patients/", {
                  method: "GET",
                }).then((response) => {
                  console.log(response);
                });
              }
            })
            .catch((error) => {
              // Log error if any
              alert(error);
              return;
            });
        }
      })
      .catch((error) => {
        // Log error if any
        alert(error);
        return;
      });
  };

  return (
    <div>
      <Sidebar sidebarToggle={sidebarToggle} />

      <div
        className={`${
          sidebarToggle ? "ease-in-out duration-500" : "ml-32 ease-in-out duration-500"
        } w-full flex flex-col`}
      >
        <Navbar
          setSidebarToggle={setSidebarToggle}
          sidebarToggle={sidebarToggle}
        />

        <div className="text-black text-center">
          <div className="max-w-[600px]  rounded-md h-[auto] mx-auto px-8 flex flex-col text-center py-10 ">
            <div className="flex mt-5 items-start bg-white justify-center w-full border shadow px-8 py-12 rounded-md text-[14px]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <h1 className="text-[22px] font-bold text-[#005EB8] mt-5">
                  ADD NEW CSV DATA
                </h1>
                <p className="text-[16px] font-semibold text-gray-700 mt-5">
                  Add both Patient and US scan CSV files
                </p>
                <div className="mt-5 flex gap-4">
                  <label
                    htmlFor="patientData"
                    className="cursor-pointer bg-[#005EB8] font-semibold text-white py-3 px-6 rounded-lg hover:bg-[#004a9e] transition duration-300 ease-in-out"
                  >
                    <input
                      type="file"
                      id="patientData"
                      className="hidden"
                      accept=".csv"
                      onChange={(e) => setPatientData(e)}
                    />
                    Add Patient Data
                  </label>
                  <label
                    htmlFor="usScanData"
                    className="cursor-pointer bg-[#005EB8] font-semibold text-white py-3 px-6 rounded-lg hover:bg-[#004a9e] transition duration-300 ease-in-out"
                  >
                    <input
                      type="file"
                      id="usScanData"
                      className="hidden"
                      accept=".csv"
                      onChange={(e) => setScanData(e)}
                    />
                    Add US Scan Data
                  </label>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="bg-[#33ab39] font-semibold text-white py-3 px-6 rounded-lg hover:bg-[#1e6321] transition duration-300 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="text-black text-center">
          <div className="max-w-[600px] rounded-md h-[auto] mx-auto px-8 flex flex-col text-center py-5 ">
            <div className="flex mt-5 items-start bg-white justify-center w-full border shadow px-8 py-12 rounded-md text-[14px]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <h1 className="text-[22px] font-bold text-[#eb3131] mt-5">
                  REMOVE ROW
                </h1>
                <p className="text-[16px] font-semibold text-gray-700 mt-3">
                  Enter User ID
                </p>
                  <input className="border mb-5 mt-4"></input>
                  <button
                    type="submit"
                    className="bg-[#33ab39] font-semibold text-white py-3 px-6 rounded-lg hover:bg-[#1e6321] transition duration-300 ease-in-out"
                  >
                    Submit
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddData;

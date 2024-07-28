import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <>

      <div>
        <Sidebar sidebarToggle={sidebarToggle} />

        <div
          className={`${
            sidebarToggle ? "" : "ml-32 ease-in-out duration-500"
          } w-full flex flex-col`}
        >
          <Navbar
            setSidebarToggle={setSidebarToggle}
            sidebarToggle={sidebarToggle}
          />

          <div className="text-black w-full px-10 h-600 pt-6 ">
            <div className="max-w-[1300px] mt-[10px] rounded-md mx-auto px-8 flex flex-col items-center py-10 ">
              <h1 className="text-[22px] font-bold text-[#005EB8] mt-12" >Patient Dashboard</h1>
              <div className="flex mt-10 bg-white justify-start w-full  border shadow  py-2 rounded-md text-[15px]">
                <div>

                  <iframe src="/GRAPHS.html" style={{ width: '1230px', height: '600px', border: 'none' }} />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Visualiser from "./Pages/Visualiser";
import AddData from "./Pages/AddData.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/visualiser"
          element={
            <Visualiser
              setSidebarToggle={setSidebarToggle}
              sidebarToggle={sidebarToggle}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setSidebarToggle={setSidebarToggle}
              sidebarToggle={sidebarToggle}
            />
          }
        />
        <Route
          path="/AddData"
          element={
            <AddData
              setSidebarToggle={setSidebarToggle}
              sidebarToggle={sidebarToggle}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

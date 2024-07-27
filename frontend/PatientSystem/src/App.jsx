import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Registration from "./Pages/Registration";
import Visualiser from "./Pages/Visualiser";
import AddData from "./Pages/AddData.jsx"

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Dashboard
              setSidebarToggle={setSidebarToggle}
              sidebarToggle={sidebarToggle}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <Registration
              setSidebarToggle={setSidebarToggle}
              sidebarToggle={sidebarToggle}
            />
          }
        />
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

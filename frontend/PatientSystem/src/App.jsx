import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Registration from "./Pages/Registration";
import Visualizer from "./Pages/Visualizer";

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
          path="/visualizer"
          element={
            <Visualizer
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

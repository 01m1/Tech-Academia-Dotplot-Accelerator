import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Registration from "./Pages/Registration";
import Visualizer from "./Pages/Visualizer";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
    </>
  );
}

export default App;

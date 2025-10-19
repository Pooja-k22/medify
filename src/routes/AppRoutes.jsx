import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/Dashboard";
import PatientList from "../patients/pages/PatientList";
//import PatientDetails from "../patients/pages/PatientDetails";
import Settings from "../pages/Settings";
import Pagenotfound from "../pages/PageNotFound";
import ProtectedPatientRoute from "../components/ProtectedPatientRoute";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

      <Route path="/dashboard" element={<DashBoardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patientsList" element={<PatientList />} />
        {/* <Route path='/patient/:id' /> */}
        <Route path="settings" element={<Settings />} />
        <Route path="patientDetails/:id" element={<ProtectedPatientRoute />} />

      </Route>


      <Route path="*" element={<Pagenotfound/>}/>
          </Routes>
  );
}

export default AppRoutes;

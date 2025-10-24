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
import StaffListing from "../staff/pages/StaffListing";
import AppointmentCalendar from "../staff/pages/AppointmentCalendar";
import StaffDetailPage from "../staff/pages/StaffDetailPage";
import StaffEditPage from "../staff/components/StaffEditPage";


function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashBoardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patientsList" element={<PatientList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="patientDetails/:id" element={<ProtectedPatientRoute />} />
        <Route path="staffListing" element={<StaffListing />} />
        <Route path="appointment" element={<AppointmentCalendar />} />
        <Route path="staff-details/:id" element={<StaffDetailPage />} />
        <Route path="staff-editing/:id" element={<StaffEditPage />} />
      </Route>


      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default AppRoutes;

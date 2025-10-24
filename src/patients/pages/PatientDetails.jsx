import React, { useState } from "react";
import { Box, Tabs, Tab, useTheme } from "@mui/material";
import PatientProfileTab from "../components/PatientProfileTab";
import PatientAppointments from "../components/PatientAppointments";

export default function PatientDetails({ patient }) {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: 0 ,bgcolor: theme.palette.background.paper,}}>
      {/* Top Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Profile" />
        <Tab label="Appointments" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <PatientProfileTab id={patient.id} />}
        {activeTab === 1 && <PatientAppointments id={patient.id}/>}
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import PatientProfileTab from "../components/PatientProfileTab";

export default function PatientDetails({ patient }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: 1 }}>
      {/* Top Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Profile" />
        <Tab label="Item Two" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <PatientProfileTab id={patient.id} />}
        {activeTab === 1 && <Box>Hello</Box>}
      </Box>
    </Box>
  );
}

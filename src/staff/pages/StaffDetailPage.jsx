import React, { useState } from "react";
import { Box, Tabs, Tab, useTheme } from "@mui/material";

import { useParams } from "react-router-dom";
import StaffProfile from "../components/StaffProfile";
import DoctorAppointments from "../components/DoctorAppintments";

export default function staffDetailPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
const {id} = useParams()
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper,}}>
      {/* Top Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Profile" />
        <Tab label="Appoinments" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 ,}}>
        {activeTab === 0 && <StaffProfile id={id} />}
        {activeTab === 1 && <DoctorAppointments id={id}/>}
      </Box>
    </Box>
  );
}

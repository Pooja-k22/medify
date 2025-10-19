import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1101,
        
      }}
      elevation={8}
    >
      <BottomNavigation
        showLabels={false}
        value={location.pathname}
        onChange={handleChange}
        sx={{ bgcolor: "#1e293b", color: "#fff" }}
      >
        <BottomNavigationAction
          label="Dashboard"
          value="/"
          icon={<DashboardIcon />}
          sx={{ color: "#fff" }}
        />
        <BottomNavigationAction
          label="Patients"
          value="/patientsList"
          icon={<PeopleIcon />}
          sx={{ color: "#fff" }}
        />
        <BottomNavigationAction
          label="Settings"
          value="/settings"
          icon={<SettingsIcon />}
          sx={{ color: "#fff" }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;

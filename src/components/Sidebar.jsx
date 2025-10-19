import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Patients", icon: <PeopleIcon />, path: "/dashboard/patientsList" },
    { label: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
  ];

  return (
    <Box
      sx={{
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: isCollapsed ? "center" : "flex-start",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",

          justifyContent: isCollapsed ? "center" : "start",
          px: 2,
          width: "100%",
          borderBottom: "1px solid rgba(99, 98, 98, 0.4)",
          color: theme.palette.primary.main,
        }}
      >
        {!isCollapsed && <img src="/logo-bg.png" width="50px" alt="logo" />}{" "}
        {!isCollapsed && (
          <Typography variant="h5" fontWeight={600} ml={2}>
            Medify
          </Typography>
        )}
        {isCollapsed && (
          <Typography variant="h5" fontWeight={600}>
            M
          </Typography>
        )}
      </Box>

      {/* Menu List */}
      <List sx={{ flexGrow: 1, width: "100%", mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Tooltip
              key={item.label}
              title={isCollapsed ? item.label : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  px: isCollapsed ? 0 : 3,
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  bgcolor: isActive
                    ? theme.palette.primary.main
                    : "transparent",
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                  },
                  transition: "all 0.3s ease",
                  borderRadius: theme.shape.borderRadius,
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.primary,
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 2,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: isActive ? 600 : 400,
                      color: theme.palette.text.primary,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;

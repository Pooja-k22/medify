import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import BottomNavBar from "../components/BottomNavbar";
import HeaderDrawer from "../pages/HeaderDrawer";

const drawerWidth = 240;
const collapsedWidth = 80;
const extraSpace = 16;

function DashBoardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
   <>
      <Box sx={{ display: "flex" }}>
        {/* Sidebar on large screen */}
        {!isMobile && (
          <Box
            component="nav"
            sx={{
              width: isCollapsed ? collapsedWidth : drawerWidth,
              flexShrink: 0,
              position: "fixed",
              height: "100vh",
              bgcolor: "background.paper",
              color: "text.primary",
              transition: "width 0.3s ease",
              borderRadius: 2,
              boxShadow: "0 0 10px rgba(0,0,0,0.15)",
              m: 2,
            }}
          >
            <Sidebar isCollapsed={isCollapsed} />
          </Box>
        )}
  
        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            ml: !isMobile
              ? isCollapsed
                ? `${collapsedWidth}px `
                : `${drawerWidth}px`
              : 0,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            p:1,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              //width:'100%',
              width: !isMobile
        ? `calc(100% - ${isCollapsed ? collapsedWidth + extraSpace : drawerWidth + extraSpace}px)`
        : "100%",
              position: "fixed",
              top: 0,
              left: !isMobile
                ? isCollapsed
                  ? `${collapsedWidth + extraSpace}px`
                  : `${drawerWidth + extraSpace}px`
                : 0,
                //right:3,
              height: "64px",
              // bgcolor: "background.paper",
              //boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              zIndex: 1100,
              // p: 2,
              py:{md:2},
              //borderRadius: 2,
            }}
          >
            <Header onToggleSidebar={handleToggleSidebar} />
          </Box>
  
          {/*  Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pl:{md: 3},
              mt: 12,
              //overflowY: "auto",
              bgcolor: "background.default",
            }}
          >
            <Outlet />
          </Box>
          
  
          <HeaderDrawer />
        </Box>
        
      </Box>
  
      {/* sidebar on mobile */}
          {isMobile && <BottomNavBar />}
   </>
  );
}

export default DashBoardLayout;

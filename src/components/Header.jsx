import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getItem } from "../utils/localStorageUtils";
import ProfileModal from "../modal/ProfileModal";

const Header = ({ onToggleSidebar }) => {
  const theme = useTheme();
  const [userD, setUserD]= useState({})
    const [openModal, setOpenModal] = useState(false);
  const [dataEditStatus, setDataEditStatus] =  useState({})


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // modal open func
   const handleOpenModal = () => {
    setOpenModal(true);
    handleMenuClose();
  };

  useEffect(()=>{
    const user = getItem('UserData')
    if(user)setUserD(user)
  },[dataEditStatus])

  return (
    <>
    <Box
     sx={{
    
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mx:{md:2},
    px:2,
    bgcolor: theme.palette.background.paper, 
    color: theme.palette.text.primary,      
     boxShadow: theme.palette.mode === "dark"
                  ? "0 4px 10px rgba(16, 16, 16, 0.05)"
                  : "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius:{md:2},
  }}
    >
    
        {/* Sidebar Toggle */}
        <IconButton onClick={onToggleSidebar}>
          <MenuIcon sx={{ display: { xs: "none", md: "flex" } }} />
        </IconButton>
  
        {/* Right Side - Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        
            <Avatar
              src="https://thumbs.dreamstime.com/b/female-user-icon-long-shadow-white-background-235751029.jpg"
              alt="Profile"
              sx={{ cursor: "pointer", width: 40, height: 40 }}
            />
            <Box onClick={handleMenuOpen} sx={{ cursor: "pointer" ,pt:1}}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}  color="theme.palette.text.secondary">
                {userD?.role}
              </Typography>
              <Typography
                variant="body2"
                color="theme.palette.text.primary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {userD.firstname} {userD.lastname}
                <ArrowDropDownIcon />
              </Typography>
            </Box>
  
          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
  
       {/* model for profile */}
          <Box>
            <ProfileModal
              openModal={openModal}
              handleCloseModal={() => setOpenModal(false)}
              setDataEditStatus={setDataEditStatus}
            />
          </Box>
    </>
  );
};

export default Header;

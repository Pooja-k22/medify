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
import SearchBar from "./SearchBar";
import { menuItems } from "../utils/constans";



const Header = () => {
  const theme = useTheme();
  const [userD, setUserD] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [dataEditStatus, setDataEditStatus] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleOpenModal = () => {
    setOpenModal(true);
    handleMenuClose();
  };

  useEffect(() => {
    const user = getItem("UserData");
    if (user) setUserD(user);
  }, [dataEditStatus]);

  return (
    <>
      <Box
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: { md: 2 },
          px: 2,
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 10px rgba(16, 16, 16, 0.05)"
              : "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: { md: 2 },
        }}
      >
        

        {/* Search Bar */}
        <Box sx={{ flex: 1, mx: 2 }}>
          <SearchBar menuItems={menuItems} />
        </Box>

        {/* Right Side - Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src="https://thumbs.dreamstime.com/b/female-user-icon-long-shadow-white-background-235751029.jpg"
            alt="Profile"
            sx={{ cursor: "pointer", width: 40, height: 40 }}
          />
          <Box onClick={handleMenuOpen} sx={{ cursor: "pointer", pt: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600 }}
              color="theme.palette.text.secondary"
            >
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

      {/* Profile Modal */}
      <ProfileModal
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
        setDataEditStatus={setDataEditStatus}
      />
    </>
  );
};

export default Header;

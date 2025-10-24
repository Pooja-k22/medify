import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../utils/constans";
import { ThemeContext } from "../context/CustomThemeProvider";

function HeaderDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { mode, setMode, primaryColor, setPrimaryColor } = useContext(ThemeContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const onModeChange = (value) => {
    setMode(value);
    console.log(value);
  };

  const onColorSelect = (value) => {
    setPrimaryColor(value);
    console.log(value);
  };

  const DrawerList = (
    <Box sx={{ width: 280, p: 1, }} role="presentation">
      <Box sx={{ width: 260, p: 2 }}>
        {/* Heading */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              THEME CUSTOMIZER
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }} gutterBottom>
              Customization & Preview
            </Typography>
          </div>

          <Button
            onClick={() => setOpen(false)}
            sx={{ minWidth: "auto", padding: 0 }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Mode</FormLabel>
          <RadioGroup
            row
            value={mode}
            onChange={(e) => onModeChange(e.target.value)}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>

        
        <Typography variant="subtitle1" color="gray" gutterBottom>
          Primary Color
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {colors.map((c) => (
            <Box
              key={c}
              onClick={() => onColorSelect(c)}
              sx={{
                width: 30,
                height: 30,
                bgcolor: `${c}`,
                borderRadius: 1,
                cursor: "pointer",
                border: primaryColor === c ? "3px solid #0d0024ff" : "1px solid #ccc",
              }}
            />
          ))}
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );

  return (
    <div>
      
      <Button
        color="warning"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: open ? 1000 : 1400,
          borderRadius: "20% 0 0 20%",
          color: "#fff",
          bgcolor: theme.palette.primary.main,
          
          minWidth: "auto",
          p: 2,
        }}
      >
        <SettingsIcon />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{zIndex: 1500}}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default HeaderDrawer;

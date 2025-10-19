import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, useTheme } from "@mui/material";
import DashboardCards from "../components/DashboardCards";
import { getItem } from "../utils/localStorageUtils";


const Dashboard = () => {
  const theme = useTheme()
  const [image, setImage] = useState(null);
    const [user, setUser] = useState({});

  

  useEffect(() => {
    const userData= getItem('UserData')
    if(userData) setUser(userData)
    
    
    const data = getItem("bannerImage");
    if (data) setImage(data);
  }, [image]);
  return (
    <Box sx={{ p: 2 , bgcolor: theme.palette.background.default, 
        minHeight: "100vh",}}>
      {/* Welcome Section */}
      <Typography variant="h5" fontWeight={600} mb={1} color={theme.palette.text.primary}>
        {` Welcome Back, ${user.firstname} ${user.lastname} !`}
      </Typography>
      <Typography variant="body1" color={theme.palette.text.secondary} mb={3}>
        Here’s an overview of your Dashboard and updates.
      </Typography>

      {/* Banner Section */}
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          mb: 4,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component="img"
          height="290"
          image={image}
          alt="Hospital Banner"
        />
      </Card>

      {/* Cards Section */}
      <DashboardCards />

      {/* Chart Section */}
      {/* <Box mt={5}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Monthly Patient Statistics
        </Typography>
        <StatsChart />
      </Box> */}
    </Box>
  );
};

export default Dashboard;

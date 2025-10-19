import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HotelIcon from "@mui/icons-material/Hotel";
import { getItem } from "../utils/localStorageUtils";

const DashboardCards = () => {
  const theme = useTheme();
  const [patientsData, setPatientsData] = useState([]);

  const totalPatients = patientsData.length;
  const activePatients = patientsData.filter((data) => data.patientStatus === "Active").length;
  const inactivePatients = patientsData.filter((data) => data.patientStatus === "Inactive").length;

  useEffect(() => {
    const patients = getItem("patients");
    if (patients) setPatientsData(patients);
  }, []);

  const cards = [
    { title: "Total Patients", value: totalPatients, icon: <PeopleIcon />, color: "#0ea5e9",  },
    { title: "Active Patients", value: activePatients, icon:<HotelIcon /> , color: "#22c55e", },
    { title: "Inactive Patients", value: inactivePatients, icon: <LocalHospitalIcon />, color: "#f59e0b",  },
    { title: "Appointments", value: 56, icon:<CalendarMonthIcon /> , color: "#ef4444", },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item size={{xs:12 ,md:3}} md={3} key={card.title}>
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 12px rgba(255,255,255,0.05)"
                  : "0 6px 20px rgba(0,0,0,0.08)",
              bgcolor: theme.palette.background.paper,
              overflow: "hidden",
              px: 3,
              py:6,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 6px 14px rgba(255,255,255,0.1)"
                    : "0 8px 24px rgba(0,0,0,0.12)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent:'space-between',
              gap: 2,
            }}
          >
           

            <CardContent sx={{ p: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  mb: 0.5,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                {card.value}
              </Typography>
            </CardContent>
             <Box
              sx={{
                background: card.color,
                borderRadius: "16px",
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                minWidth: 50,
                minHeight: 50,
              }}
            >
              {card.icon}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;

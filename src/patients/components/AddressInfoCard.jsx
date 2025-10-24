import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import MailIcon from "@mui/icons-material/Mail";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import dayjs from "dayjs";

// import PatientAddress from "../modal/PatientAddress";
import { getItem } from "../../utils/localStorageUtils";
import PatientAddressModal from "../modals/PatientAddressModal";

export default function AddressInfoCard({id}) {
   const theme = useTheme();

    const [openAddress, setOpenAddress] = useState(false);
 const [patientData, setPatientData] = useState({});
  const [address, setAddress] = useState({});


  useEffect(()=>{
     if(!id)console.log('no id id there');
     const allPatients = getItem("patients")
     const currentPatient = allPatients.find((p)=>String(p.id) === String(id) )
 setPatientData(currentPatient)
     
     
   },[id,address])
  

  return (
    <>
     {/* -------------------- Address Section -------------------- */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
           bgcolor: theme.palette.background.default,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="subtitle1" sx={{color: theme.palette.text.primary}} fontWeight={600}>
            Address
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpenAddress(true)}
             sx={{
              textTransform: "none",
              borderRadius: 2,
              // bgcolor: "var(--primary-color)",
            }}
          >
            Edit
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {[
            ["Address Line 1", patientData?.address1],
            ["Address Line 2", patientData?.address2],
            ["City / State", patientData?.city],
            ["Postal Code", patientData?.postalCode],
            ,
          ].map(([label, value], idx) => (
            <Grid
              key={idx}
              item
              size={{ xs: 12, sm: 6 }}
              sm={idx < 4 ? 6 : 12}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <HomeIcon sx={{color: theme.palette.primary.main}} />
                <Box>
                  <Typography sx={{color: theme.palette.text.secondary}}>{label}</Typography>
                  <Typography fontWeight={600}  sx={{color: theme.palette.text.primary}}>{value || " "}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

        <PatientAddressModal
        open={openAddress}
        handleClose={() => setOpenAddress(false)}
        id={id}
        setAddressUpdate={setAddress}
      />
    </>
  );
}

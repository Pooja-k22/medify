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
import { getItem } from "../../utils/localStorageUtils";
import PatientGeneralModal from "../modals/PatientGeneralModal";
export default function GeneralInfoCard({id}) {
   const theme = useTheme();

 const [openGeneral, setOpenGeneral] = useState(false);
 const [patientData, setPatientData] = useState({});
   const [generalInfo, setGeneralInfo] = useState({});

   useEffect(()=>{
        if(!id)console.log('no id id there');
        const allPatients = getItem("patients")
        const currentPatient = allPatients.find((p)=>String(p.id) === String(id)) 
    setPatientData(currentPatient)
        
        
      },[id,generalInfo])

  return (
   <>
    {/* -------------------- General Info -------------------- */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          mt: 3,
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
            General Information
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpenGeneral(true)}
             sx={{
              textTransform: "none",
              borderRadius: 2,
            //  bgcolor: "var(--primary-color,)",
            }}
          >
            Edit
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {[
            ["Site", patientData?.site],
            ["Nickname / Preferred", patientData?.nickname],
            ["Prior Last Name", patientData?.priorLastName],
            ["SSN", patientData?.ssn],
            ["Source", patientData?.source],
            ["PCP Doctors", patientData?.pcpDoctors],
          ].map(([label, value], idx) => (
            <Grid
              key={idx}
              item
              size={{ xs: 12, sm: 6 }}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <MailIcon sx={{color:theme.palette.primary.main}} />
                <Box>
                  <Typography sx={{color: theme.palette.text.secondary}}>{label}</Typography>
                  <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>{value || " "}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
   
   <PatientGeneralModal
        open={openGeneral}
        handleClose={() => setOpenGeneral(false)}
        id={id}
        setGeneralInfoUpdate={setGeneralInfo}
      />
   </>
  );
}

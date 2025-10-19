import React, { useEffect, useState } from "react";
import { Grid,Box, Typography, Button, Divider, Paper, useTheme } from "@mui/material";
import PatientAbout from "../modals/PatientAbout";
import { getItem } from "../../utils/localStorageUtils";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PhoneIcon from "@mui/icons-material/Phone";




export default function PersonalInfoCard({id}) {
 const theme = useTheme();

    const [openAbout, setOpenAbout] = useState(false);
  const [about, setAbout] = useState({});
   const [patientData, setPatientData] = useState({});


  useEffect(()=>{
    if(!id)console.log('no id is there');
    const allPatients = getItem("patients")
    const currentPatient = allPatients.find((p) => String(p.id) === String(id));
    console.log(currentPatient);
    
setPatientData(currentPatient)
    
    
  },[id,about])

  return (
<>
        <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 3,
         
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          //color:"var(--text-color,black)"
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="subtitle1" sx={{color:theme.palette.text.primary}} fontWeight={600}>
            Personal Information
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon/>}
            onClick={() => setOpenAbout(true)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              
              
            }}
          >
            Edit
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <BadgeIcon sx={{color:theme.palette.primary.main}} />
              <Box>
                <Typography sx={{color:theme.palette.text.secondary}}>Full Name</Typography>
                <Typography fontWeight={600} sx={{color:theme.palette.text.primary }}>
                  {`${patientData?.firstName}  ${patientData?.lastName}`}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <CalendarTodayIcon sx={{color:theme.palette.primary.main}} />

              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>Date of Birth</Typography>
                <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>
                  { patientData?.dob
                    ? dayjs(patientData?.dob).format("MMM D, YYYY")
                    : " "}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MedicalInformationIcon sx={{color:theme.palette.primary.main}} />
              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>Status</Typography>
                <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>
                  {patientData?.patientStatus || "-"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <CalendarTodayIcon sx={{color:theme.palette.primary.main}} />
              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>Age</Typography>
                <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>{patientData?.age || "-"}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <FitnessCenterIcon sx={{color:theme.palette.primary.main}} />
              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>Height (inches)</Typography>
                <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>{patientData?.height || "-"}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MonitorWeightIcon sx={{color:theme.palette.primary.main}} />
              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>Weight (lbs)</Typography>
                <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>{patientData?.weight || "-"}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MedicalInformationIcon sx={{color:theme.palette.primary.main}}/>
              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>BMI</Typography>
                <Typography fontWeight={600} sx={{color: theme.palette.text.primary}}>{patientData?.bmi || "-"}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <PhoneIcon  sx={{ mt: 0.3,color:theme.palette.primary.main }} />
              <Box>
                <Typography sx={{color: theme.palette.text.secondary}}>Contact Number</Typography>
                {patientData?.contacts?.length &&
                  patientData?.contacts.map((item, i) => (
                    <Typography key={i} fontWeight={600} sx={{color: theme.palette.text.primary}}>
                      {item.number} : {item.type}
                    </Typography>
                  ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

        <PatientAbout
        open={openAbout}
        handleClose={() => setOpenAbout(false)}
        id={id}
        patientData={patientData}
        setAboutUpdate={setAbout}
      />
</>

    
  );
}

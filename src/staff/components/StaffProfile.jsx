import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../utils/localStorageUtils";

// Icons
import BadgeIcon from "@mui/icons-material/Badge";
import CakeIcon from "@mui/icons-material/Cake";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WcIcon from "@mui/icons-material/Wc";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { formatDate } from "../../utils/dateFormate";

const StaffProfile = ({ id }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [staffDatas, setStaffDatas] = useState({});

  useEffect(() => {
    const staffDetails = getItem("staffs");
    if (staffDetails) {
      const details = staffDetails.find((d) => String(d.id) === String(id));
      setStaffDatas(details);
    }
  }, [id]);

  return (
    <Box p={3}  sx={{
        //p: 2,
        bgcolor:theme.palette.background.paper ,
        minHeight: "100vh",
      }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 , bgcolor: theme.palette.background.default}}>
        <Box display="flex" justifyContent="right" alignItems="center" mb={3}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate(`/dashboard/staff-editing/${id}`)}
            sx={{ borderRadius: "10px" }}
          >
            Edit
          </Button>
        </Box>

        <Grid container spacing={5}>
          {/* Left Side: Profile */}
          <Grid item size={{ xs: 12, md: 4 }} textAlign="center">
            <Avatar
              src={staffDatas?.photo}
              alt="pic"
              sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6" fontWeight="bold">
              {staffDatas?.firstName} {staffDatas?.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {staffDatas?.role}
            </Typography>
            <Chip
              label={staffDatas?.status}
              sx={{ mt: 1, color: theme.palette.primary.main }}
            />

            <Box mt={4}>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    {/* <BadgeIcon fontSize="small" />
                    <Typography color="text.secondary">Contact</Typography> */}
                    <div>
                      <Typography>{staffDatas?.contact}</Typography>
                      <Typography>{staffDatas?.email}</Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right Side: Details */}
          <Grid item size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Box display="flex" alignItems="center" gap={3}>
                  <WcIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary.main }}
                  />
                  <div>
                    <Typography color="text.secondary">Gender</Typography>
                    <Typography>{staffDatas?.gender}</Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Box display="flex" alignItems="center" gap={3}>
                  <CakeIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary.main }}
                  />
                  <div>
                    <Typography color="text.secondary">
                      Date of Birth
                    </Typography>
                    <Typography>{formatDate(staffDatas?.dob)}</Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <Box display="flex" alignItems="center" gap={3}>
                  <HomeIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary.main }}
                  />
                  <div>
                    <Typography color="text.secondary">Address</Typography>
                    <Typography>{staffDatas?.address}</Typography>
                  </div>
                </Box>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Professional Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <WorkIcon
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <div>
                      <Typography color="text.secondary">Department</Typography>
                      <Typography>{staffDatas?.department}</Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <SchoolIcon
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <div>
                      <Typography color="text.secondary">
                        Qualification
                      </Typography>
                      <Typography>{staffDatas?.qualification}</Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <ScheduleIcon
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <div>
                      <Typography color="text.secondary">Experience</Typography>
                      <Typography>{staffDatas?.experience}</Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <CalendarTodayIcon
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <div>
                      <Typography color="text.secondary">
                        Joining Date
                      </Typography>
                      <Typography>{formatDate(staffDatas?.joiningDate)}</Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StaffProfile;

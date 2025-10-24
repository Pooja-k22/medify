import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { ArrowBack, Save, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, setItem } from "../../utils/localStorageUtils";
import { staffRoles, statusStaff } from "../../utils/constans";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StaffSchema } from "../../utils/yupValidations";
import PersonalDetails from "./PersonalDetails";
import ProfessionalDetail from "./ProfessionalDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StaffEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const [staffData, setStaffData] = useState(null);

  const {
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(StaffSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      department: "",
      qualification: "",
      experience: "",
      contact: "",
      email: "",
      gender: "",
      dob: dayjs(),
      joiningDate: dayjs(),
      shift: "",
      status: "",
      address: "",
      photo: "",
    },
  });

  const formValues = watch();

  // Load staff details
 useEffect(() => {
  const staffs = getItem("staffs") || [];
  const details = staffs.find((s) => String(s.id) === String(id));
  if (details) {
    const formattedDetails = {
      ...details,
      dob: details.dob ? dayjs(details.dob) : null,
      joiningDate: details.joiningDate ? dayjs(details.joiningDate) : null,
    };
    setStaffData(formattedDetails);
    reset(formattedDetails);
  }
}, [id, reset]);


  // Handle form save
  const handleSave = (data) => {
    const staffs = getItem("staffs") || [];
    const updatedStaffs = staffs.map((s) =>
      String(s.id) === String(id) ? { ...s, ...data } : s
    );
    setItem("staffs", updatedStaffs);
    navigate(`/dashboard/staff-details/${id}`);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("photo", reader.result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box p={0}>
      <Paper sx={{ p: 4, borderRadius: 4,bgcolor:theme.palette.background.default }} elevation={3}>
        {/* Top Buttons */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            startIcon={<Save />}
            variant="contained"
            onClick={handleSubmit(handleSave)}
          >
            Save Changes
          </Button>
        </Box>

        <Grid container spacing={6}>
          {/* Left side: Avatar & Basic Info */}
          <Grid item size={{ xs: 12, md: 4 }} textAlign="center">
            <Box position="relative" display="inline-block" mb={2}>
              <Avatar
                src={formValues.photo || ""}
                alt={`${formValues.firstName} ${formValues.lastName}`}
                sx={{ width: 150, height: 150 }}
              />
              {/* Pen Icon */}
              <Edit
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 14,
                  background: theme.palette.primary.main,
                  borderRadius: "50%",
                  padding: 0.5,
                  cursor: "pointer",
                  boxShadow: 1,
                }}
                onClick={() => fileInputRef.current.click()}
              />
              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {errors.photo && (
                <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                  {errors.photo.message}
                </FormHelperText>
              )}
            </Box>

            {/* First Name */}
            <TextField
              label="First Name"
              value={formValues.firstName}
              onChange={(e) =>
                setValue("firstName", e.target.value, { shouldValidate: true })
              }
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              value={formValues.lastName}
              onChange={(e) =>
                setValue("lastName", e.target.value, { shouldValidate: true })
              }
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />

            {/* Status */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select {...field}>
                    {statusStaff.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.status?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Role */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select {...field}>
                    {staffRoles.map((role, i) => (
                      <MenuItem key={i} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.role?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* Right side: Details */}
          <Grid item size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <PersonalDetails control={control} errors={errors} />
            </LocalizationProvider>

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Professional Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ProfessionalDetail control={control} errors={errors} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StaffEditPage;

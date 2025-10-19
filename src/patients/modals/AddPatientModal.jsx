import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { trialStite, statusPatient, phoneTypes } from "../../utils/constans";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  FormHelperText,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { getItem, setItem } from "../../utils/localStorageUtils";
// import { getCommonFieldTheme, getDatePickerTheme, getSelectThemeDropDown } from "../../theme/themeStyle";



// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  site: yup.string().required("Please select a site"),
  dob: yup
    .date()
    .typeError("Date of birth is required")
    .required("Date of birth is required")
    .nullable(),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit number"),
     phoneType: yup.string().required("Type is required"),
  patientStatus: yup.string().required("Please select patient status"),
});


function AddPatientModal({ setAddUpdate }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: theme.palette.background.paper,
  borderRadius: 4,
  boxShadow: 24,
  p: 0,
};

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      site: "",
      dob:  dayjs(""),
      phone: "",
      phoneType:"",
      patientStatus: "",
    },
  });

  const onSubmit = (data) => {
    const userData =getItem("UserData") 
    const createdUser = userData
      ? `${userData.lastname} ${userData.firstname}`
      : "Unknown";
   const existingPatients = getItem('patients') ;

  const newId = existingPatients.length
  ? Math.max(...existingPatients.map(p => p.id)) + 1
  : 1;

  const contacts = [{ number: data.phone, type: data.phoneType }];

    const newPatientData = {
      id: newId,
      contacts,
      firstName:data.firstName,
      lastName:data.lastName,
      dob:data.dob,
      patientStatus: data.patientStatus,
      site: data.site,
      createdBy: createdUser,
    };
    //console.log(newPatientData);
    const updatedPatients = [...existingPatients, newPatientData];
    setItem('patients',updatedPatients)
    setAddUpdate(newPatientData);
    reset();
    handleClose();
  };

  return (
    <>
      <Button variant="contained" sx={{background: theme.palette.primary.main,
            color: theme.palette.common.white,}} onClick={handleOpen}>
        ADD NEW
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              p: 2,
             background: theme.palette.primary.main,
            color: theme.palette.common.white,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          >
            ADD NEW PATIENT
          </Typography>

          <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, bgcolor: theme.palette.background.paper}}>
            {/* First Name */}
            <TextField
              label="First Name"
              fullWidth
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
           
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              fullWidth
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            //   sx={getCommonFieldTheme()}
            />

            {/* Site Dropdown */}
            <FormControl fullWidth error={!!errors.site} 
            // sx={getCommonFieldTheme()}
            >
              <InputLabel>Site</InputLabel>
              <Select {...register("site")} label="Site" 
            //   {...getSelectThemeDropDown()}
               >
                {trialStite.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.site?.message}</FormHelperText>
            </FormControl>

            {/* dob  */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dob"
                control={control}
               
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dob,
                        helperText: errors.dob?.message,
                        // sx:getDatePickerTheme

                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            

            {/* Phone Number + Type */}
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                //   sx={getCommonFieldTheme()}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth error={!!errors.phoneType} 
                // sx={getCommonFieldTheme()}
                >
                  <InputLabel>Type</InputLabel>
                  <Select {...register("phoneType")} label="Type" 
                //   {...getSelectThemeDropDown()} 
                  >
                    {phoneTypes.map((type, i) => (
                      <MenuItem key={i} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.phoneType?.message}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            {/* Patient Status */}
            <FormControl fullWidth error={!!errors.patientStatus} 
            // sx={getCommonFieldTheme()}
            >
              <InputLabel>Patient Status</InputLabel>
              <Select {...register("patientStatus")} label="Patient Status" 
            //   {...getSelectThemeDropDown()}
              >
                {statusPatient.map((status, i) => (
                  <MenuItem key={i} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.patientStatus?.message}</FormHelperText>
            </FormControl>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                gap: 2,
              }}
            >
              <Button
                onClick={() => {
                  reset();
                  handleClose();
                }}
                variant="outlined"
                
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
               
                onClick={handleSubmit(onSubmit)}
              >
                ADD
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddPatientModal;

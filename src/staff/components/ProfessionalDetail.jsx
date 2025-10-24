import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  departmentOptions,
  qualificationOptions,
  shiftOptions,
} from "../../utils/constans";
import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ProfessionalDetail({ control, errors }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        {/* Department */}
        <Grid item  size={{ xs: 12, md: 6 }}>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.department}>
                <InputLabel id="department-label">Department</InputLabel>
                <Select labelId="department-label" {...field} label="Department">
                  {departmentOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.department?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        {/* Qualification */}
        <Grid item  size={{ xs: 12, md: 6 }}>
          <Controller
            name="qualification"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.qualification}>
                <InputLabel id="qualification-label">Qualification</InputLabel>
                <Select
                  labelId="qualification-label"
                  {...field}
                  label="Qualification"
                >
                  {qualificationOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.qualification?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        {/* Experience */}
        <Grid item  size={{ xs: 12, md: 6 }}>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Experience"
                fullWidth
                error={!!errors.experience}
                helperText={errors.experience?.message}
              />
            )}
          />
        </Grid>

        {/* Shift */}
        <Grid item  size={{ xs: 12, md: 6 }}>
          <Controller
            name="shift"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.shift}>
                <InputLabel id="shift-label">Shift</InputLabel>
                <Select labelId="shift-label" {...field} label="Shift">
                  {shiftOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.shift?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        {/* Joining Date - MUI DatePicker */}
        <Grid item  size={{ xs: 12, md: 6 }}>
          <Controller
            name="joiningDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Joining Date"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.joiningDate,
                    helperText: errors.joiningDate?.message,
                  },
                }}
              />
            )}
          />
        </Grid>

        {/* Contact */}
        <Grid item  size={{ xs: 12, md: 6 }}>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact"
                fullWidth
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            )}
          />
        </Grid>

        {/* Email */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default ProfessionalDetail;

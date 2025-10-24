import React from "react";
import { Grid, FormControl, FormHelperText, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { genderoptions } from "../../utils/constans";

function PersonalDetails({ control, errors }) {
  return (
    <Grid container spacing={2}>
      {/* Gender */}
      <Grid item  size={{ xs: 12, md: 6 }}>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select {...field} labelId="gender-label" label="Gender">
                {genderoptions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>

      {/* Date of Birth */}
     <Grid item  size={{ xs: 12, md: 6 }}>
  <Controller
    name="dob"
    control={control}
    render={({ field }) => (
      <DatePicker
        label="Date of Birth"
        value={field.value }
        onChange={(date) => field.onChange(date)} 
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.dob,
            helperText: errors.dob?.message,
          },
        }}
      />
    )}
  />
</Grid>


      {/* Address */}
      <Grid item  size={{ xs: 12, }}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              multiline
              rows={2}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default PersonalDetails;

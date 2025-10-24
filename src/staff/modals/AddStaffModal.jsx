import React, { useState } from "react";
import { useForm, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {  statusStaff, staffRoles } from "../../utils/constans";
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

import { getItem, setItem } from "../../utils/localStorageUtils";
// import { getCommonFieldTheme, getDatePickerTheme, getSelectThemeDropDown } from "../../theme/themeStyle";

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  role: yup.string().required("Please select a role"),
  status: yup.string().required("Please select status"),
});

function AddStaffModal({ setAddUpdate }) {
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
     const existingStaffs = getItem("staffs") || [];
 const id =existingStaffs.length > 0 ? existingStaffs[existingStaffs.length -1 ].id +1 :1 ;
 const newStaff = {...data, id};
  // 2. Add new staff
  const updatedStaffs = [...existingStaffs, newStaff];
    setItem("staffs", updatedStaffs);
    setAddUpdate(data);
    reset();
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
        }}
        onClick={handleOpen}
      >
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
            ADD NEW STAFF
          </Typography>

          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: theme.palette.background.paper,
            }}
          >
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
            />

            {/* role */}
            <FormControl
              fullWidth
              error={!!errors.role}
            >
              <InputLabel>Role</InputLabel>
              <Select
                {...register("role")}
                label="Role"
              >
                {staffRoles.map((role, i) => (
                  <MenuItem key={i} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>


            {/*  Status */}
            <FormControl
              fullWidth
              error={!!errors.status}
            >
              <InputLabel>Status</InputLabel>
              <Select
                {...register("status")}
                label="Status"
              >
                {statusStaff.map((status, i) => (
                  <MenuItem key={i} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.status?.message}</FormHelperText>
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
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                ADD
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddStaffModal;

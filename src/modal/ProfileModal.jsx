import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getItem } from "../utils/localStorageUtils";
import { roles } from "../utils/constans";

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain at least one letter and one number"
    ),
  role: yup.string().required("Role is required"),
});

function ProfileModal({ openModal, handleCloseModal, setDataEditStatus }) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const user = watch();
  // Load user data from localStorage
  useEffect(() => {
    const userData = getItem("UserData");
    if (userData) reset(userData);
  }, [reset]);

  const onSubmit = (data) => {
    localStorage.setItem("UserData", JSON.stringify(data));
    setDataEditStatus(data);
    handleCloseModal();
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: theme.palette.background.paper ,
           boxShadow: 24,
          borderRadius: 4,
          width: "90%",
          maxWidth: 600,
         
        }}
      >
        {/* Head */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background:theme.palette.primary.main ,
            p: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Profile
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          {/* Profile Section */}
          <Box sx={{ textAlign: "center", mb: 3, }}>
            <Avatar
              src="https://thumbs.dreamstime.com/b/female-user-icon-long-shadow-white-background-235751029.jpg"
              sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />
            <Typography variant="h6" fontWeight={600}>
              {user?.firstname} {user?.lastname}{" "}
            </Typography>
            <Typography variant="body2">{user.email} </Typography>
          </Box>

          {/* Form Fields */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                />
              )}
            />

            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                  
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                 
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                 
                />
              )}
            />

            {/* Role Dropdown */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.role}  >
                  <InputLabel sx={
                    {color:'var(--primary-color)'}
                  }>Role</InputLabel>
                  <Select {...field} label="Role" >
                    {roles?.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.role?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 2,
              }}
            >
              <Button
                onClick={handleCloseModal}
                variant="outlined"
               
              >
                Discard
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Save 
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

export default ProfileModal;

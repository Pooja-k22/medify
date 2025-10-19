import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormHelperText, Grid, Paper, useTheme } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { roles } from "../../utils/constans";
import { Controller, useForm } from "react-hook-form";

function Register() {
  const navigate = useNavigate();
const theme = useTheme();
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
      .min(6, "Password must be at least 6 characters").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 
        "Password must contain at least one letter and one number"
      ),
    role: yup.string().required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
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

  const onSubmit = (data) => {
    localStorage.setItem("UserData", JSON.stringify(data));
    navigate("/login");
    reset();
  };

  return (
    <>
      <Grid
        container
        sx={{
          minHeight: "100vh",
        background:theme.palette.primary.main
        }}
      >
        {/* Left Section */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Join Medify
          </Typography>

          <Typography variant="body1" sx={{ maxWidth: 400, mb: 3 }}>
            Create your account to start managing patients, appointments, and
            hospital operations efficiently. Experience seamless healthcare
            coordination today.
          </Typography>
        </Grid>

        {/* right side */}

        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 400,
              borderRadius: 4,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box
                component="img"
                src="/logo-bg.png"
                alt="Logo"
                sx={{
                  width: 60,
                  height: "auto",
                  mb: 1,
                }}
              />{" "}
              <Typography variant="h5" fontWeight="bold">
                Create Account
              </Typography>
              <Typography variant="body2">
                Register to get started with CareConnect
              </Typography>
            </Box>

            <TextField
              
              label="First Name"
              name="firstname"
              fullWidth
              margin="normal"
              {...register("firstname")}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />

            <TextField
             
              label="Last Name"
              name="lastname"
              fullWidth
              margin="normal"
              {...register("lastname")}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />

            <TextField
              
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <FormControl fullWidth errors={!!errors.role}>
              <InputLabel id="role-label">Role</InputLabel>

              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field} 
                    labelId="role-label"
                    label="Role"
                  >
                    {roles?.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                
                color: "white",
                borderRadius: 2,
                py: 1,

              }}
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Already have an account?{" "}
              <Button
                variant="text"
                
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;

import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getItem } from "../../utils/localStorageUtils";
import { useToast } from "../../hooks/useToast";

function Login() {
  const {showToast}= useToast()
  const navigate = useNavigate();
  const theme = useTheme();
  // Yup validation schema
  const schema = yup.object().shape({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const loginData = getItem("UserData");
    if (
      loginData &&
      loginData.email === data.email &&
      loginData.password === data.password
    ) {
      navigate("/dashboard");
      reset();
    } else {
      showToast("Invalid email or password",'warning');
    }
  };

  return (
    <Grid
      container
      sx={{ minHeight: "100vh", background: theme.palette.primary.main }}
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
          Welcome Back!
        </Typography>
        <Typography sx={{ maxWidth: 400, mb: 3 }}>
          Simplify your daily healthcare operations — manage records, coordinate
          staff, and deliver better patient care, all in one place.
        </Typography>
      </Grid>

      {/* Right Section */}
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
          sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 4 }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              component="img"
              src="/logo-bg.png"
              alt="Logo"
              sx={{ width: 60, height: "auto", mb: 1 }}
            />
            <Typography variant="h5" fontWeight="bold">
              Welcome to Medify
            </Typography>
            <Typography variant="body2">Login to continue</Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: 2, py: 1 }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don’t have an account?{" "}
            <Button variant="text" onClick={() => navigate("/")}>
              Register
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;

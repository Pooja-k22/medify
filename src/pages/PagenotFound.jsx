import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <>
     <Box
      sx={{
        minHeight: "100vh",
        display: { xs: "block", md: "grid" },
        gridTemplateColumns: { md: "1fr 1fr" },
        background: "linear-gradient(to bottom, #35afed, #5cb5d5, #cceffc)",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: { xs: 3, md: 10 },
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ mt: { xs: 4, md: 8 }, fontWeight: "800", fontSize: { xs: "2.5rem", md: "4rem" } }}
        >
          Oops! We couldn’t find that page!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { md: "1rem" } }}>
          It seems this page doesn’t exist or has moved. Let’s get you back to the dashboard or patient records.
        </Typography>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              px: 4,
              py: 1,
              borderRadius: "999px",
              mt: 2,
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Back Home
          </Button>
        </Link>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: "auto" },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          component="img"
          src="/404.png"
          alt="404"
          sx={{
            position: "absolute",
            top: { xs: "0", md: "5rem" },
            right: { xs: "-0.5rem", md: "1.5rem" },
            width: { xs: "20rem", md: "40rem" },
          }}
        />
      </Box>
    </Box>
    </>
  )
}

export default Pagenotfound
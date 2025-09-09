import React from "react";
import {
  Box,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#ffffff" },
  },
  typography: { fontFamily: "'Segoe UI', sans-serif" },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          backgroundImage: "url('/world-map.png')", // world map background
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* ---- Left Section: Text ---- */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "center" } }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: { xs: "2.2rem", md: "3.5rem" },
                }}
              >
                SREE EXIM SOLUTIONS
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#333",
                  mt: 1,
                  fontWeight: 400,
                  letterSpacing: 2,
                }}
              >
               YOUR TRUSTED LOGISTICS PARTNER
              </Typography>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
            </motion.div>
          </Box>

          {/* ---- Right Section: Image ---- */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.img
              src="/packages.png" // replace with your packages image
              alt="Packages"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

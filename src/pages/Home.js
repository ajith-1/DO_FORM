import React from "react";
import {
    Box,
    Typography,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        background: { default: "#f5f5f5" },
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
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                {/* Background with dark overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: "url('/bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: -2,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)", // dark overlay
                        zIndex: -1,
                    }}
                />

                {/* Animated Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{ fontWeight: "bold", letterSpacing: 2 }}
                    >
                        SREE EXIM SOLUTIONS
                    </Typography>
                </motion.div>

                {/* Sub-heading animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Your Trusted Logistics Partner
                    </Typography>
                </motion.div>
            </Box>
        </ThemeProvider>
    );
}

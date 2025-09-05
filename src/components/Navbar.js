import React from "react";
import { AppBar, Tabs, Tab, Toolbar, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  // Match route with tab index
  let currentTab = 0;
  if (location.pathname === "/doform") currentTab = 1;
  if (location.pathname === "/concor") currentTab = 2;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff", // White background
        color: "#000", // Black text
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          SREE EXIM SOLUTIONS
        </Typography>

        <Tabs
          value={currentTab}
          textColor="inherit"
          TabIndicatorProps={{ style: { display: "none" } }} // hide default indicator
          sx={{
            "& .MuiTab-root": {
              color: "#000",
              minWidth: "auto",
              px: 2,
              fontWeight: "normal",
              transition: "color 0.2s ease-in-out",
              position: "relative",
            },
            "& .Mui-selected": {
              fontWeight: "bold",
              color: "#000",
            },
            "& .MuiTab-root:hover": {
              color: "#333",
              textDecoration: "underline",
            },
          }}
        >
          <Tab label="HOME" component={Link} to="/" />
          <Tab label="DOFORM" component={Link} to="/doform" />
          <Tab label="CONCOR" component={Link} to="/concor" />
        </Tabs>

        {/* Custom animated indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            justifyContent: "flex-end",
            pointerEvents: "none",
          }}
        >
          <motion.div
            layoutId="tab-indicator"
            style={{
              height: "3px",
              backgroundColor: "#000",
              borderRadius: "2px",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

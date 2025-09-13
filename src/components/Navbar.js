import React, { useRef, useLayoutEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const tabs = [
    { label: "HOME", path: "/" },
    { label: "DOFORM", path: "/doform" },
    { label: "CONCOR", path: "/concor" },
  ];

  // Active tab index
  const currentTab = tabs.findIndex((t) => t.path === location.pathname) ?? 0;

  // Refs for measuring underline position
  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const node = tabRefs.current[currentTab];
    const container = containerRef.current;
    if (node && container) {
      const cRect = container.getBoundingClientRect();
      const nRect = node.getBoundingClientRect();
      setIndicator({
        left: nRect.left - cRect.left,
        width: nRect.width,
      });
    }
  }, [currentTab, location.pathname]);

  const HIGHLIGHT = "#0335fc";

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Brand */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#000",
            letterSpacing: 0.5,
          }}
        >
          SREE EXIM SOLUTIONS
        </Typography>

        {/* Tabs */}
        <Box
          ref={containerRef}
          sx={{ display: "flex", gap: 3, position: "relative" }}
        >
          {tabs.map((tab, i) => (
            <Button
              key={tab.path}
              ref={(el) => (tabRefs.current[i] = el)}
              component={Link}
              to={tab.path}
              disableRipple
              sx={{
                position: "relative",
                fontWeight: currentTab === i ? 700 : 500,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                color: currentTab === i ? HIGHLIGHT : "#000",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: HIGHLIGHT,
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              {tab.label}
            </Button>
          ))}

          {/* Animated underline */}
          <motion.div
            animate={{
              left: indicator.left,
              width: indicator.width,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            style={{
              position: "absolute",
              bottom: 0,
              height: "3px",
              borderRadius: "2px",
              background: HIGHLIGHT,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

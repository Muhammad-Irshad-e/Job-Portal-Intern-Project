import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, useMediaQuery, useTheme, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon
import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Userprofile from "./Userprofile";
import AppliedJobs from "./AppliedJobs";
import BrowseJob from "./BrowseJob";
import { UserButton } from "@clerk/clerk-react";

const Userdb = () => {
  const navigate = useNavigate();
  const gotoAppliedJobs = () => navigate('appliedjobs');
  const gotoUserProfile = () => navigate('userprofile');
  const gotoBrowseJob = () => navigate('');

  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const open = Boolean(anchorEl); // Check if the menu is open

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detects small screens

  // Handle Dropdown Menu Click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle Dropdown Menu Close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar component="nav" sx={{ backgroundColor: "#1E3A8A" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isSmallScreen && (
              <IconButton
                id="basic-button"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={gotoBrowseJob} sx={{ color: "#10B981" }}>Browse Jobs</MenuItem>
              <MenuItem onClick={gotoAppliedJobs} sx={{ color: "#10B981" }}>View Applied Jobs</MenuItem>
            </Menu>
          </div>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff" }}>
            User Dashboard
          </Typography>

          {/* Navigation Buttons (Hidden on Small Screens) */}
          {!isSmallScreen && (
            <Box className="menu" sx={{ display: "flex", gap: 2, marginRight: 4 }}>
              <Button sx={{ color: "#fff" }} onClick={gotoBrowseJob}>Browse Jobs</Button>
              <Button sx={{ color: "#fff" }} onClick={gotoAppliedJobs}>View Applied Jobs</Button>
            </Box>
          )}

          <UserButton />
        </Toolbar>
      </AppBar><br /><br /><br /><br />

      <div>
        <Routes>
          <Route path="appliedjobs" element={<AppliedJobs />} />
          <Route path="userprofile" element={<Userprofile />} />
          <Route path='' element={<BrowseJob />} />
        </Routes>
      </div>
    </div>
  );
};

export default Userdb;

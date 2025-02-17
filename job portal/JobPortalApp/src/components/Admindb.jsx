import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, useMediaQuery, useTheme, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ManageJobs from "./ManageJobs";
import AddJob from "./AddJob";
import UserApplication from "./UserApplication";
import { UserButton } from "@clerk/clerk-react";

const Admindb = () => {
  const navigate = useNavigate();
  const gotoManageJobs = () => navigate('');
  const addOpen = () => navigate('addJob');
  const appOpen = () => navigate('applications');

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
              <MenuItem onClick={gotoManageJobs} sx={{ color: "#10B981" }}>Manage Jobs</MenuItem>
              <MenuItem onClick={addOpen} sx={{ color: "#10B981" }}>Add Jobs</MenuItem>
              <MenuItem onClick={appOpen} sx={{ color: "#10B981" }}>Job Applications</MenuItem>
            </Menu>
          </div>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff" }}>
            Admin Dashboard
          </Typography>

          {/* Navigation Buttons (Hidden on Small Screens) */}
          {!isSmallScreen && (
            <Box className="menu" sx={{ display: "flex", gap: 2, marginRight: 4 }}>
              <Button sx={{ color: "#fff" }} onClick={gotoManageJobs}>Manage Jobs</Button>
              <Button sx={{ color: "#fff" }} onClick={addOpen}>Add Job</Button>
              <Button sx={{ color: "#fff" }} onClick={appOpen}>Job Applications</Button>
            </Box>
          )}

          <UserButton />
        </Toolbar>
      </AppBar>

      <br /><br /><br /><br />
      <Routes>
        <Route path="" element={<ManageJobs />} />
        <Route path="addJob" element={<AddJob />} />
        <Route path="applications" element={<UserApplication />} />
      </Routes>
    </div>
  );
}

export default Admindb;

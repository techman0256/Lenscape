import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { FaHome, FaSearch, FaComments, FaBell } from "react-icons/fa"; // React Icons
import useAuth from "../../context"; // Your custom authentication hook

const Navbar = () => {
  // const { username, isAuthenticated, logout } = useAuth();
  const username = "techman0256"
  const isAuthenticated = true
  const logout = false
  const getURL = `/profile/${username}`;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { text: "Home", icon: <FaHome size={20}/>, path: "/" },
    { text: "Search", icon: <FaSearch size={20}/>, path: "/search" },
    { text: "Chat", icon: <FaComments size={20}/>, path: "/chat" },
    { text: "Notifications", icon: <FaBell size={20}/>, path: "/notifications" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 240,
        backgroundColor: "#2b0c78",
        color: "#f9f8f4",
        display: "flex",
        flexDirection: "column",
        py: 4,
        px: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#aa8bf3" }}>
          Lenscape
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#310e8a",
                  color: "#aa8bf3",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Profile Section */}
      {isAuthenticated && username ? (
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Avatar
            src={`https://ui-avatars.com/api/?name=${username}`} // Replace with actual profile image URL
            alt={username}
            sx={{
              width: 60,
              height: 60,
              cursor: "pointer",
              border: "2px solid #aa8bf3",
              "&:hover": {
                borderColor: "#fff",
              },
            }}
            onClick={handleMenuOpen}
          />
          <Typography variant="body2" sx={{ color: "#f9f8f4" }}>
            {username}
          </Typography>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                backgroundColor: "#2b0c78",
                color: "#f9f8f4",
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "#310e8a",
                  color: "#aa8bf3",
                },
              },
            }}
          >
            <MenuItem component={Link} to={getURL} onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ mt: "auto", color: "#f9f8f4" }}>
          Please log in
        </Typography>
      )}
    </Box>
  );
};

export default Navbar;

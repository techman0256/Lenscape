import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSearch, FaComments, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../context";

const Navbar = () => {
  const { username, isAuthenticated, loading } = useAuth(); // Assuming `user` contains username
  const navigate = useNavigate();
  
  // const username = user?.username; // Get the username from the user object
  const getURL = `/profile/${username}`; // Create the dynamic profile URL
  console.log(isAuthenticated, username, "before loading nav ");
  
  console.log("username in navbar:", username);
  console.log("Dynamic Profile URL:", getURL);

  return (
    <nav className="h-screen w-52 bg-[#2b0c78] flex flex-col items-start py-6 space-y-4 px-4">
      {/* Logo Section */}
      <div className="flex items-center justify-center w-full mb-6">
        <h1 className="text-[#aa8bf3] text-3xl font-bold">L</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-start space-y-4 w-full">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center text-[#f9f8f4] hover:text-[#aa8bf3] text-sm space-x-4 w-full px-4 py-2 rounded-lg hover:bg-[#310e8a] transition-all"
        >
          <FaHome className="text-2xl" />
          <span className="text-sm">Home</span>
        </Link>

        {/* Search */}
        <Link
          to="/search"
          className="flex items-center text-[#f9f8f4] hover:text-[#aa8bf3] text-sm space-x-4 w-full px-4 py-2 rounded-lg hover:bg-[#310e8a] transition-all"
        >
          <FaSearch className="text-2xl" />
          <span className="text-sm">Search</span>
        </Link>

        {/* Chat */}
        <Link
          to="/chat"
          className="flex items-center text-[#f9f8f4] hover:text-[#aa8bf3] text-sm space-x-4 w-full px-4 py-2 rounded-lg hover:bg-[#310e8a] transition-all"
        >
          <FaComments className="text-2xl" />
          <span className="text-sm">Chat</span>
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="flex items-center text-[#f9f8f4] hover:text-[#aa8bf3] text-sm space-x-4 w-full px-4 py-2 rounded-lg hover:bg-[#310e8a] transition-all"
        >
          <FaBell className="text-2xl" />
          <span className="text-sm">Notifications</span>
        </Link>

        {/* Profile */}
        {isAuthenticated && username ? (
          <Link
            to={getURL}
            className="flex items-center text-[#f9f8f4] hover:text-[#aa8bf3] text-sm space-x-4 w-full px-4 py-2 rounded-lg hover:bg-[#310e8a] transition-all"
          >
            <FaUser className="text-2xl" />
            <span className="text-sm">Profile</span>
          </Link>
        ) : (
          <span className="flex items-center text-[#f9f8f4] text-sm space-x-4 w-full px-4 py-2 rounded-lg bg-[#2b0c78]">
            <FaUser className="text-2xl" />
            <span className="text-sm">Profile</span>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSearch, FaComments, FaBell } from "react-icons/fa";

const Navbar = () => {
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
        <Link
          to="/profile"
          className="flex items-center text-[#f9f8f4] hover:text-[#aa8bf3] text-sm space-x-4 w-full px-4 py-2 rounded-lg hover:bg-[#310e8a] transition-all"
        >
          <FaUser className="text-2xl" />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

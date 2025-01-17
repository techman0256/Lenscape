import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
import Navbar from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import SignIn from "./pages/Authentication/Signin";
import SignUp from "./pages/Authentication/Signup";

import useAuth from "./context";

const App = () => {
  const { username, isAuthenticated, loading, verifyToken } = useAuth();
  console.log("usrename ins app.js", username);
  
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     verifyToken(); // Verify token when visiting the profile page
  //   }
  // }, [isAuthenticated, verifyToken]);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Vertical Navbar */}
        <Navbar isAuthenticated={isAuthenticated} username={username}/>

        {/* Main Content */}
        <div className="flex flex-1 bg-[#f9f8f4]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile isAuthenticated={isAuthenticated}/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import SignIn from "./pages/Authentication/Signin";
import SignUp from "./pages/Authentication/Signup";

import useAuth from "./context";

const App = () => {
  const { username, isAuthenticated, loading, verifyToken } = useAuth();
  
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Vertical Navbar */}
        <Navbar isAuthenticated={isAuthenticated} username={username} />

        {/* Main Content */}
        <div className="flex flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<div className="flex-grow overflow-y-scroll h-full"><Home /></div>} 
            />
            <Route 
              path="/profile/:username" 
              element={<div className="flex-grow overflow-y-scroll h-full"><Profile isAuthenticated={isAuthenticated} /></div>} 
            />
            <Route 
              path="/signin" 
              element={<div className="flex-grow min-h-screen flex justify-center items-center">
                <SignIn />
              </div>
              } 
            />
            <Route 
              path="/signup" 
              element={<div className="flex-grow min-h-screen flex justify-center items-center">
                <SignUp />
              </div>} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

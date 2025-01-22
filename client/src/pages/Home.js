import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use the new useNavigate hook
import StoryBar from '../components/Stories/StoryBar'; 
import Feed from '../components/Posts/Feed'; 
import Sidebar from '../components/Sidebar'; 
import './Home.css';
import useAuth  from '../context';

const Home = () => {
  // const { username, isAuthenticated, loading, verifyToken } = useAuth();
  const navigate = useNavigate();  // Access the navigate function
  const isAuthenticated = true


  if (isAuthenticated) {
    console.log('User is authenticated and loading home page');
    
    return (
      <div className="container mx-auto flex flex-col lg:flex-row items-start h-screen">
        {/* Stories + Feed Section */}
        <div className="lg:w-3/4 border-r border-[#7444ec] p-4 h-full">
          <div className="mb-15">
            <StoryBar />
          </div>
          <Feed />
        </div>
    
        {/* Sidebar */}
        <div className="lg:w-1/4 bg-[#7444ec] text-[#f9f8f4] p-4 h-full">
          <Sidebar />
        </div>
      </div>
    );
    
  } else {
    navigate('/signin');  // Redirect to the signin route
  }
  // );
};

export default Home;

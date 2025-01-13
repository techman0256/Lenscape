import React from 'react';
import Stories from '../components/Stories'; // Import the Stories component
import Feed from '../components/Feed'; // Import your Feed component
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import './Home.css';

const Home = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-start h-screen">
      {/* Stories + Feed Section */}
      <div className="lg:w-2/3 border-r border-[#7444ec] p-4 h-full">
        <Stories />
        <Feed />
      </div>

      {/* Sidebar */}
      <div className="lg:w-1/3 bg-[#7444ec] text-[#f9f8f4] p-4 h-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
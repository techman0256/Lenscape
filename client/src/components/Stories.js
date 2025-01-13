import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import tempUsers from './tempUsers'; // Import the tempUsers data

const Stories = () => {
  const stories = tempUsers;

  return (
    <div className="stories-container flex overflow-x-auto space-x-4 py-4">
      {stories.map((story) => (
        <div key={story.id} className="relative flex-shrink-0 w-24 h-32 bg-gray-200 rounded-lg cursor-pointer">
          <img
            src={story.image}
            alt={`${story.username}'s story`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-2 left-2 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-white text-xl" />
              <span className="text-white text-sm">{story.username}</span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[#7444ec] rounded-b-lg">
            <div className="h-full w-full rounded-b-lg bg-[#7444ec] animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;

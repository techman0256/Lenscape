import React from 'react';
import Stories from 'react-insta-stories';
import { FaTimes } from 'react-icons/fa';

const ReactStory = ({ story , onClose}) => {
  const stories = story.urls.map((url) => ({ url }));
  const userName = story.header.heading;
  const userProfileImage = story.header.profileImage;

  return (
    <div className="relative w-full h-full max-w-[1000px] max-h-[200vh] bg-black flex items-center justify-center mx-auto">
      {/* Exit Button */}
      {/* <button
        className="absolute top-4 right-4 z-50 text-white text-2xl cursor-pointer bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
        onClick={onClose}
        aria-label="Close Story"
      >
        <FaTimes />
      </button> */}

      {/* Top Info Div - Profile Image and Username */}
      {/* <div className="StoryInfo absolute top-0 w-full flex items-center justify-between bg-black bg-opacity-75 p-4 z-40">
        <div className="flex items-center space-x-3">
          <img
            src={userProfileImage}
            alt={`User ${userName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-white font-semibold text-lg">{userName}</span>
        </div>
      </div> */}

        <div className="relative w-full h-full max-w-[1000px] max-h-[200vh] bg-black flex flex-col items-center justify-center mx-auto">
        {/* Top Info Div - Profile Image and Username */}
        <div className="StoryInfo w-full flex items-center justify-between bg-black p-2 z-10">
            <div className="flex items-center space-x-2">
            <img
                src={userProfileImage}
                alt={`User ${userName}`}
                className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white font-semibold text-sm">{userName}</span>
            </div>
            <button
            className="text-white text-2xl cursor-pointer"
            onClick={onClose}
            >
            <FaTimes />
            </button>
        </div>

        {/* Story Viewer */}
          <div className="px-4 w-full max-w-[400px] mx-auto mt-220 mb-20">
              {/* Adjust the margin to prevent overlapping */}
              <Stories
              stories={stories}
              defaultInterval={7000}
              width={400}
              height={600}
              // onAllStoriesEnd={onClose}
              />
          </div>
        </div>

    </div>
  );
};

export default ReactStory;

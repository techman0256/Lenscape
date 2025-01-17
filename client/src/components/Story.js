import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaTimes } from 'react-icons/fa';

const Story = ({ story, onClose }) => {
  const stories = story.urls;
  const userName = story.header.heading;
  const userProfileImage = story.header.profileImage;
  
  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="relative w-full h-full max-w-[1000px] max-h-[200vh] bg-black flex items-center justify-center mx-auto">
        {/* Exit Button */}
        

        {/* Top Info Div - Profile Image and Username */}
        <div className="StoryInfo absolute top-0 w-full flex items-center justify-between bg-black p-2">
            <div className="flex items-center space-x-2">
                <img
                    src={userProfileImage}
                    alt={`User ${userName}`}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-white font-semibold text-sm">{userName}</span>
            </div>
            <button
                className="absolute top-4 right-8 text-white text-2xl cursor-pointer"
                onClick={onClose}
            >
                <FaTimes /> {/* HTML entity for the "X" */}
            </button>
        </div>

        {/* Horizontal Spacing before the Story Div */}
        <div className="mt-10 px-4">

            {/* Slider Container */}
            <div className="story-slider-container relative w-full max-w-[400px] mx-auto">
                <Slider {...settings}>
                    {stories.map((url, index) => (
                        <div key={index} className="story-slide">
                            <img
                                src={url}
                                alt={`Story ${index}`}
                                className="w-full h-[70vh] rounded-lg shadow-md object-contain"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    </div>
  );
};

export default Story;

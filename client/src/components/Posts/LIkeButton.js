import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

const LikeButton = () => {
  const [liked, setLiked] = useState(false); // To track if the button is clicked
  const [hovered, setHovered] = useState(false); // To track hover state

  const toggleLike = () => {
    setLiked(!liked); // Toggle the liked state
  };

  return (
    <button
      className="transition duration-200 ease-in-out text-xl"
      onClick={toggleLike}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {liked ? (
        <FcLike size={24}/> // Show filled heart when liked
      ) : hovered ? (
        <FcLikePlaceholder size={24} /> // Show placeholder heart when hovered
      ) : (
        <GoHeart className="text-gray-500" size={24}/> // Show normal gray heart otherwise
      )}
    </button>
  );
};

export default LikeButton;

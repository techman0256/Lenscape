import React from "react";

const Suggestion = ({ suggestion }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-purple-200 rounded-lg mb-2">
      <div className="flex items-center space-x-3">
        <img
          src={suggestion.userImage}
          alt={suggestion.userName}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <h3 className="font-semibold text-purple-800">{suggestion.userName}</h3>
        </div>
      </div>
      <button
        onClick={suggestion.onFollowToggle}
        className={`px-4 py-2 rounded-lg ${
          suggestion.isFollowing ? "bg-red-600 text-white" : "bg-green-600 text-white"
        } hover:bg-opacity-80`}
      >
        {suggestion.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default Suggestion;

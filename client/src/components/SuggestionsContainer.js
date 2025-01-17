import {React, useState} from "react";
import Suggestion from "./Suggestion";

const SuggestionsContainer = () => {
  const [followStatus, setFollowStatus] = useState([false, true, false]); // Example follow statuses for each suggestion

  const suggestions = [
    {
      userImage: "https://avatars.githubusercontent.com/u/38799309?v=4",
      userName: "braydon",
      isFollowing: false,
    },
    {
      userImage: "https://avatars.githubusercontent.com/u/583231?v=4",
      userName: "johndoe",
      isFollowing: true,
    },
  ];

  const handleFollowToggle = (index) => {
    const updatedStatus = [...followStatus];
    updatedStatus[index] = !updatedStatus[index];
    setFollowStatus(updatedStatus);
  };

  return (
    <div className="p-4 bg-purple-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Suggestions</h2>
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          suggestion={{
            userImage: suggestion.userImage,
            userName: suggestion.userName,
            isFollowing: followStatus[index],
            onFollowToggle: () => handleFollowToggle(index),
          }}
        />
      ))}
    </div>
  );
};

export default SuggestionsContainer;

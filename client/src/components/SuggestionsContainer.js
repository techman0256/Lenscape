import { React, useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import useAuth from "../context";

const SuggestionsContainer = () => {
  const { username, isAuthenticated, loading, verifyToken } = useAuth();
  const [followStatus, setFollowStatus] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from the server
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4000/profile/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
    
        const data = await response.json();
        // Filter out the current user's username from suggestions
        const filteredSuggestions = data.profile.filter(suggestion => suggestion.username !== username);
        console.log("Filtered Suggestions", filteredSuggestions);
    
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    
    fetchSuggestions();
  }, [username]);

  const handleFollowToggle = async (index) => {
    const updatedStatus = [...followStatus];
    updatedStatus[index] = !updatedStatus[index];
    setFollowStatus(updatedStatus);
  
    const suggestionUserName = suggestions[index].username;
    const method = updatedStatus[index] ? 'POST' : 'DELETE';
    const url = `http://127.0.0.1:4000/profile/${method === 'POST' ? 'follows' : 'unfollows'}`;
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, follows: suggestionUserName }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.message || 'Operation successful');
      } else {
        console.error(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error handling follow/unfollow action:', error);
    }
  };
  

  return (
    <div className="p-4 bg-purple-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Suggestions</h2>
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          suggestion={{
            userImage: suggestion.profileImage,
            userName: suggestion.username,
            isFollowing: followStatus[index],
            onFollowToggle: () => handleFollowToggle(index),
          }}
        />
      ))}
    </div>
  );
};

export default SuggestionsContainer;

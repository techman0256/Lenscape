import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPlusCircle } from "react-icons/fa";
import Story from "./Story"; // Import the Story component
import ImageUpload from "../Upload/ImageUpload"; // Import the ImageUpload component

import ReactStory from "./ReactStory";
import Stories from "react-insta-stories";

import useAuth from "../../context";

// const story = [
//   "https://picsum.photos/400/600", // Random story images
//   "https://picsum.photos/401/601",
//   "https://picsum.photos/402/602",
//   "https://picsum.photos/403/603",
// ]

const story = [
  {
    header: {
    heading: "John Doe",
    profileImage: "https://picsum.photos/50/50", // Random profile image
    },
    urls: [
      "https://picsum.photos/400/600", // Random story images
      "https://picsum.photos/401/601",
      "https://picsum.photos/402/602",
      "https://picsum.photos/403/603",
    ],
}
];

const StoryBar = () => {
  const [stories, setStories] = useState(story); // Initialize with a sample story);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false); // To control the visibility of the upload dialog
  const { username, isAuthenticated, loading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  console.log(stories, "this is the stories")

  

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:4000/account/${username}`, {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const result = await response.json();
  //         const profile = {
  //           username: result.profile.username,
  //           title: result.profile.title,
  //           profileImage: result.profile.profileImage,
  //           bio: result.profile.bio,
  //         };
  //         console.log(profile);

  //         setProfile(profile);
  //       } else {
  //         const result = await response.json();
  //         setError(result.message || "Profile not found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //       setError("Something went wrong. Please try again later.");
  //     }
  //   };

  //   const fetchStories = async () => {
  //     console.log("Calling fetch stories", username);

  //     try {
  //       const response = await fetch("http://127.0.0.1:4000/stories/fetch", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ username: username }),
  //       }); // Adjust the API endpoint as needed

  //       if (!response.ok) {
  //         throw new Error(`Error fetching stories: ${response.statusText}`);
  //       }
  //       console.log(response);

  //       const data = await response.json();
  //       console.log("Fetched stories:", data);

  //       // Add 'My Story' entry at the beginning of the list
  //       setStories([{ id: "myStory", heading: "My Story", profileImage: "", isAdd: true }, ...data]);
  //     } catch (error) {
  //       console.error("Error fetching stories:", error);
  //     }
  //   };

  //   const initializeData = async () => {
  //     if (!loading && isAuthenticated && username) {
  //       // Wait for `useAuth` to resolve
  //       await fetchProfile(); // Fetch profile details
  //       await fetchStories(); // Fetch stories after profile is fetched
  //     }
  //   };

  //   initializeData();
  // }, [loading, isAuthenticated, username]);

  // Handle story click
  const handleStoryClick = (story) => {
    console.log("Story clicked:", story);
    
    setSelectedStory(story); // Set the selected story
  };

  // Handle closing the story view
  const handleCloseStory = () => {
    setSelectedStory(null); // Reset the selected story
    console.log("Story closed");
  };

  // Handle adding a new story
  const handleAddStoryClick = () => {
    setShowImageUpload(true); // Show the image upload dialog
  };

  // Close the ImageUpload popup
  const handleCloseImageUpload = () => {
    setShowImageUpload(false);
  };

  // This method will handle the uploaded images and trigger further processing if needed
  const handleUploadComplete = (uploadedImageUrls) => {
    if (uploadedImageUrls && uploadedImageUrls.length > 0) {
      console.log("Uploaded story image URLs:", uploadedImageUrls);

      // Create the story object
      const newStory = {
        username: username, // Replace with dynamic user_id as needed
        type: "image",
        urls: uploadedImageUrls,
        duration: 5, // Can be configured as per the story's visibility time

        header: {
          heading: username, // Replace with dynamic heading based on user
          subheading: "Posted 5 minutes ago",
          profileImage: profile.profileImage, // Replace with dynamic profileImage
        },
      };
      // Send POST request to backend to add the new story
      fetch("http://127.0.0.1:4000/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStory),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error adding story: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Story added successfully:", data);

          // Optionally, update the stories state in your frontend with the new story
          setStories((prevStories) => [data, ...prevStories]); // Prepend the new story to the list
        })
        .catch((error) => {
          console.error("Error adding story:", error);
        });

      // Hide the image upload component after the upload is complete
      setShowImageUpload(false);
    }
  };

  return (
    <div>
      {/* Render Story component if a story is selected */}
      {selectedStory ? (
        <div>
          {/* <Story story={selectedStory} onClose={handleCloseStory} /> */}
          {/* <Stories
            stories={stories[0].urls}
            defaultInterval={5000}
            width={432}
            height={768}
          /> */}
          <ReactStory story={selectedStory} onClose={handleCloseStory} />
        </div>
      ) : (
        <div className="stories-container flex overflow-x-auto space-x-4 py-4">
          {stories.map((story) => (
            <div
              key={story.id || story._id} // Adjust based on your backend's response structure
              className={`relative flex-shrink-0 w-24 h-32 bg-gray-200 rounded-lg cursor-pointer ${
                story.isAdd ? "flex items-center justify-center bg-green-500" : ""
              }`}
              onClick={story.isAdd ? handleAddStoryClick : () => handleStoryClick(story)}
            >
              {story.isAdd ? (
                <div>
                  <FaPlusCircle className="text-white text-4xl" />
                  <span className="text-white text-sm">Add Story</span>
                </div>
              ) : (
                <>
                  <img
                    src={story.header.profileImage} // Adjust based on your backend's response structure
                    alt={`${story.header.heading}'s story`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                    <FaUserCircle className="text-white text-xl" />
                    <span className="text-white text-sm">{story.header.heading}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#7444ec] rounded-b-lg">
                    <div className="h-full w-full rounded-b-lg bg-[#7444ec] animate-pulse"></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image upload dialog */}
      {showImageUpload && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-[400px] max-w-full">
            <h2 className="text-2xl font-bold mb-4">Add a New Story</h2>
            <ImageUpload onUpload={handleUploadComplete} /> {/* Render the ImageUpload component */}
            <button
              onClick={handleCloseImageUpload}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>

    // <div>

    // </div>
  );
};

export default StoryBar;

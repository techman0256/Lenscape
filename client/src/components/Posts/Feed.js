import React, { useState, useEffect } from "react";
import Post from "./Post";
import ImageUpload from "..//Upload/ImageUpload";
// import { FaHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { TbLocationShare,  TbShare3} from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc"
import { GoHeart } from "react-icons/go";

import useAuth from "../../context";
import LikeButton from "./LIkeButton";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  // const { username, isAuthenticated, loading, verifyToken } = useAuth();
  const username = "techman0256"
  const isAuthenticated = true
  const loading = false


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/account/${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies for authentication
        });
  
        if (response.ok) {
          const result = await response.json();
          const profile = {
            username: result.profile.username,
            title: result.profile.title,
            profileImage: result.profile.profileImage,
            bio: result.profile.bio,
          };
          console.log("Fetched profile in posts:", profile);
          setProfile(profile); // Set profile state
        } else {
          const result = await response.json();
          setError(result.message || "Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Something went wrong. Please try again later.");
      }
    };
  
    const fetchPosts = async () => {
      console.log("Fetching posts for:", username);
  
      try {
        const response = await fetch("http://127.0.0.1:4000/post/fetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }), // Pass the username in the request body
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Fetched posts:", data);
        setPosts(data); // Set posts state with fetched data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    const initializeData = async () => {
      if (!loading && isAuthenticated && username) {
        // Wait for `useAuth` to resolve
        await fetchProfile(); // Fetch profile details
        await fetchPosts(); // Fetch posts after profile is fetched
      }
    };
  
    initializeData();
  }, [loading, isAuthenticated, username]);
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setIsImageUploadVisible(true); // Show the upload area initially
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCaption('');
    setImage(null);
    setIsImageUploadVisible(true); // Reset upload area visibility
  };

  const handleCreatePost = async () => {
    if (!caption || !image) {
      alert("Please provide both an image and a caption.");
      return;
    }
  
    const newPost = {
      username: username, // Replace with the actual username
      profileImage: profile.profileImage, // Replace with the actual profile image URL
      images: image, // Assuming `image` is an array of image URLs
      caption: caption,
    };
  
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        const createdPost = await response.json();
        console.log("Post created successfully:", createdPost);
        alert("Post created successfully!");
        // Optionally, update the posts in the UI here.
      } else {
        console.error("Failed to create post:", response.statusText);
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error while creating post:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      handleCloseDialog(); // Close the dialog after the post request
    }
  };
  
  const gotoUserProfile = () => {
    // Redirect to the user's profile page
    // history.push(`/profile/${post.username}`);
    console.log("Going to user profile");
  };

  const savePostImage = (uploadedURLs) => {
    console.log("going to setImage", uploadedURLs);
    setImage(uploadedURLs);
    setIsImageUploadVisible(false); // Hide the upload area after images are uploaded
  };

  return (
    <div className="feed-container h-screen flex justify-center items-top bg-gray-100">
      <div className="inner-feed w-full max-w-md bg-gray-100 rounded-lg overflow-y-scroll no-scrollbar">
        <div
          className="new-post-bar p-3 flex items-center justify-between bg-gray-200 rounded-t-lg mb-4 cursor-pointer"
          onClick={handleOpenDialog}
        >
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-grow bg-white p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
          />
          <button className="ml-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none">
            Post
          </button>
        </div>

        {posts.map((post, index) => (
          <div  className="post bg-white rounded-lg shadow-lg overflow-hidden max-w-[600px] mx-auto mb-6 border border-gray-100"  key={index}>
            {/* User Info Section */}
            <div className="flex items-center p-2 border-b border-gray-200" onClick={gotoUserProfile}>
              <img
                src={post.profileImage}
                alt={`${post.username}'s avatar`}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <span className="font-semibold text-gray-800">{post.username}</span>
            </div>

            {/* Post Image */}
            <div className="post-image border-y border-gray-200">
              <img
                src={post.images[0]}
                alt="Post"
                className="w-full object-cover"
              />
            </div>

            {/* Post Details */}
            <div className="p-4">
              {/* Likes */}
              <div className="text-gray-600 mb-2 flex items-center space-x-2">
                <span className="font-semibold">{post.likes}</span> likes
              </div>

              {/* Caption */}
              <div className="text-gray-800 mb-2">
                <span className="font-semibold">{post.username}</span> {post.caption}
              </div>

              {/* Comments */}
              {post.comments && post.comments.length > 0 && (
                <div className="text-sm text-gray-500 mb-2">
                  View all {post.comments.length} comments
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-left text-gray-600 mt-3 space-x-5">
                {/* Like Button */}
                <button className="hover:text-red-500 transition ">
                <LikeButton />
                  </button>

                  {/* Comment Button */}
                  <button className="hover:text-purple-500 transition">
                  <FaRegComment size={22} />
                  </button>

                  {/* Share Button */}
                  <button className="hover:text-purple-500 transition">
                  {/* <TbLocationShare size={24}/> */}
                  <TbShare3 size={22}/>
                  </button>
              </div>
            </div>

            {/* <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>  */}
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            
            {isImageUploadVisible ? (
              <div className="mb-4">
                <ImageUpload onUpload={savePostImage} />
                <button
                  className="mt-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => setIsImageUploadVisible(false)}
                >
                  Cancel Image Upload
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-gray-700">Uploaded Images:</p>
                <div className="flex flex-wrap gap-2">
                  {image?.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt="Uploaded"
                      className="h-20 w-20 object-cover rounded"
                    />
                  ))}
                </div>
                <button
                  className="mt-2 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setIsImageUploadVisible(true)}
                >
                  Change Images
                </button>
              </div>
            )}

            <textarea
              placeholder="Write a caption..."
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

import React, { useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const posts = [
    {
      username: "braydoncoyer",
      avatarUrl: "https://avatars0.githubusercontent.com/u/38799309?v=4",
      postImageUrl:
        "https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG",
      likes: 12,
      caption:
        "Lord of the Rings is my favorite film-series. One day I'll make my way to New Zealand to visit the Hobbiton set!",
      comments: [
        {
          username: "razzle_dazzle",
          text: "Dude! How cool! I went to New Zealand last summer and had a blast taking the tour! So much to see! Make sure you bring a good camera when you go!",
        },
      ],
    },
    {
      username: "johndoe",
      avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
      postImageUrl:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      likes: 42,
      caption: "Exploring the mountains! Such a refreshing experience.",
      comments: [
        {
          username: "traveler_01",
          text: "Mountains are my happy place too!",
        },
        {
          username: "nature_lover",
          text: "Looks so serene!",
        },
      ],
    },
  ];

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCaption('');
    setImage(null);
  };

  const handleCreatePost = () => {
    console.log('Creating post with:', caption, image);
    // You can add the logic to store the post in your state or database
    handleCloseDialog(); // Close the dialog after creating the post
  };

  return (
    <div className="feed-container h-screen flex justify-center items-center bg-gray-100">
      {/* Inner scrollable feed */}
      <div className="inner-feed w-full max-w-md bg-white rounded-lg overflow-y-scroll no-scrollbar">
        {/* Add New Post Bar */}
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

        {/* Posts */}
        {posts.map((post, index) => (
          <Post
            key={index}
            username={post.username}
            avatarUrl={post.avatarUrl}
            postImageUrl={post.postImageUrl}
            likes={post.likes}
            caption={post.caption}
            comments={post.comments}
          />
        ))}
      </div>

      {/* Modal Dialog for creating a new post */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>

            <input
              type="file"
              accept="image/*"
              className="block w-full mb-4"
              onChange={(e) => setImage(e.target.files[0])}
            />

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

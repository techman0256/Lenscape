import React from "react";

const Post = ({
  username,
  avatarUrl,
  postImageUrl,
  likes,
  caption,
  comments,
}) => {
  return (
    <div className="rounded overflow-hidden border mb-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <div className="rounded-full h-7 w-7 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src={avatarUrl}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-2 text-sm font-semibold">{username}</span>
        </div>
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i className="fas fa-ellipsis-h text-lg"></i>
        </span>
      </div>

      {/* Post Image */}
      <img
        className="w-full h-56 object-cover"
        src={postImageUrl}
        alt="post"
      />

      {/* Post Actions and Likes */}
      <div className="p-2">
        {/* <div className="flex items-center mb-2">
          <i className="far fa-heart cursor-pointer text-lg"></i>
          <span className="ml-1 text-sm text-gray-500">{likes} likes</span>
        </div> */}

        {/* Caption */}
        <div className="mb-2 text-sm">
          <span className="font-medium mr-2">{username}</span>
          {caption}
        </div>

        {/* View Comments */}
        {/* <div className="text-sm text-gray-400 cursor-pointer font-medium">
          View all {comments.length} comments
        </div> */}

        {/* Comments */}
        {/* {comments.map((comment, index) => (
          <div key={index} className="text-sm mb-1">
            <span className="font-medium mr-2">{comment.username}</span>
            {comment.text}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Post;

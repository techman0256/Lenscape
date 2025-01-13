const Feed = () => {
    const posts = [
      { id: 1, content: "This is my first post!" },
      { id: 2, content: "Loving the Lenscape app!" },
    ];
  
    return (
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-4 bg-[#f9f8f4] border border-[#7444ec] rounded-lg shadow-sm"
          >
            <p className="text-[#310e8a]">{post.content}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Feed;
  
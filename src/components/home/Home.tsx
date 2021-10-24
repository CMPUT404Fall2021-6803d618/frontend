import usePost from "hooks/PostHook";
import React, { FC } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

const Home: FC = () => {
  const { posts, handleUpdatePost, handleCreatePost } = usePost();

  return (
    <div className="container">
      <CreatePost onCreate={handleCreatePost} />
      {posts ? posts.map((post) => <Post post={post} key={post.id} onUpdate={handleUpdatePost} />) : <div>Loading</div>}
    </div>
  );
};

export default Home;

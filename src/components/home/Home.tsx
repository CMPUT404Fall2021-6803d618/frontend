import React, { FC, useCallback } from "react";
import CreatePost, { PostRequest } from "./CreatePost";

const Home: FC = () => {
  const addPost = useCallback((postRequest: PostRequest) => {
    console.log(postRequest.text);
  }, []);

  return (
    <div className="container">
      <CreatePost onAdd={addPost} />
    </div>
  );
};

export default Home;

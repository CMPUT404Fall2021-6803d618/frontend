import React from "react";
import CreatePost, { PostRequest } from "./CreatePost";

const Home = () => {
  const addPost = (postRequest: PostRequest) => {
    console.log(postRequest.text)
  }
  
  return (
    <div className='container'>
      <CreatePost onAdd={addPost}/>
    </div>
  );
};

export default Home;

import React, { FC } from "react";
import CreatePost, { PostRequest } from "./CreatePost";

const Home: FC = () => {

  const addPost = (postRequest: PostRequest) => {
    console.log(postRequest.text)
  }

  return (
    <div className='container'>
      <CreatePost onAdd={addPost}/>
    </div>
  )
};

export default Home;

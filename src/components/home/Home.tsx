import React, { useState, useCallback, ChangeEvent, useEffect, FC } from "react";
import CreatePost, { PostRequest } from "./CreatePost";
import Posts from "./Posts";

const Home: FC = () => {
  // const [title, setTitle] = useState("");

  // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // }
  const addPost = useCallback((postRequest: PostRequest) => {
    console.log(postRequest.text);
  }, []);

  return (
    <div className="container">
      <CreatePost onAdd={addPost} />
      <Posts isMedia={true} />
      <Posts isMedia={false} />
    </div>
  );
};

export default Home;

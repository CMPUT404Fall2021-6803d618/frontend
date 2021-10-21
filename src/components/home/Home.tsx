import React, { useCallback, FC, useState } from "react";
import CreatePost, { PostRequest } from "./CreatePost";
import Post from "./Post";

const Home: FC = () => {
  const [title, setTitle] = useState("");
  const [isPost, setIsPost] = useState(false);

  // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // }
  const addPost = useCallback((postRequest: PostRequest) => {
    console.log(postRequest.text);
  }, []);

  // const title =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore";

  return (
    <div className="container">
      <CreatePost onAdd={addPost} />
      <Post isMedia={true} title={title} />
      <Post isMedia={false} title={title} />
    </div>
  );
};

export default Home;

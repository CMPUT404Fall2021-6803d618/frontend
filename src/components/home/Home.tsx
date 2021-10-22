import React, { useState, useCallback, FC } from "react";
import CreatePost, { PostRequest } from "./CreatePost";
import Post from "./Post";

const Home: FC = () => {
  // const [title, setTitle] = useState("");
  const [posts, setPosts] = useState<PostRequest[]>([]);
  const [title, setTitle] = useState("");

  // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // }
  const addPost = useCallback(
    (postRequest: PostRequest) => {
      setTitle(postRequest.text);
      setPosts([...posts, postRequest]);
    },
    [posts]
  );

  // const title =
  // ("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore");

  return (
    <div className="container">
      <CreatePost onAdd={addPost} />
      {posts.map((post, index) => (
        <Post key={index} isMedia={false} title={post.text} />
      ))}
      {/* {posts && <Post isMedia={false} title={title} />} */}
    </div>
  );
};

export default Home;

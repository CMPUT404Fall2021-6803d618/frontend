import React, { useState, ChangeEvent, useEffect } from "react";
import Posts from "./Posts";

const Home = () => {
  // const [title, setTitle] = useState("");

  // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // }

  return (
    <div className="container">
      <Posts isMedia={true} />
      <Posts isMedia={false} />
    </div>
  );
};

export default Home;

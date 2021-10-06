import React, { useState, ChangeEvent, useEffect, FC } from "react";
import Posts from "./Posts";

const Home: FC = () => {
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

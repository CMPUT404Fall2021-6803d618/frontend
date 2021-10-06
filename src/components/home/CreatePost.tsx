import styled from "styled-components";
import React from "react";
import { useState, FC, MouseEvent, useCallback } from "react";

const TweetBox = styled.div`
  padding-bottom: 10px;
  border-bottom: 8px solid var(--twitter-background);
  padding-right: 10px;
`;

// create css style for div
const TweetBoxInput = styled.div`
  display: flex;
  padding: 20px;
`;
const TweetBoxForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin-left: 20px;
  font-size: 20px;
  border: none;
  outline: none;
`;

const TweetBoxImg = styled.img`
  border-radius: 50%;
  height: 40px;
`;

const TweetButton = styled.button`
  background-color: #00acee;
  border: none;
  color: white;
  font-weight: 900;

  border-radius: 30px;
  width: 80px;
  height: 40px;
  margin-top: 20px;
  margin-left: auto;
`;

export interface PostRequest {
  text: string;
}

interface CreatePostProp {
  onAdd: (postRequest: PostRequest) => void;
}

const CreatePost: FC<CreatePostProp> = ({ onAdd }) => {
  // text message
  const [text, setText] = useState("");

  const onSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!text) {
        alert("Please add a message");
        return;
      }

      onAdd({ text });
      // clear text
      setText("");
    },
    [onAdd, text]
  );

  return (
    <TweetBox>
      <TweetBoxForm>
        <TweetBoxInput>
          {/* Avatar */}
          <TweetBoxImg
            src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
            alt=""
          />

          {/* input */}
          <Input
            type="text"
            placeholder="What's happening"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </TweetBoxInput>

        {/* TODO: visibility */}
        <div></div>

        {/* button */}
        <TweetButton onClick={onSubmit}>Tweet</TweetButton>
      </TweetBoxForm>
    </TweetBox>
  );
};

export default CreatePost;

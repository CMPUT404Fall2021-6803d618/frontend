import React, { useState, FC, MouseEvent, useCallback, ChangeEvent } from "react";
import { PostPayload } from "services/PostService";
import { ContentType, Visibility } from "shared/enums";
import styled from "styled-components";

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

interface CreatePostProp {
  onCreate: (payload: PostPayload) => void;
}

const CreatePost: FC<CreatePostProp> = ({ onCreate }) => {
  // text message
  const [content, setContent] = useState("");

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!content) {
        alert("Please add a message");
        return;
      }

      onCreate({
        title: "Title",
        description: "description",
        contentType: ContentType.PLAIN_TEXT,
        content,
        visibility: Visibility.PUBLIC,
        unlisted: false,
      });
      // clear text
      setContent("");
    },
    [onCreate, content]
  );

  const handleContentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  return (
    <TweetBox>
      <TweetBoxForm>
        <TweetBoxInput>
          {/* Avatar */}
          <TweetBoxImg src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt="" />

          {/* input */}
          <Input type="text" placeholder="What's happening" value={content} onChange={handleContentChange} />
        </TweetBoxInput>

        {/* TODO: visibility */}
        <div></div>

        {/* button */}
        <TweetButton onClick={handleSubmit}>Tweet</TweetButton>
      </TweetBoxForm>
    </TweetBox>
  );
};

export default CreatePost;

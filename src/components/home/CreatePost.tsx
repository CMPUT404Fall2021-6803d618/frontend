import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import React, { useState, FC, MouseEvent, useCallback, ChangeEvent } from "react";
import { paths } from "router/paths";
import { ContentType, Visibility } from "shared/enums";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import FileUploader from "./FileUploader";

const TweetBox = styled.div`
  padding-bottom: 10px;
  border-bottom: 8px solid var(--twitter-background);
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  flex: 1;
`;

// create css style for div
const TweetBoxInput = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  flex: 1;
`;
const TweetBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InputDiv = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 1rem;
  flex: 1;
`;

const TextAreaDiv = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
  flex: 1;
`;

const TextArea = styled.textarea`
  flex: 1;
`;

const VisibilityLabel = styled.label`
  border-radius: 30px;
  width: 80px;
  height: 40px;
  margin-top: 10px;
  margin-left: 80px;
`;

const ImageButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: #3eb2fd;
  background-image: linear-gradient(1deg, #4f58fd, #149bf3 99%);
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd, sans-serif;
  font-size: 1rem;
  width: 120px;
  height: 40px;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s, background-position 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  margin-top: 10px;
  margin-left: 60px;
`;

const ImageInput = styled.input`
  visibility: hidden;
`;

const TweetBoxImg = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
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

const CreatePost: FC = () => {
  // text message
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState(Visibility.PUBLIC);
  const [description, setDescription] = useState("");
  const { user } = useAuthStore();
  const { createPost } = usePost(user);

  const handleSubmit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (content === "") {
        alert("Please add a message");
        return;
      }

      if (title === "") {
        alert("Please add a title");
        return;
      }

      if (description === "") {
        alert("Please add a description");
        return;
      }

      await createPost({
        title,
        description,
        contentType: ContentType.PLAIN_TEXT,
        content,
        visibility,
        unlisted: false,
      });
      // clear text
      setIsPostCreated(true);
    },
    [content, createPost, title, description, visibility]
  );

  const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleVisibilityChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === Visibility.PUBLIC) {
      setVisibility(Visibility.PUBLIC);
    } else if (e.target.value === Visibility.FRIENDS) {
      setVisibility(Visibility.FRIENDS);
    } else {
      console.log("invalid visibility");
    }
  }, []);

  const handleFileSelectError = useCallback((e: any) => {
    alert(e.error);
  }, []);

  const handleFileSelectSuccess = useCallback((file: File) => {
    setSelectedImage(file);
  }, []);

  const render = useCallback(() => {
    if (isPostCreated) {
      return <Redirect to={paths.HOME} />;
    } else {
      return (
        <TweetBox>
          <TweetBoxForm>
            <TweetBoxInput>
              <TweetBoxImg src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt="" />
              <InputDiv>
                <Input type="text" placeholder="Title" onChange={handleTitleChange} value={title} />
              </InputDiv>
              <InputDiv>
                <Input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} />
              </InputDiv>
              <TextAreaDiv>
                <TextArea placeholder="Content" value={content} onChange={handleContentChange} />
              </TextAreaDiv>
            </TweetBoxInput>
            <VisibilityLabel>
              {" "}
              Visibility
              <select value={visibility} onChange={handleVisibilityChange}>
                <option value="FRIENDS">Friends</option>
                <option value="PUBLIC">Public </option>
              </select>
            </VisibilityLabel>
            <FileUploader
              onFileSelectError={handleFileSelectError}
              onFileSelectSuccess={handleFileSelectSuccess}
            ></FileUploader>

            {/* button */}
            <TweetButton onClick={handleSubmit}>Tweet</TweetButton>
          </TweetBoxForm>
        </TweetBox>
      );
    }
  }, [
    content,
    description,
    handleContentChange,
    handleDescriptionChange,
    handleSubmit,
    handleTitleChange,
    handleVisibilityChange,
    isPostCreated,
    title,
    visibility,
  ]);

  return render();
};

export default CreatePost;

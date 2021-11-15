import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import React, { useState, FC, MouseEvent, useCallback, ChangeEvent, useEffect } from "react";
import { paths } from "router/paths";
import { ContentType, Visibility } from "shared/enums";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import FileUploader from "./FileUploader";
import useSocial from "hooks/SocialHook";
import FriendsModal from "./FriendsModal";
import { Author } from "shared/interfaces";
import { PostPayload } from "services/PostService";
import ButtonBase from "@material-ui/core/ButtonBase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const TextArea = styled.textarea`
  flex: 1;
  resize: none;
`;

const ActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FriendButton = styled(ButtonBase)`
  padding: 0.75rem !important;
  width: 100px;
  border-radius: 5px !important;
  color: rgb(29, 155, 240) !important;
  font-weight: bold;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: rgba(29, 155, 240, 0.1) !important;
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.5) !important;
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`;

const CreatePost: FC = () => {
  // text message
  const [shouldLoadFriends, setShouldLoadFriends] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState(Visibility.PUBLIC);
  const [description, setDescription] = useState("");
  const { user } = useAuthStore();
  const { createPost } = usePost(user);
  const { friends } = useSocial(shouldLoadFriends);
  const [selectedFriends, setSelectedFriends] = useState<Author[]>([]);

  useEffect(() => {
    if (friends) {
      setSelectedFriends(friends);
    }
  }, [friends]);

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

      const payload: PostPayload = {
        title,
        description,
        contentType: ContentType.PLAIN_TEXT,
        content,
        visibility,
        unlisted: false,
      };

      if (visibility === Visibility.FRIENDS) {
        payload.friends = selectedFriends;
      }
      await createPost(payload);
      setIsPostCreated(true);
    },
    [content, title, description, visibility, selectedFriends, createPost]
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

  const handleVisibilityChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === Visibility.PUBLIC) {
        setVisibility(Visibility.PUBLIC);
      } else if (e.target.value === Visibility.FRIENDS) {
        setVisibility(Visibility.FRIENDS);
        if (!shouldLoadFriends) {
          setShouldLoadFriends(true);
        }
      } else {
        console.log("invalid visibility");
      }
    },
    [shouldLoadFriends]
  );

  const handleOpenFriendsModal = useCallback(() => {
    setOpenFriendsModal(true);
  }, []);

  const handleCloseFriendsModal = useCallback(() => {
    setOpenFriendsModal(false);
  }, []);

  const handleFriendsSelected = useCallback((selected: Author[]) => {
    console.log(selected);
    setSelectedFriends(selected);
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
        <Container className="container">
          <Form>
            <input placeholder="Title" onChange={handleTitleChange} value={title} />
            <input placeholder="Description" onChange={handleDescriptionChange} value={description} />
            <TextArea placeholder="Content" onChange={handleContentChange} value={content} />
          </Form>
          <ActionDiv>
            <select value={visibility} onChange={handleVisibilityChange}>
              <option value="PUBLIC" label="Everyone can see">
                Public
              </option>
              <option value="FRIENDS" label="Only friends can see">
                Friends
              </option>
            </select>
            <FriendButton disabled={visibility !== Visibility.FRIENDS} onClick={handleOpenFriendsModal}>
              Friends
            </FriendButton>
            <FileUploader
              onFileSelectError={handleFileSelectError}
              onFileSelectSuccess={handleFileSelectSuccess}
            ></FileUploader>
            <button onClick={handleSubmit}>Create</button>
          </ActionDiv>
          <FriendsModal
            open={openFriendsModal}
            onClose={handleCloseFriendsModal}
            friends={friends}
            currentSelectedFriends={selectedFriends}
            onFriendsSelected={handleFriendsSelected}
          />
        </Container>
      );
    }
  }, [
    isPostCreated,
    handleTitleChange,
    title,
    handleDescriptionChange,
    description,
    handleContentChange,
    content,
    visibility,
    handleVisibilityChange,
    handleOpenFriendsModal,
    handleFileSelectError,
    handleFileSelectSuccess,
    handleSubmit,
    openFriendsModal,
    handleCloseFriendsModal,
    friends,
    selectedFriends,
    handleFriendsSelected,
  ]);

  return render();
};

export default CreatePost;

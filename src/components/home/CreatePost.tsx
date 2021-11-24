import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import useImage from "hooks/ImageHook";
import React, { useState, FC, MouseEvent, useCallback, ChangeEvent, useEffect } from "react";
import { paths } from "router/paths";
import { ContentType, Visibility } from "shared/enums";
import { Redirect } from "react-router-dom";
import FileUploader from "./FileUploader";
import useSocial from "hooks/SocialHook";
import FriendsModal from "./FriendsModal";
import { Author } from "shared/interfaces";
import { PostPayload } from "services/PostService";
import { ImagePayload } from "services/ImageService";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styled from "styled-components";

const FriendButton = styled(ButtonBase)`
  padding: 0.75rem !important;
  width: 100%;
  height: 100%;
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
  const { uploadImage } = useImage(user);
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
    (e: SelectChangeEvent) => {
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

  const handleFileSelectSuccess = useCallback(
    (file: File) => {
      const imagePayload: ImagePayload = {
        file,
        visibility,
        unlisted: true,
      };
      setSelectedImage(file);
      const a = uploadImage(imagePayload);
    },
    [uploadImage, visibility]
  );

  const render = useCallback(() => {
    if (isPostCreated) {
      return <Redirect to={paths.HOME} />;
    } else {
      return (
        <Box sx={{ margin: 1 }}>
          <Stack spacing={1}>
            <TextField variant="outlined" placeholder="Title" onChange={handleTitleChange} value={title} />
            <TextField
              variant="outlined"
              placeholder="Description"
              onChange={handleDescriptionChange}
              value={description}
            />
            <TextField
              variant="outlined"
              multiline
              rows={3}
              placeholder="Content"
              onChange={handleContentChange}
              value={content}
            />
          </Stack>

          <FileUploader onFileSelectError={handleFileSelectError} onFileSelectSuccess={handleFileSelectSuccess} />

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12} sm>
              <FormControl fullWidth>
                <InputLabel id="select-visibility-label">Visibility</InputLabel>
                <Select
                  labelId="select-visibility-label"
                  id="select-visibility"
                  value={visibility}
                  label="Visibility"
                  onChange={handleVisibilityChange}
                >
                  <MenuItem value={"PUBLIC"}>Everyone can see</MenuItem>
                  <MenuItem value={"FRIENDS"}>Only friends can see</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm>
              <FormControl fullWidth sx={{ height: "100%" }}>
                <FriendButton disabled={visibility !== Visibility.FRIENDS} onClick={handleOpenFriendsModal}>
                  Select Friends
                </FriendButton>
              </FormControl>
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleSubmit}>
            Create
          </Button>
          <FriendsModal
            open={openFriendsModal}
            onClose={handleCloseFriendsModal}
            friends={friends}
            currentSelectedFriends={selectedFriends}
            onFriendsSelected={handleFriendsSelected}
          />
        </Box>
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

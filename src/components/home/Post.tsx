import React, { FC, useCallback } from "react";
import { Post as IPost } from "shared/interfaces";
import styled from "styled-components";
import { formatDate } from "utils";
import profilePic from "./images.jpeg";
import MeatballMenu from "./MeatballMenu";
import { Link } from "react-router-dom";
import LikeButton from "../common/components/LikeButton/LikeButton";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import ShareButton from "components/common/components/ShareButton";
import { useAuthStore } from "hooks/AuthStoreHook";
import CommentButton from "components/common/components/CommentButton";
import ReactMarkdown from "react-markdown";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";

// Post Wrapper
const PostWrapper = styled(Link)`
  color: darkslategray;
  &:hover {
    color: darkslategray;
  }
`;

const DisplayName = styled.span`
  margin-bottom: 0;
  font-weight: bold;
`;

const Dot = styled.span`
  margin: 0 5px;
  color: grey;
`;

const PublishedDate = styled.span`
  margin-bottom: 0;
`;

interface PostProps {
  post: IPost;
  onDeleteClick: (post: IPost) => Promise<void>;
  onLikeClick: (post: IPost) => Promise<void>;
  onEditClick: (post: IPost) => void;
  onShareClick: (post: IPost) => void;
}

// const Posts:FunctionComponent<PostProps> = (props) => {

const Post: FC<PostProps> = (props) => {
  const { user } = useAuthStore();
  const { post, onDeleteClick, onEditClick, onLikeClick, onShareClick } = props;
  const { content, author, published } = post;
  const isPostAuthor = user?.id === post?.author.id;

  const handleDeleteClick = useCallback(async () => {
    await onDeleteClick(post);
  }, [onDeleteClick, post]);

  const handleEditClick = useCallback(() => {
    onEditClick(post);
  }, [onEditClick, post]);

  const handleLikeClick = useCallback(async () => {
    await onLikeClick(post);
  }, [onLikeClick, post]);

  const handleShareClick = useCallback(() => {
    onShareClick(post);
  }, [onShareClick, post]);

  const meatballMenuItems = [
    {
      text: "Delete",
      Icon: Delete,
      onClick: handleDeleteClick,
    },
    {
      text: "Edit",
      Icon: Edit,
      onClick: handleEditClick,
    },
  ];

  return (
    <PostWrapper to={`/post/${encodeURIComponent(post.id)}`}>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item sm={1} textAlign="center" alignSelf="center">
              <img width={30} src={profilePic} alt="Profile Image" />
            </Grid>
            <Grid item sm={3}>
              <Stack spacing={0}>
                <DisplayName>{author.displayName}</DisplayName>
                <PublishedDate>{formatDate(published)}</PublishedDate>
              </Stack>
            </Grid>
            <Grid item sm />
            <Grid item sm={1}>
              {isPostAuthor && <MeatballMenu items={meatballMenuItems} />}
            </Grid>
          </Grid>

          <Box sx={{ typography: "body2" }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Box>
        </CardContent>
        <CardActions>
          <CommentButton
            onClick={() => {
              return Promise.resolve();
            }}
          />
          <LikeButton liked={post.liked} onClick={handleLikeClick} />
          <ShareButton onClick={handleShareClick} />
        </CardActions>
      </Card>
    </PostWrapper>
  );
};

export default Post;

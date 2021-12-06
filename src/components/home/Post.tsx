import React, { FC, useCallback } from "react";
import { Post as IPost } from "shared/interfaces";
import styled from "styled-components";
import { extractIdFromUrl, formatDate } from "utils";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileImage from "components/common/components/ProfileImage";
import ButtonBase from "@mui/material/ButtonBase";

const Dot = styled.span`
  margin: 0 6px;
  height: 3px;
  width: 3px;
  background-color: grey;
  border-radius: 50%;
  display: inline-block;
`;

const PublishedDate = styled.span`
  margin-bottom: 0;
`;

const PostWrapper = styled.div`
  height: fit-content;
  display: flex;
  width: 100%;
  cursor: default;
`;

// Post container
const PostCard = styled(Card)`
  height: fit-content;
  padding: 12px;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const HeaderDiv = styled.div`
  display: flex;
  height: 40px;
`;

const ProfileImageDiv = styled.div`
  margin-right: 12px;
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PostAuthorMenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 14px;
  width: 100%;
`;

const PostAuthorDiv = styled.div`
  display: flex;
  align-items: center;
`;

// Post content
const PostContent = styled.div`
  margin: 1rem 0;
  overflow-wrap: anywhere;
  img {
    height: auto;
    max-width: 100%;
  }
`;

const PostTitle = styled.h2`
  margin: 0;
`;

// Post Action
const PostAction = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  margin-left: -12px;
  max-width: 425px;
`;

const DisplayName = styled.span`
  margin-bottom: 0;
  font-weight: bold;
`;

interface PostProps {
  post: IPost;
  onDeleteClick?: (post: IPost) => Promise<void>;
  onLikeClick?: (post: IPost) => Promise<void>;
  onEditClick?: (post: IPost) => void;
  onCommentClick?: (post: IPost) => void;
  onShareFriendsClick?: (post: IPost) => void;
  onShareFollowersClick?: (post: IPost) => Promise<void>;
}

// const Posts:FunctionComponent<PostProps> = (props) => {

const Post: FC<PostProps> = (props) => {
  const { user } = useAuthStore();
  const {
    post,
    onDeleteClick,
    onEditClick,
    onLikeClick,
    onShareFriendsClick,
    onShareFollowersClick,
    onCommentClick,
  } = props;
  const { content, author, published, title, likeCount, liked, visibility, id } = post;
  const isPostAuthor = user?.id === post?.author.id;

  const handleDeleteClick = useCallback(async () => {
    await onDeleteClick?.(post);
  }, [onDeleteClick, post]);

  const handleEditClick = useCallback(() => {
    onEditClick?.(post);
  }, [onEditClick, post]);

  const handleLikeClick = useCallback(async () => {
    await onLikeClick?.(post);
  }, [onLikeClick, post]);

  const handleShareFriendsClick = useCallback(() => {
    onShareFriendsClick?.(post);
  }, [onShareFriendsClick, post]);

  const handleShareFollowersClick = useCallback(() => {
    onShareFollowersClick?.(post);
  }, [onShareFollowersClick, post]);

  const handleCommentClick = useCallback(() => {
    onCommentClick?.(post);
  }, [onCommentClick, post]);

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
    <PostWrapper>
      <PostCard>
        <ProfileImageDiv>
          <ButtonBase
            to={`/profile/${encodeURIComponent(author.url)}`}
            component={Link}
            sx={{
              justifyContent: "center",
            }}
          >
            <ProfileImage
              src={author.profileImage}
              name={author.displayName}
              color={author.profileColor}
            />
          </ButtonBase>
        </ProfileImageDiv>
        <PostBody>
          <HeaderDiv>
            <PostAuthorMenuDiv>
              <PostAuthorDiv>
                <DisplayName>{author.displayName}</DisplayName>
                <Dot />
                <PublishedDate>{formatDate(published)}</PublishedDate>
              </PostAuthorDiv>

              {isPostAuthor && onEditClick && onDeleteClick && (
                <MeatballMenu items={meatballMenuItems} />
              )}
            </PostAuthorMenuDiv>
          </HeaderDiv>
          <PostContent>
            <PostTitle>{title}</PostTitle>
            <ReactMarkdown>{content}</ReactMarkdown>
          </PostContent>
          <PostAction>
            {onCommentClick && <CommentButton onClick={handleCommentClick} />}
            {onLikeClick && (
              <LikeButton liked={liked} onClick={handleLikeClick} count={likeCount} />
            )}
            {onShareFriendsClick && onShareFollowersClick && (
              <ShareButton
                onFriendsClick={handleShareFriendsClick}
                onFollowersClick={handleShareFollowersClick}
                postVisibility={visibility}
              />
            )}
          </PostAction>
        </PostBody>
      </PostCard>
    </PostWrapper>
  );
};

export default Post;

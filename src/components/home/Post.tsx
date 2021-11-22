import React, { FC, useCallback } from "react";
import { Post as IPost } from "shared/interfaces";
import styled from "styled-components";
import { formatDate } from "utils";
import profilePic from "./images.jpeg";
import MeatballMenu from "./MeatballMenu";
import { Link } from "react-router-dom";
import LikeButton from "../common/components/LikeButton/LikeButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import ShareButton from "components/common/components/ShareButton";
import { useAuthStore } from "hooks/AuthStoreHook";
import CommentButton from "components/common/components/CommentButton";
import ReactMarkdown from "react-markdown";

// Post Wrapper
const PostWrapper = styled(Link)`
  height: fit-content;
  display: flex;
  border: 1px solid #ccc;
  width: 100%;
  color: darkslategray;
  &:hover {
    color: darkslategray;
  }
`;

// Post container
const PostContainer = styled.div`
  height: fit-content;
  margin: 12px;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const HeaderDiv = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  object-fit: contain;
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
  onShareFriendsClick: (post: IPost) => void;
  onShareFollowersClick: (post: IPost) => Promise<void>;
}

// const Posts:FunctionComponent<PostProps> = (props) => {

const Post: FC<PostProps> = (props) => {
  const { user } = useAuthStore();
  const { post, onDeleteClick, onEditClick, onLikeClick, onShareFriendsClick, onShareFollowersClick } = props;
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

  const handleShareFriendsClick = useCallback(() => {
    onShareFriendsClick(post);
  }, [onShareFriendsClick, post]);

  const handleShareFollowersClick = useCallback(() => {
    onShareFollowersClick(post);
  }, [onShareFollowersClick, post]);

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
      <PostContainer>
        <ProfileImage src={profilePic} alt="Profile Image" />
        <PostBody>
          <HeaderDiv>
            <PostAuthorMenuDiv>
              <PostAuthorDiv>
                <DisplayName>{author.displayName}</DisplayName>
                <Dot>🞄</Dot>
                <PublishedDate>{formatDate(published)}</PublishedDate>
              </PostAuthorDiv>

              {isPostAuthor && <MeatballMenu items={meatballMenuItems} />}
            </PostAuthorMenuDiv>
          </HeaderDiv>
          <PostContent>
            <ReactMarkdown>{content}</ReactMarkdown>
          </PostContent>
          <PostAction>
            <CommentButton
              onClick={() => {
                return Promise.resolve();
              }}
            />
            <LikeButton liked={post.liked} onClick={handleLikeClick} />
            <ShareButton
              onFriendsClick={handleShareFriendsClick}
              onFollowersClick={handleShareFollowersClick}
              postVisibility={post.visibility}
            />
          </PostAction>
        </PostBody>
      </PostContainer>
    </PostWrapper>
  );
};

export default Post;

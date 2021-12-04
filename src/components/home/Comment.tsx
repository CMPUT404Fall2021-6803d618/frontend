import { Card } from "@mui/material";
import LikeButton from "components/common/components/LikeButton/LikeButton";
import ProfileImage from "components/common/components/ProfileImage";
import React, { FC, useCallback } from "react";
import { Comment as IComment } from "shared/interfaces";
import styled from "styled-components";
import { formatDate } from "utils";

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

// Comment container
const CommentCard = styled(Card)`
  height: fit-content;
  padding: 12px;
  display: flex;
  width: 100%;
`;

const HeaderDiv = styled.div`
  display: flex;
  height: 40px;
`;

const ProfileImageDiv = styled.div`
  margin-right: 12px;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CommentAuthorMenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 14px;
  width: 100%;
`;

const CommentAuthorDiv = styled.div`
  display: flex;
  align-items: center;
`;

// Comment content
const CommentContent = styled.div`
  overflow-wrap: anywhere;
  img {
    height: auto;
    max-width: 100%;
  }
`;

const DisplayName = styled.span`
  margin-bottom: 0;
  font-weight: bold;
`;

const LikeButtonDiv = styled.div`
  align-self: flex-end;
`;

interface IProps {
  comment: IComment;
  onLike: (comment: IComment) => Promise<void>;
}

const Comment: FC<IProps> = (props) => {
  const { onLike } = props;
  const { author, published, comment, liked, likeCount } = props.comment;
  const { profileImage, displayName, profileColor } = author;

  const handleLikeClick = useCallback(async () => {
    await onLike(props.comment);
  }, [props.comment, onLike]);

  return (
    <CommentCard>
      <ProfileImageDiv>
        <ProfileImage src={profileImage} name={displayName} size={50} color={profileColor} />
      </ProfileImageDiv>
      <CommentBody>
        <HeaderDiv>
          <CommentAuthorMenuDiv>
            <CommentAuthorDiv>
              <DisplayName>{displayName}</DisplayName>
              <Dot />
              <PublishedDate>{formatDate(published)}</PublishedDate>
            </CommentAuthorDiv>
          </CommentAuthorMenuDiv>
        </HeaderDiv>
        <CommentContent>{comment}</CommentContent>
        <LikeButtonDiv>
          <LikeButton liked={liked} onClick={handleLikeClick} count={likeCount} />
        </LikeButtonDiv>
      </CommentBody>
    </CommentCard>
  );
};

export default Comment;

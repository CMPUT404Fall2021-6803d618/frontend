import { Card } from "@mui/material";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Comment as IComment } from "shared/interfaces";
import styled from "styled-components";
import theme from "theme";
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
  overflow: visible;
`;

const HeaderDiv = styled.div`
  display: flex;
  height: 40px;
`;

const ProfileImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  object-fit: contain;
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

const CommentTitle = styled.h2`
  margin: 0;
`;

// Comment Action
const CommentAction = styled.div`
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

interface IProps {
  comment: IComment;
}

const Comment: FC<IProps> = (props) => {
  const { author, published, comment } = props.comment;
  const { profileImage } = author;

  return (
    <CommentCard>
      <ProfileImage
        src={profileImage ?? "https://via.placeholder.com/500?text=User+Profile+Image"}
        alt="Profile Image"
      />
      <CommentBody>
        <HeaderDiv>
          <CommentAuthorMenuDiv>
            <CommentAuthorDiv>
              <DisplayName>{author.displayName}</DisplayName>
              <Dot />
              <PublishedDate>{formatDate(published)}</PublishedDate>
            </CommentAuthorDiv>
          </CommentAuthorMenuDiv>
        </HeaderDiv>
        <CommentContent>{comment}</CommentContent>
        {/* <CommentAction>
          <LikeButton liked={post.liked} onClick={handleLikeClick} />
        </CommentAction> */}
      </CommentBody>
    </CommentCard>
  );
};

export default Comment;

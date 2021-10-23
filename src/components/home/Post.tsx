import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import profilePic from "./images.jpeg";
import MeatballMenu from "./MeatballMenu";
import PostImage from "./PostImage.jpeg";
import PostTitle from "./PostTitle";

// Post Wrapper
const PostWrapper = styled.div`
  height: fit-content;
  display: flex;
  border: 1px solid #ccc;
  &:hover {
    background-color: rgb(239, 243, 244);
  }
  width: 100%;
`;

// Post container
const PostContainer = styled.div`
  height: fit-content;
  margin: 20px;
  display: flex;
  width: 100%;
`;

// User Profile Picture container
const ProfilePicContainer = styled.div`
  margin-right: 12px;
  display: flex;
  justify-content: center;
  width: 10%;
`;

// Post Body
const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  max-height: 1000px;
  height: fit-content;
  width: 90%;
`;

// Post Author
const PostAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 15px;
  width: 100%;
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

// Post content
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// Post Media
const PostMedia = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 100%;
  background-image: url(${PostImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 30px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    height: 320px;
  }
  @media (max-width: 425px) {
    height: 220px;
  }
`;

// Post Action
const PostAction = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 30px;
`;
// Action div
const Action = styled.div`
  max-width: 20px;
`;

interface PostProps {
  isMedia: boolean;
  title: string;
}

// const Posts:FunctionComponent<PostProps> = (props) => {

const Posts: FC<PostProps> = (props) => {
  const isMedia = props.isMedia;
  const [title, setTitle] = useState(props.title);

  // Handle change title
  const handleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  return (
    <PostWrapper>
      <PostContainer>
        {/* Display the user profile picture */}
        <ProfilePicContainer>
          <img
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              borderRadius: "50%",
              margin: "0 20px",
              objectFit: "contain",
            }}
            src={profilePic}
            alt="user pic"
          />
        </ProfilePicContainer>
        {/* Post Body */}
        <PostBody>
          <PostAuthor>
            {/* Display the author and the time posted */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ marginBottom: "0" }}>Trung Tran @TrungTran</p>
              <span style={{ margin: "0 5px" }}>.</span>
              <p style={{ marginBottom: "0" }}>20m</p>
            </div>

            <MeatballMenu title={title} onChange={handleChange} />
          </PostAuthor>
          {/* Main content of the post */}
          <PostContent>
            <PostTitle title={title} />

            {/* Media of the post */}
            {isMedia && <PostMedia></PostMedia>}

            {/* Available Actions */}
            <PostAction>
              <Action>Reply</Action>
              <Action>Retweet</Action>
              <Action>Like</Action>
              <Action>Share</Action>
            </PostAction>
          </PostContent>
        </PostBody>
      </PostContainer>
    </PostWrapper>
  );
};

export default Posts;

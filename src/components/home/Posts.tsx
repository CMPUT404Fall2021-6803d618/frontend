import { Height } from "@material-ui/icons";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import profilePic from "./images.jpeg";
import PostImage from "./PostImage.jpeg";

// Post Wrapper
const PostWrapper = styled.div`
  max-width: 600px;
  max-height: 450px;
  display: flex;
  border: 1px solid #ccc;
  &:hover {
    background-color: rgb(239, 243, 244);
  }
`;

// Post container
const PostContainer = styled.div`
  max-width: 550px;
  max-height: 400px;
  margin: 20px;
  display: flex;
`;

// User Profile Picture container
const ProfilePicContainer = styled.div`
  margin-right: 12px;
  height: 100%;
  max-width: 10%;
  display: flex;
  justify-content: center;
`;

// Post Body
const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 90%;
  padding-bottom: 12px;
`;

// Post Author
const PostAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 5%;
  width: 100%;
  flex-wrap: nowrap;
`;

// Meatball menu
const MenuWrapper = styled.div`
  display: flex;
  max-height: 100%;
  align-items: center;
  justify-content: end;
`;

const Menu = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }
`;

const Circle = styled.div`
  width: 3px;
  height: 3px;
  margin: 0 1px 1px;
  border-radius: 50%;
  background-color: #6c757d;
  display: block;
`;

// Post content
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 95%;
`;

// Post title
const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  max-height: 10%;
`;

// Post Media
const PostMedia = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 80%;
`;

// Post Action
const PostAction = styled.div`
  display: flex;
  width: 100%;
  max-height: 5%;
  flex-direction: row;
  margin: 20px auto;
  justify-content: space-between;
`;

// Action div
const Action = styled.div`
  width: 20px;
  margin-right: 100px;
`;

// interface PostProps {
//   title: string;
// }

const Posts = () => {
  //   const { title } = props;
  return (
    <div className="container">
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
                  flexDirection: "row",
                  fontSize: "15px",
                }}
              >
                <div> Trung Tran @TrungTran </div> {/* Author */}
                <span style={{ margin: "auto 5px" }}>.</span>
                <div> 20m</div> {/* Time posted */}
              </div>

              <MenuWrapper>
                <Menu>
                  <div
                    style={{
                      display: "flex",
                      minHeight: "20%",
                      flexShrink: 0,
                    }}
                  >
                    <Circle></Circle>
                    <Circle></Circle>
                    <Circle></Circle>
                  </div>
                </Menu>
              </MenuWrapper>
            </PostAuthor>

            {/* Main content of the post */}
            <PostContent>
              <PostTitle>
                {/* {title} */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do
                </p>
              </PostTitle>

              {/* Media of the post */}
              <PostMedia>
                <img
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    margin: "10px auto",
                    borderRadius: "20px",
                  }}
                  src={PostImage}
                  alt="post pic"
                />
              </PostMedia>

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
    </div>
  );
};

export default Posts;

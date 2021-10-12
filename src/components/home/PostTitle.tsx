import React, { FC } from "react";
import styled from "styled-components";

// Post title
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
`;

interface titleProps {
  title: string;
}

const PostTitle: FC<titleProps> = (props) => {
  const title = props.title;
  return (
    <TitleContainer>
      <p style={{ wordBreak: "break-word" }}>{title}</p>
    </TitleContainer>
  );
};

export default PostTitle;

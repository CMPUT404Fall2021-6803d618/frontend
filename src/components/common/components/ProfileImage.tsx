import React, { FC } from "react";
import styled from "styled-components";

const ProfileImageDiv = styled.div<{ size: number; color: string }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
  }
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: ${(props) => props.size / 2}px;
    background-color: ${(props) => props.color};
    color: white;
  }
`;

interface IProps {
  src?: string;
  size?: number;
  name?: string;
  color?: string;
}

const ProfileImage: FC<IProps> = ({ src, size = 50, name = "Name", color = "darkolivegreen" }) => {
  return (
    <ProfileImageDiv size={size} color={color}>
      {src ? (
        <img src={src} />
      ) : (
        <div>
          <div>{name[0]}</div>
        </div>
      )}
    </ProfileImageDiv>
  );
};

export default ProfileImage;

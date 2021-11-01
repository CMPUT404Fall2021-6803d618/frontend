import React, { FC, useCallback, useState, MouseEvent } from "react";
import styled, { css, keyframes } from "styled-components";

const heartBurst = keyframes`
  from {
    background-position:left;
  }
  to { 
    background-position:right;
  }
`;

const Heart = styled.button<{ liked: boolean; shouldAnimate: boolean }>`
  cursor: pointer;
  height: 50px;
  width: 50px;
  background-image: url("./images/web_heart_animation.png");
  background-repeat: no-repeat;
  background-size: 2900%;
  border: none;
  background-color: transparent;
  background-position: ${(props) => (props.liked ? "right" : "left")};
  ${(props) =>
    props.shouldAnimate &&
    css`
      animation: ${heartBurst} 0.8s steps(28) 1;
    `}
`;

interface IProps {
  liked: boolean;
  onClick: () => Promise<void>;
}

const LikeButton: FC<IProps> = (props) => {
  const { liked, onClick } = props;
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!liked) {
        onClick();
        setShouldAnimate(true);
      }
    },
    [liked, onClick]
  );

  return <Heart liked={liked} shouldAnimate={shouldAnimate} onClick={handleClick} />;
};

export default LikeButton;

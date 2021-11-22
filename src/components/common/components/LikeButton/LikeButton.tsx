import React, { FC, useCallback, useState, MouseEvent, useMemo } from "react";
import "./LikeButton.style.css";
import classnames from "classnames";
import { IconButton } from "@mui/material";
import styled from "styled-components";

const Button = styled(IconButton)`
  width: 40px;
  height: 40px;
  transition: background-color 150ms linear !important;
  &:hover {
    background-color: rgba(226, 38, 77, 0.1) !important;
  }
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

  const className = useMemo(() => {
    return classnames("heart", { liked, animate: shouldAnimate });
  }, [liked, shouldAnimate]);

  return (
    <Button onClick={handleClick}>
      <div className={className} />
    </Button>
  );
};

export default LikeButton;

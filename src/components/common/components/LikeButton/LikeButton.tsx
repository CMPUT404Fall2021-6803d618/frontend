import React, { FC, useCallback, useState, MouseEvent, useMemo } from "react";
import "./LikeButton.style.css";
import classnames from "classnames";
import { IconButton } from "@mui/material";
import styled from "styled-components";

const Button = styled(IconButton)`
  display: flex;
  width: fit-content;
  padding: 0;
  &:hover {
    background-color: transparent;
    & > div {
      background-color: rgba(226, 38, 77, 0.1) !important;
      & > div {
        background-position: right;
      }
    }
    & > span {
      color: rgb(226, 38, 77);
    }
  }
  & > div {
    width: 40px;
    height: 40px;
    transition: background-color 150ms linear !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  & > span {
    font-size: 16px;
    font-family: "Yantramanav", sans-serif;
    margin-left: 4px;
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

interface IProps {
  liked: boolean;
  count?: number;
  onClick: () => Promise<void>;
}

const LikeButton: FC<IProps> = (props) => {
  const { liked, onClick, count } = props;
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
    <Button onClick={handleClick} disableRipple>
      <div>
        <div className={className} />
      </div>
      <span className={classnames("", { liked })}>{count ?? 0}</span>
    </Button>
  );
};

export default LikeButton;

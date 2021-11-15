import React, { useCallback, MouseEvent, FC } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/TextsmsOutlined";

const Button = styled(IconButton)`
  width: 40px;
  height: 40px;
  transition: all 150ms linear !important;
  &:hover {
    color: rgb(29, 155, 240);
    background-color: rgba(29, 155, 240, 0.1) !important;
  }
`;

interface IProps {
  onClick: () => Promise<void>;
}

const CommentButton: FC<IProps> = (props) => {
  const { onClick } = props;

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <Button onClick={handleClick}>
      <CommentIcon fontSize="small" />
    </Button>
  );
};

export default CommentButton;

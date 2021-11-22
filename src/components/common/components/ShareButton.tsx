import React, { useCallback, MouseEvent, FC } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const Button = styled(IconButton)`
  width: 40px;
  height: 40px;
  transition: all 150ms linear !important;
  &:hover {
    color: rgb(0, 186, 124);
    background-color: rgba(0, 186, 124, 0.1) !important;
  }
`;

interface IProps {
  onClick: () => void;
}

const ShareButton: FC<IProps> = (props) => {
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
      <ShareIcon fontSize="small" />
    </Button>
  );
};

export default ShareButton;

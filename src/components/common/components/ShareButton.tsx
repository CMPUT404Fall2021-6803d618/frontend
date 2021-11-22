import React, { useCallback, MouseEvent, FC, useState, useMemo } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import PopoverMenu, { PopoverMenuItem } from "components/PopoverMenu";
import { Visibility } from "shared/enums";

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
  onFriendsClick: () => void;
  onFollowersClick: () => void;
  postVisibility: Visibility;
}

const ShareButton: FC<IProps> = (props) => {
  const { onFriendsClick, onFollowersClick, postVisibility } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const followersMenuItem: PopoverMenuItem = useMemo(
    () => ({
      text: "Followers",
      onClick: onFollowersClick,
    }),
    [onFollowersClick]
  );
  const friendsMenuItem: PopoverMenuItem = useMemo(
    () => ({
      text: "Friends",
      onClick: onFriendsClick,
    }),
    [onFriendsClick]
  );

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const getMenuItems = useCallback(() => {
    if (postVisibility === Visibility.PUBLIC) {
      return [followersMenuItem, friendsMenuItem];
    } else {
      return [friendsMenuItem];
    }
  }, [followersMenuItem, friendsMenuItem, postVisibility]);

  return (
    <>
      <Button onClick={handleClick}>
        <ShareIcon fontSize="small" />
      </Button>
      <PopoverMenu onClose={handleMenuClose} items={getMenuItems()} anchorEl={anchorEl} />
    </>
  );
};

export default ShareButton;

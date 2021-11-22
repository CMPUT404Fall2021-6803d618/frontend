import React, { FC, useState, MouseEvent, useCallback } from "react";
import styled from "styled-components";
import MeatballIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import PopoverMenu, { PopoverMenuItem } from "components/PopoverMenu";

const MeatballButton = styled(IconButton)`
  padding: 0 !important;
  height: 40px;
  width: 40px;
`;

interface MenuProps {
  items: PopoverMenuItem[];
}

const MeatballMenu: FC<MenuProps> = (props) => {
  const { items } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleMenuClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <MeatballButton onClick={handleMenuClick}>
        <MeatballIcon />
      </MeatballButton>
      <PopoverMenu anchorEl={anchorEl} onClose={handleMenuClose} items={items} />
    </>
  );
};

export default MeatballMenu;

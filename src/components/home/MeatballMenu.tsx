/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, useState, MouseEvent, useCallback } from "react";
import styled from "styled-components";
import Popover from "@mui/material/Popover";
import MeatballIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

const MeatballButton = styled(IconButton)`
  padding: 0 !important;
  height: 40px;
  width: 40px;
`;

interface MenuProps {
  items: {
    text: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    onClick: () => void;
  }[];
}

const MeatballMenu: FC<MenuProps> = (props) => {
  const { items } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnchorEl(null);
  }, []);

  return (
    <>
      <MeatballButton onClick={handleMenuClick}>
        <MeatballIcon />
      </MeatballButton>
      <Popover
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuList>
          {items.map((item) => {
            const { text, Icon, onClick } = item;
            const handleClick = (e: MouseEvent<HTMLLIElement>): void => {
              e.preventDefault();
              onClick();
              setAnchorEl(null);
            };
            return (
              <MenuItem key={`menu-item-${text}`} onClick={handleClick}>
                <ListItemIcon>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Popover>
    </>
  );
};

export default MeatballMenu;

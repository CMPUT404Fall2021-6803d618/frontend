/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, useState, MouseEvent, useCallback } from "react";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import MeatballIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";

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

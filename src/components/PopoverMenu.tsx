/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, MouseEvent, useCallback } from "react";
import Popover from "@mui/material/Popover";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export interface PopoverMenuItem {
  text: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onClick: () => void;
}

interface IProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  items: PopoverMenuItem[];
}

const PopoverMenu: FC<IProps> = (props) => {
  const { anchorEl, onClose, items } = props;
  const menuOpen = Boolean(anchorEl);

  const handleMenuClose = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  return (
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
        horizontal: "right",
      }}
    >
      <MenuList>
        {items.map((item) => {
          const { text, Icon, onClick } = item;
          const handleClick = (e: MouseEvent<HTMLLIElement>): void => {
            e.preventDefault();
            onClick();
            onClose();
          };
          return (
            <MenuItem key={`menu-item-${text}`} onClick={handleClick}>
              {Icon && (
                <ListItemIcon>
                  <Icon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </MenuList>
    </Popover>
  );
};

export default PopoverMenu;

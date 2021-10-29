import React, { FC, useState, MouseEvent, useCallback, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Meatball menu
const MenuWrapper = styled.div`
  display: flex;
  max-height: 100%;
  width: 50px;
  align-items: center;
  justify-content: end;
`;

const StyledMenu = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }
`;

const Circle = styled.div`
  width: 3px;
  height: 3px;
  margin: 0 1px 1px;
  border-radius: 50%;
  background-color: #6c757d;
  display: block;
`;

// popup
const StyledPaper = styled(Paper)`
  max-width: 400px;
  max-height: 400px;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// popup Action
const ActionBox = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  &:hover {
    background-color: rgb(239, 243, 244);
  }
`;

// Dialog Content
const StyledDialogContent = styled(DialogContent)`
  width: 600px;
  min-height: 200px;
  text-align: justify;
`;

// styled input
const Input = styled.textarea`
  width: 550px;
  min-height: 200px;
  border: 0;
  font-size: 15px;
`;

interface MenuProps {
  content: string;
  onSave: (value: string) => Promise<void>;
}

const MeatballMenu: FC<MenuProps> = (props) => {
  const [value, setValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const { onSave, content } = props;
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    setValue(content);
  }, [content]);

  // menu handle open/close
  const handleMenuClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnchorEl(null);
  }, []);

  // Dialog handle open/close (?)
  const handleOpenEdit = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen(true);
  }, []);

  const handleCloseEdit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      // console.log(dialogOpen);
      e.stopPropagation();
      e.preventDefault();
      setDialogOpen(false);
      onSave(value);
      handleMenuClose(e);
    },
    [handleMenuClose, onSave, value]
  );

  const handleValueChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <MenuWrapper>
      <StyledMenu>
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
          onClick={handleMenuClick}
        >
          <Circle></Circle>
          <Circle></Circle>
          <Circle></Circle>
        </div>
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
          <StyledPaper>
            <ActionBox>
              <Delete style={{ margin: "10px" }}></Delete>
              <Typography style={{ margin: "10px" }}>Delete</Typography>
            </ActionBox>
            <ActionBox onClick={handleOpenEdit}>
              <Edit style={{ margin: "10px" }}></Edit>
              <Typography style={{ margin: "10px" }}>Edit</Typography>
              <Dialog onClose={handleCloseEdit} open={dialogOpen}>
                <DialogTitle>Edit Your Post</DialogTitle>
                <StyledDialogContent dividers>
                  <Input value={value} onChange={handleValueChange} />
                </StyledDialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit}>Save Changes</Button>
                </DialogActions>
              </Dialog>
            </ActionBox>
          </StyledPaper>
        </Popover>
      </StyledMenu>
    </MenuWrapper>
  );
};

export default MeatballMenu;

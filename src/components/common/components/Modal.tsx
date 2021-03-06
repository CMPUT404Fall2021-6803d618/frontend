/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import MuiModal from "@mui/material/Modal";
import React, { Fragment, ReactNode, useCallback, useState, FC } from "react";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Zoom from "@mui/material/Zoom";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import theme from "theme";

const ModalWrapper = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled(Card)`
  position: relative;
  z-index: 9999;
  display: flex;
  min-height: 200px;
  max-height: calc(100% - 64px);
  margin: 32px;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    height 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Nunito Sans";
`;

const SuccessIcon = styled(CheckCircleIcon)`
  font-size: 2rem !important;
  color: #74d99f;
`;

const FadeLoading = styled.div`
  position: absolute;
`;

const CloseIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

interface IProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onExit?: () => void;
  children?: ReactNode;
  actionOption?: {
    onClick: () => Promise<T>;
    onSuccess: (res: T) => void;
    text: string;
  };
  closeVariant?: "button" | "icon";
}

enum State {
  IDLE,
  IN_PROGRESS,
  SUCCESS,
}

const Modal = <T extends object | void>(props: IProps<T>) => {
  const { title, open, onClose, actionOption, children, closeVariant = "button", onExit } = props;
  const [state, setState] = useState<State>(State.IDLE);

  const handleClose = useCallback(() => {
    if (state === State.IDLE) {
      onClose();
    }
  }, [onClose, state]);

  const handleClick = useCallback(async () => {
    if (actionOption) {
      setState(State.IN_PROGRESS);
      try {
        const res = await actionOption.onClick();
        setState(State.SUCCESS);
        setTimeout(() => {
          actionOption.onSuccess(res);
        }, 500);
      } catch (err) {
        setState(State.IDLE);
      }
    }
  }, [actionOption]);

  const handleExit = useCallback(() => {
    setState(State.IDLE);
    onExit?.();
  }, [onExit]);

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Fade in={open} onExited={handleExit}>
        <ModalBody>
          {state === State.SUCCESS ? (
            <Zoom in={true} unmountOnExit>
              <SuccessIcon />
            </Zoom>
          ) : (
            <Fragment>
              <Fade in={state === State.IDLE}>
                <Card
                  sx={{
                    width: "100%",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: `${theme.palette.background.default}`,
                  }}
                >
                  {closeVariant === "icon" && (
                    <CloseIconButton onClick={handleClose}>
                      <CloseIcon fontSize="small" />
                    </CloseIconButton>
                  )}
                  <CardContent
                    sx={{
                      flex: 1,
                      padding: 0,
                      margin: 2,
                      overflowY: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title>{title}</Title>
                    {children}
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    {closeVariant === "button" && (
                      <Button onClick={handleClose} variant="outlined">
                        Cancel
                      </Button>
                    )}
                    {actionOption && (
                      <Button onClick={handleClick} variant="contained">
                        {actionOption.text}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Fade>
              <Fade in={state === State.IN_PROGRESS} unmountOnExit>
                <FadeLoading>
                  <CircularProgress />
                </FadeLoading>
              </Fade>
            </Fragment>
          )}
        </ModalBody>
      </Fade>
    </ModalWrapper>
  );
};

export default Modal;

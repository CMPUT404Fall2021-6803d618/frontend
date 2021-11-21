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
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const ModalWrapper = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  z-index: 9999;
  display: flex;
  min-width: 350px;
  min-height: 200px;
  max-height: calc(100% - 100px);
  margin: 1rem;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Nunito Sans";
`;

const Footer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  background-color: rgb(242, 243, 245);
  border-radius: 0 0 5px 5px;
  width: 100%;
`;

const SuccessIcon = styled(CheckCircleIcon)`
  font-size: 2rem !important;
  color: #74d99f;
`;

const FadeContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FadeLoading = styled.div`
  position: absolute;
`;

interface IProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  actionOption?: {
    onClick: () => Promise<T>;
    onSuccess: (res: T) => void;
    text: string;
  };
}

enum State {
  IDLE,
  IN_PROGRESS,
  SUCCESS,
}

const Modal = <T extends object | void>(props: IProps<T>) => {
  const { title, open, onClose, actionOption, children } = props;
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

  const handleExit = () => {
    setState(State.IDLE);
  };

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Zoom in={open} onExited={handleExit}>
        <ModalBody>
          {state === State.SUCCESS ? (
            <Zoom in={true} unmountOnExit>
              <SuccessIcon />
            </Zoom>
          ) : (
            <Fragment>
              <Fade in={state === State.IDLE}>
                <Card sx={{ minWidth: 300, maxWidth: 500, width: "90vw" }}>
                  <CardContent>
                    <Title>{title}</Title>
                    {children}
                  </CardContent>
                  <CardActions>
                    <Button onClick={handleClose} variant="outlined">
                      Cancel
                    </Button>
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
      </Zoom>
    </ModalWrapper>
  );
};

export default Modal;

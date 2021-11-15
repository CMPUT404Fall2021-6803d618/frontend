/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import MuiModal from "@material-ui/core/Modal";
import React, { Fragment, ReactNode, useCallback, useState, FC } from "react";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Zoom from "@material-ui/core/Zoom";
import Backdrop from "@material-ui/core/Backdrop";

const ModalWrapper = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  display: flex;
  background-color: white;
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
                <FadeContent>
                  <Content>
                    <Title>{title}</Title>
                    {children}
                  </Content>
                  <Footer>
                    <button onClick={handleClose}>Cancel</button>
                    {actionOption && <button onClick={handleClick}>{actionOption.text}</button>}
                  </Footer>
                </FadeContent>
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

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Loading from "components/common/components/Loading";
import useSocial from "hooks/SocialHook";
import React, { FC, useCallback, useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { Comment as IComment, Like, Post } from "shared/interfaces";
import Modal from "../common/components/Modal";
import styled from "styled-components";
import useComment from "hooks/CommentHook";
import { useAuthStore } from "hooks/AuthStoreHook";
import CircularProgress from "@mui/material/CircularProgress";
import Comment from "./Comment";
import useLike from "hooks/LikeHook";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: hidden;
`;

const CommentListContainer = styled.div`
  overflow-y: scroll;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  & > button {
    width: fit-content;
    margin-top: 1rem;
    align-self: flex-end;
    position: relative;
  }
`;

const CommentSpan = styled.span<{ isSending: boolean }>`
  visibility: ${(props) => (props.isSending ? "hidden" : "visible")};
`;

interface IProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  liked: Like[] | null;
}

enum State {
  IDLE,
  SENDING,
  IN_PROGRESS,
}

const CommentModal: FC<IProps> = (props) => {
  const { open, onClose, post, liked } = props;
  const { user } = useAuthStore();
  const [comments, setComments] = useState<IComment[] | null>(null);
  const { getComments, sendComment } = useComment(user);
  const { likeComment, getLikes } = useLike();
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [state, setState] = useState<State>(State.IDLE);

  const loadData = useCallback(async () => {
    if (liked && post) {
      const commentsData = await getComments(post.id);
      const likes = await Promise.all(commentsData.map((c) => getLikes(c.id)));
      setComments(
        commentsData.map((comment, index) => ({
          ...comment,
          liked: !!liked.find((l) => l.object === comment.id),
          likeCount: likes[index].length,
        }))
      );
    }
  }, [getComments, getLikes, liked, post]);

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [loadData, open]);

  useEffect(() => {
    if (state === State.SENDING && post && value.length > 0 && comments) {
      setState(State.IN_PROGRESS);
      sendComment(post.id, value)
        .then((comment) => {
          setComments([{ ...comment, liked: false }, ...comments]);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setValue("");
          setState(State.IDLE);
        });
    }
  }, [comments, post, sendComment, state, value]);

  const handleClose = useCallback(() => {
    if (state === State.IDLE) {
      onClose();
    } else {
      console.log("Can't close now. Sent comment request is not resolved yet.");
    }
  }, [onClose, state]);

  const handleSendComment = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (value.length > 0) {
        setState(State.SENDING);
      } else {
        setIsError(true);
      }
    },
    [value]
  );

  const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setIsError(false);
  }, []);

  const handleExit = useCallback(() => {
    setComments(null);
    setValue("");
    setIsError(false);
    setState(State.IDLE);
  }, []);

  const handleLikeComment = useCallback(
    async (comment: IComment) => {
      if (comments && post) {
        const index = comments.findIndex((c) => c.id === comment.id);
        if (index !== -1) {
          const likedComment = await likeComment(post.author, comment);
          const newComments = [...comments];
          newComments[index] = { ...likedComment };
          setComments(newComments);
        }
      }
    },
    [comments, likeComment, post]
  );

  return (
    <Modal
      title="Comments"
      open={open}
      onClose={handleClose}
      closeVariant="icon"
      onExit={handleExit}
    >
      <Container>
        {comments ? (
          <>
            <Form>
              <TextField
                fullWidth
                multiline
                placeholder={"Add a comment"}
                maxRows={5}
                error={isError}
                onChange={handleValueChange}
                helperText={isError && "Cannot send empty comment"}
                value={value}
                disabled={state !== State.IDLE}
              />
              <Button
                type="submit"
                variant="contained"
                onClick={handleSendComment}
                disabled={state !== State.IDLE}
              >
                <CommentSpan isSending={state !== State.IDLE}>Comment</CommentSpan>
                {state !== State.IDLE && (
                  <CircularProgress size={20} sx={{ position: "absolute", margin: "auto" }} />
                )}
              </Button>
            </Form>
            <Typography variant="subtitle1" gutterBottom marginTop={2} fontWeight={700}>
              All Comments ({comments.length})
            </Typography>
            <CommentListContainer>
              <Stack spacing={1}>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Comment
                      key={`comment-${comment.id}`}
                      comment={comment}
                      onLike={handleLikeComment}
                    />
                  ))
                ) : (
                  <Typography color={"rgba(255,255,255,0.3)"}>No comments</Typography>
                )}
              </Stack>
            </CommentListContainer>
          </>
        ) : (
          <Loading />
        )}
      </Container>
    </Modal>
  );
};

export default CommentModal;

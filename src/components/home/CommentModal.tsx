import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import Loading from "components/common/components/Loading";
import useSocial from "hooks/SocialHook";
import React, { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { Comment, Post } from "shared/interfaces";
import Modal from "../common/components/Modal";
import styled from "styled-components";
import useComment from "hooks/CommentHook";
import { useAuthStore } from "hooks/AuthStoreHook";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CommentListContainer = styled.div`
  display: flex;
`;

interface IProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
}

const CommentModal: FC<IProps> = (props) => {
  const { open, onClose, post } = props;
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const { getComments } = useComment(user);

  useEffect(() => {
    post && getComments(post.id).then((data) => setComments(data));
  }, [getComments, post]);

  const handleClose = useCallback(() => {
    setComments(null);
    onClose();
  }, [onClose]);

  return (
    <Modal title="Comments" open={open} onClose={handleClose}>
      <Container>
        {comments ? (
          <>
            <TextField fullWidth multiline placeholder={"Add a comment"} />
            <Typography variant="subtitle1" gutterBottom marginTop={2} fontWeight={700}>
              All Comments ({comments.length})
            </Typography>
            <CommentListContainer>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={`comment-${index}`}>{comment.comment}</div>
                ))
              ) : (
                <Typography color={"rgba(255,255,255,0.3)"}>No comments</Typography>
              )}
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

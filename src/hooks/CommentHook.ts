import { useMemo, useCallback } from "react";
import CommentService from "services/CommentService";
import { Comment, User } from "shared/interfaces";

interface ICommentHook {
  getComments: (postId: string) => Promise<Comment[]>;
  sendComment: (postId: string, value: string) => Promise<Comment | null>;
}

const useComment = (user: User | null): ICommentHook => {
  const commentService = useMemo(() => new CommentService(), []);

  const getComments = useCallback(
    async (postId: string) => {
      return commentService.getComments(postId);
    },
    [commentService]
  );

  const sendComment = useCallback(
    async (postId: string, value: string) => {
      if (user) {
        const comment = await commentService.sendComment(postId, user, value);
        return comment;
      } else {
        alert("Please log in to comment");
        return null;
      }
    },
    [commentService, user]
  );

  return {
    getComments,
    sendComment,
  };
};

export default useComment;

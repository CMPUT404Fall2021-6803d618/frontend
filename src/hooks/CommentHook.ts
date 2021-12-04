import { useMemo, useCallback } from "react";
import CommentService from "services/CommentService";
import { CommentObject, User } from "shared/interfaces";

interface ICommentHook {
  getComments: (postId: string) => Promise<CommentObject[]>;
  sendComment: (postId: string, value: string) => Promise<CommentObject>;
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
        throw new Error("Please log in to comment");
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

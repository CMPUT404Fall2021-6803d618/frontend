import { useMemo, useCallback } from "react";
import LikeService from "services/LikeService";
import { Author, Comment, Like, Post } from "shared/interfaces";
import { useAuthStore } from "./AuthStoreHook";

interface ILikeHook {
  getLiked: () => Promise<Like[]>;
  getLikes: (id: string) => Promise<Like[]>;
  likePost: (receiver: Author, post: Post) => Promise<Post>;
  likeComment: (receiver: Author, comment: Comment) => Promise<Comment>;
}

const useLike = (): ILikeHook => {
  const { user } = useAuthStore();
  const likeService = useMemo(() => new LikeService(), []);

  const getLiked = useCallback(() => {
    if (user) {
      return likeService.getLiked(user.id);
    } else {
      throw Error("Not logged in");
    }
  }, [likeService, user]);

  const getLikes = useCallback(
    async (id: string) => {
      return likeService.getLikes(id);
    },
    [likeService]
  );

  const likePost = useCallback(
    async (receiver: Author, post: Post) => {
      if (user && !post.liked) {
        await likeService.sendLike(user, receiver, post.id, "post");
        return {
          ...post,
          liked: true,
          likeCount: post.likeCount ? post.likeCount + 1 : 1,
        };
      } else {
        throw Error("Not logged in");
      }
    },
    [likeService, user]
  );

  const likeComment = useCallback(
    async (receiver: Author, comment: Comment) => {
      if (user && !comment.liked) {
        await likeService.sendLike(user, receiver, comment.id, "comment");
        return {
          ...comment,
          liked: true,
          likeCount: comment.likeCount ? comment.likeCount + 1 : 1,
        };
      } else {
        throw Error("Not logged in");
      }
    },
    [likeService, user]
  );

  return {
    getLiked,
    getLikes,
    likePost,
    likeComment,
  };
};

export default useLike;

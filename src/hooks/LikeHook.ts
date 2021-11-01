import { useMemo, useCallback } from "react";
import LikeService from "services/LikeService";
import { Author, Like, Post } from "shared/interfaces";
import { useAuthStore } from "./AuthStoreHook";

interface ILikeHook {
  getLiked: () => Promise<Like[]>;
  getLikes: (id: string) => Promise<Like[]>;
  likePost: (receiver: Author, post: Post) => Promise<Post>;
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
        await likeService.sendLike(user, receiver, post);
        return {
          ...post,
          liked: true,
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
  };
};

export default useLike;

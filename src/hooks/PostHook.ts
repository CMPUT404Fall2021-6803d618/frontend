import { useMemo, useCallback } from "react";
import { PaginateResponse } from "services/BaseService";
import { PostPayload, PostService } from "services/PostService";
import { PostObject, Author } from "shared/interfaces";

interface IPostHook {
  getPosts: () => Promise<PostObject[]>;
  getStreamPosts: (page: number) => Promise<Pick<PaginateResponse<PostObject>, "count" | "items">>;
  getPostById: (id: string) => Promise<PostObject>;
  createPost: (payload: PostPayload) => Promise<PostObject | null>;
  updatePost: (post: PostObject, newContent: string) => Promise<PostObject | null>;
  deletePost: (post: PostObject) => Promise<void>;
  sharePostToFriends: (post: PostObject, friends: Author[]) => Promise<void>;
  sharePostToFollowers: (post: PostObject) => Promise<void>;
}

const usePost = (user: Author | null): IPostHook => {
  const postService = useMemo(() => new PostService(), []);

  const getPosts = useCallback(async () => {
    if (user) {
      const data = await postService.getPosts(user.id);
      return data;
    } else {
      return [];
    }
  }, [postService, user]);

  const getStreamPosts = useCallback(
    async (page: number) => {
      if (user) {
        const data = await postService.getStreamPosts(user.id, page);
        return data;
      } else {
        return { count: 0, items: [] };
      }
    },
    [postService, user]
  );

  const getPostById = useCallback(
    async (id: string) => {
      const data = await postService.getPostById(id);
      return data;
    },
    [postService]
  );

  const createPost = useCallback(
    async (payload: PostPayload) => {
      if (user) {
        const post = await postService.createPost(user.id, payload);
        return post;
      } else {
        return null;
      }
    },
    [postService, user]
  );

  const updatePost = useCallback(
    async (post: PostObject, newContent: string) => {
      const { title, description, contentType, content, visibility, unlisted } = post;
      if (content !== newContent) {
        const payload = {
          title,
          description,
          contentType,
          content: newContent,
          visibility,
          unlisted,
        };
        const newPost = await postService.updatePost(post.id, payload);
        return newPost;
      } else {
        return null;
      }
    },
    [postService]
  );

  const deletePost = useCallback(
    async (post: PostObject) => {
      postService.deletePost(post.id);
    },
    [postService]
  );

  const sharePostToFriends = useCallback(
    async (post: PostObject, friends: Author[]) => {
      postService.sharePostToFriends(post.id, friends);
    },
    [postService]
  );

  const sharePostToFollowers = useCallback(
    async (post: PostObject) => {
      postService.sharePostToFollowers(post.id);
    },
    [postService]
  );

  return {
    getPosts,
    getStreamPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    sharePostToFriends,
    sharePostToFollowers,
  };
};

export default usePost;

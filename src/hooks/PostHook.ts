import { useMemo, useCallback } from "react";
import { PostPayload, PostService, StreamPostService } from "services/PostService";
import { PostObject, Author } from "shared/interfaces";

interface IPostHook {
  getPosts: () => Promise<PostObject[]>;
  getStreamPosts: () => Promise<PostObject[]>;
  getPostById: (id: string) => Promise<PostObject>;
  createPost: (payload: PostPayload) => Promise<PostObject | null>;
  updatePost: (post: PostObject, newContent: string) => Promise<PostObject | null>;
  deletePost: (post: PostObject) => Promise<void>;
}

const usePost = (user: Author | null): IPostHook => {
  const postService = useMemo(() => new PostService(), []);
  const streamPostService = useMemo(() => new StreamPostService(), []);

  const getPosts = useCallback(async () => {
    if (user) {
      const data = await postService.getPosts(user.id);
      return data;
    } else {
      return [];
    }
  }, [postService, user]);

  const getStreamPosts = useCallback(async () => {
    if (user) {
      const data = await streamPostService.getPosts(user.id);
      return data;
    } else {
      return [];
    }
  }, [streamPostService, user]);

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

  return {
    getPosts,
    getStreamPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePost;

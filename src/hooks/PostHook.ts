import { useMemo, useCallback } from "react";
import { PostPayload, PostService } from "services/PostService";
import { Post, Author } from "shared/interfaces";

interface IPostHook {
  getPosts: () => Promise<Post[]>;
  getPostById: (id: string) => Promise<Post>;
  createPost: (payload: PostPayload) => Promise<Post | null>;
  updatePost: (post: Post, newContent: string) => Promise<Post | null>;
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
    async (post: Post, newContent: string) => {
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

  return {
    getPosts,
    getPostById,
    createPost,
    updatePost,
  };
};

export default usePost;

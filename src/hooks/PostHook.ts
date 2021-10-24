import { useMemo, useCallback, useState, useEffect } from "react";
import { PostPayload, PostService } from "services/PostService";
import { Post } from "shared/interfaces";
import { useAuthStore } from "./AuthStoreHook";

interface IPostHook {
  posts: Post[] | null;
  handleCreatePost: (payload: PostPayload) => Promise<void>;
  handleUpdatePost: (post: Post, newContent: string) => Promise<void>;
}

const usePost = (): IPostHook => {
  const { user } = useAuthStore();
  const postService = useMemo(() => new PostService(), []);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const loadData = useCallback(async () => {
    if (user) {
      const data = await postService.getPosts(user.id);
      setPosts(data);
    } else {
      setPosts([]);
    }
  }, [postService, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreatePost = useCallback(
    async (payload: PostPayload) => {
      if (user && posts) {
        const post = await postService.createPost(user.id, payload);
        setPosts([post, ...posts]);
      }
    },
    [postService, posts, user]
  );

  const handleUpdatePost = useCallback(
    async (post: Post, newContent: string) => {
      const { title, description, contentType, content, visibility, unlisted } = post;
      if (content !== newContent && posts !== null) {
        const payload = {
          title,
          description,
          contentType,
          content: newContent,
          visibility,
          unlisted,
        };
        const newPost = await postService.updatePost(post.id, payload);
        const index = posts?.findIndex((p) => p.id === post.id);
        const newPosts = [...posts];
        newPosts[index] = { ...newPost };
        setPosts(newPosts);
      }
    },
    [postService, posts]
  );

  return {
    posts,
    handleCreatePost,
    handleUpdatePost,
  };
};

export default usePost;

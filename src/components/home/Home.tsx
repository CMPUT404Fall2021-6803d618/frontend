import Loading from "components/common/components/Loading";
import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import React, { FC, useCallback, useState, useEffect } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { Post as IPost } from "shared/interfaces";

const Home: FC = () => {
  const { user } = useAuthStore();
  const { deletePost, updatePost, getPosts } = usePost(user);
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, [getPosts]);

  const handleUpdatePost = useCallback(
    async (post: IPost, newContent: string) => {
      const { content } = post;
      if (content !== newContent && posts !== null) {
        const newPost = await updatePost(post, newContent);
        if (newPost) {
          const index = posts?.findIndex((p) => p.id === post.id);
          const newPosts = [...posts];
          newPosts[index] = { ...newPost };
          setPosts(newPosts);
        }
      }
    },
    [posts, updatePost]
  );

  const handleDeletePost = useCallback(
    async (post: IPost) => {
      if (posts !== null) {
        await deletePost(post);
        setPosts(posts.filter((newPost) => newPost.id !== post.id));
      }
    },
    [posts, deletePost]
  );

  const render = useCallback(() => {
    if (posts === null) {
      return <Loading />;
    } else if (posts.length === 0) {
      return <div>No posts</div>;
    } else {
      return posts.map((post) => {
        return <Post key={post.id} post={post} onUpdate={handleUpdatePost} onDelete={handleDeletePost} />;
      });
    }
  }, [handleDeletePost, handleUpdatePost, posts]);

  return (
    <div className="container">
      <Link to="/posts/create">Create Post</Link>
      {render()}
    </div>
  );
};

export default Home;

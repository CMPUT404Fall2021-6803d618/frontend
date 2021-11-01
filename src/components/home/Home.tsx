import Loading from "components/common/components/Loading";
import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import React, { FC, useCallback, useState, useEffect } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { Post as IPost } from "shared/interfaces";
import useLike from "hooks/LikeHook";

const Home: FC = () => {
  const { user } = useAuthStore();
  const { deletePost, updatePost, getPosts } = usePost(user);
  const { getLiked, likePost } = useLike();
  const [posts, setPosts] = useState<IPost[] | null>(null);

  const loadData = useCallback(async () => {
    const [postsData, likedData] = await Promise.all([getPosts(), getLiked()]);
    const newPosts = postsData.map((post) => {
      console.log(likedData);
      const liked = likedData.find((l) => l.object === post.id);
      return {
        ...post,
        liked: !!liked,
      };
    });
    setPosts(newPosts);
  }, [getPosts, getLiked]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdatePost = useCallback(
    async (post: IPost, newContent: string) => {
      const { content } = post;
      if (content !== newContent && posts !== null) {
        const newPost = await updatePost(post, newContent);
        if (newPost) {
          const index = posts?.findIndex((p) => p.id === post.id);
          const newPosts = [...posts];
          newPosts[index] = { ...post, ...newPost };
          setPosts(newPosts);
        }
      }
    },
    [posts, updatePost]
  );

  const handleLikePost = useCallback(
    async (post: IPost) => {
      if (posts) {
        const index = posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          const likedPost = await likePost(post.author, post);
          const newPosts = [...posts];
          newPosts[index] = { ...likedPost };
          setPosts(newPosts);
        }
      }
    },
    [likePost, posts]
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
        return (
          <Post
            key={post.id}
            post={post}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
            onLike={handleLikePost}
          />
        );
      });
    }
  }, [handleDeletePost, likePost, handleUpdatePost, posts]);

  return (
    <div className="container">
      <Link to="/posts/create">Create Post</Link>
      {render()}
    </div>
  );
};

export default Home;

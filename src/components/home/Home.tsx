import Loading from "components/common/components/Loading";
import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import React, { FC, useCallback, useState, useEffect } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { Post as IPost } from "shared/interfaces";
import useLike from "hooks/LikeHook";
import EditPostModal from "./EditPostModal";
import ShareModal from "./ShareModal";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  padding: 12px;
  overflow-y: scroll;
`;

const Home: FC = () => {
  const { user } = useAuthStore();
  const { deletePost, updatePost, getPosts } = usePost(user);
  const { getLiked, likePost } = useLike();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const loadData = useCallback(async () => {
    if (user) {
      const [postsData, likedData] = await Promise.all([getPosts(), getLiked()]);
      const newPosts = postsData.map((post) => {
        const liked = likedData.find((l) => l.object === post.id);
        return {
          ...post,
          liked: !!liked,
        };
      });
      setPosts(newPosts);
    }
  }, [user, getPosts, getLiked]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdatePost = useCallback(
    async (newContent: string) => {
      if (selectedPost) {
        const { content } = selectedPost;
        if (content !== newContent && posts !== null) {
          await updatePost(selectedPost, newContent);
        }
      }
    },
    [selectedPost, posts, updatePost]
  );

  const handleUpdatePostSuccess = useCallback(
    (newContent: string) => {
      if (selectedPost && posts) {
        const index = posts?.findIndex((p) => p.id === selectedPost.id);
        const newPosts = [...posts];
        newPosts[index] = { ...selectedPost, content: newContent };
        setSelectedPost(null);
        setPosts(newPosts);
        setOpenEditModal(false);
      }
    },
    [selectedPost, posts]
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

  const handleOpenEditModal = useCallback((post: IPost) => {
    setSelectedPost(post);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setSelectedPost(null);
    setOpenEditModal(false);
  }, []);

  const handleOpenShareModal = useCallback((post: IPost) => {
    setSelectedPost(post);
    setOpenShareModal(true);
  }, []);

  const handleCloseShareModal = useCallback(() => {
    setSelectedPost(null);
    setOpenShareModal(false);
  }, []);

  const handleSharePost = useCallback(
    (friends) => {
      console.log(`Sharing post ${selectedPost?.id}`);
      console.log(friends);
      return Promise.resolve();
    },
    [selectedPost?.id]
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
            onDeleteClick={handleDeletePost}
            onEditClick={handleOpenEditModal}
            onLikeClick={handleLikePost}
            onShareClick={handleOpenShareModal}
          />
        );
      });
    }
  }, [posts, handleDeletePost, handleOpenEditModal, handleLikePost, handleOpenShareModal]);

  return (
    <Container>
      <Link to="/posts/create">Create Post</Link>
      {render()}
      <EditPostModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        post={selectedPost}
        onUpdate={handleUpdatePost}
        onUpdateSuccess={handleUpdatePostSuccess}
      />
      <ShareModal open={openShareModal} onClose={handleCloseShareModal} onShare={handleSharePost} />
    </Container>
  );
};

export default Home;

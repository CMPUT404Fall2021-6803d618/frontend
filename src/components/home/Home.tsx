import Loading from "components/common/components/Loading";
import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import React, { FC, useCallback, useState, useEffect } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { Like, Post as IPost, PostObject } from "shared/interfaces";
import useLike from "hooks/LikeHook";
import EditPostModal from "./EditPostModal";
import ShareModal from "./ShareModal";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { PaginateResponse } from "services/BaseService";
import CommentModal from "./CommentModal";

const Container = styled(Stack)`
  padding: 12px;
  flex: 1;
  margin: 0;
`;

const PostList: FC = ({ children }) => <Stack spacing={1}>{children}</Stack>;

const Home: FC = () => {
  const { user } = useAuthStore();
  const { deletePost, updatePost, getStreamPosts, sharePostToFriends, sharePostToFollowers } =
    usePost(user);
  const { getLiked, likePost, getLikes } = useLike();
  const [liked, setLiked] = useState<Like[] | null>(null);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAllPostLoaded, setIsAllPostLoaded] = useState(false);

  const setNewPosts = useCallback(
    (
      currentPosts: IPost[],
      postsData: Pick<PaginateResponse<PostObject>, "count" | "items">,
      likedData: Like[],
      likesData: Like[][]
    ) => {
      const newPosts: IPost[] = postsData.items.map((post, index) => {
        return {
          ...post,
          liked: !!likedData.find((l) => l.object === post.id),
          likeCount: likesData[index].length,
        };
      });
      const combined = [...currentPosts, ...newPosts];
      if (combined.length === postsData.count) {
        setIsAllPostLoaded(true);
      }
      setPosts(combined);
    },
    []
  );

  const loadData = useCallback(async () => {
    if (user) {
      const [postsData, likedData] = await Promise.all([getStreamPosts(1), getLiked()]);
      const likesData = await Promise.all(
        postsData.items.map((p) => (p.is_github ? Promise.resolve([]) : getLikes(p.id)))
      );
      setLiked(likedData);
      setNewPosts([], postsData, likedData, likesData);
    }
  }, [user, getStreamPosts, getLiked, setNewPosts, getLikes]);

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

  const handleShareFriends = useCallback(
    async (friends) => {
      if (selectedPost) {
        sharePostToFriends(selectedPost, friends);
      }
    },
    [selectedPost, sharePostToFriends]
  );

  const handleShareFollowers = useCallback(
    async (post: IPost) => {
      sharePostToFollowers(post);
    },
    [sharePostToFollowers]
  );

  const handleOpenCommentModal = useCallback((post: IPost) => {
    setSelectedPost(post);
    setOpenCommentModal(true);
  }, []);

  const handleCloseCommentModal = useCallback(() => {
    setSelectedPost(null);
    setOpenCommentModal(false);
  }, []);

  const handleLoadMoreClick = useCallback(async () => {
    if (liked && posts) {
      const newPage = currentPage + 1;
      const postsData = await getStreamPosts(newPage);
      const likesData = await Promise.all(postsData.items.map((p) => getLikes(p.id)));
      setNewPosts(posts, postsData, liked, likesData);
      setCurrentPage(newPage);
    }
  }, [currentPage, getStreamPosts, liked, posts, setNewPosts, getLikes]);

  const render = useCallback(() => {
    if (posts === null) {
      return <Loading />;
    } else if (posts.length === 0) {
      return <div>No posts</div>;
    } else {
      return (
        <>
          {posts.map((post) => {
            if (post.is_github) {
              return <Post key={post.id} post={post} />;
            }
            return (
              <Post
                key={post.id}
                post={post}
                onDeleteClick={handleDeletePost}
                onEditClick={handleOpenEditModal}
                onLikeClick={handleLikePost}
                onCommentClick={handleOpenCommentModal}
                onShareFriendsClick={handleOpenShareModal}
                onShareFollowersClick={handleShareFollowers}
              />
            );
          })}
          {
            <Button onClick={handleLoadMoreClick} disabled={isAllPostLoaded}>
              Load More
            </Button>
          }
        </>
      );
    }
  }, [
    posts,
    handleLoadMoreClick,
    isAllPostLoaded,
    handleDeletePost,
    handleOpenEditModal,
    handleLikePost,
    handleOpenCommentModal,
    handleOpenShareModal,
    handleShareFollowers,
  ]);

  return (
    <Container spacing={1} sx={{ margin: 1 }}>
      <Link to="/posts/create">
        <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
          Create Post
        </Button>
      </Link>
      <PostList>{render()}</PostList>
      <EditPostModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        post={selectedPost}
        onUpdate={handleUpdatePost}
        onUpdateSuccess={handleUpdatePostSuccess}
      />
      <ShareModal
        open={openShareModal}
        onClose={handleCloseShareModal}
        onShare={handleShareFriends}
      />
      <CommentModal
        open={openCommentModal}
        onClose={handleCloseCommentModal}
        post={selectedPost}
        liked={liked}
      />
    </Container>
  );
};

export default Home;

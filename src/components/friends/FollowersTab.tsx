import React, { useState, useEffect, useCallback, FC } from "react";
import useFollow, { Peer } from "hooks/FollowHook";
import styled from "styled-components";
import UserCard from "./UserCard";

enum FollowAction {
  FOLLOW,
  UNFOLLOW,
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

const FollowersTab: FC = () => {
  const [followers, setFollowers] = useState<Peer[]>([]);
  const { getFollowers, removeFollower, follow, unfollow } = useFollow();

  useEffect(() => {
    getFollowers().then((data) => {
      setFollowers(data);
    });
  }, [getFollowers]);

  const handleRemoveFollower = useCallback(
    async (id: string) => {
      const removed = await removeFollower(id);
      if (removed) {
        const newFollowers = followers.filter((f) => f.id !== id);
        setFollowers(newFollowers);
      }
    },
    [followers, removeFollower]
  );

  const updateFollowStatus = useCallback(
    async (id: string, action: FollowAction) => {
      let isFollowed: boolean;
      if (action === FollowAction.FOLLOW) {
        isFollowed = await follow(id);
      } else {
        isFollowed = await unfollow(id);
      }
      const index = followers.findIndex((f) => f.id === id);
      const newFollowers = [...followers];
      newFollowers[index] = { ...followers[index], isFollowed };
      setFollowers(newFollowers);
    },
    [follow, followers, unfollow]
  );

  const handleFollow = useCallback(
    async (id: string) => {
      updateFollowStatus(id, FollowAction.FOLLOW);
    },
    [updateFollowStatus]
  );

  const handleUnfollow = useCallback(
    async (id: string) => {
      updateFollowStatus(id, FollowAction.UNFOLLOW);
    },
    [updateFollowStatus]
  );

  return (
    <Container>
      {followers.map(({ id, userName, displayName, isFollowed }) => (
        <UserCard
          id={id}
          userName={userName}
          displayName={displayName}
          isFollowed={isFollowed}
          onFollowerRemove={handleRemoveFollower}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          key={id}
        />
      ))}
    </Container>
  );
};

export default FollowersTab;

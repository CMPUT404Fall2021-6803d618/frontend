import React, { useState, useEffect, FC, useCallback } from "react";
import useFollow, { Peer } from "hooks/FollowHook";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

const FriendsTab: FC = () => {
  const [friends, setFriends] = useState<Peer[]>([]);
  const { getFriends, removeFollower, unfollow } = useFollow();

  useEffect(() => {
    getFriends().then((data) => {
      setFriends(data);
    });
  }, [getFriends]);

  const handleUnfollow = useCallback(
    async (id) => {
      await unfollow(id);
      const newFriends = friends.filter((f) => f.id !== id);
      setFriends(newFriends);
    },
    [friends, unfollow]
  );

  const handleRemoveFollower = useCallback(
    async (id) => {
      await removeFollower(id);
      const newFriends = friends.filter((f) => f.id !== id);
      setFriends(newFriends);
    },
    [friends, removeFollower]
  );

  return (
    <Container>
      {friends.map(({ id, userName, displayName, isFollowed }) => (
        <UserCard
          id={id}
          userName={userName}
          displayName={displayName}
          isFollowed={isFollowed}
          key={id}
          onFollowerRemove={handleRemoveFollower}
          onUnfollow={handleUnfollow}
        />
      ))}
    </Container>
  );
};

export default FriendsTab;

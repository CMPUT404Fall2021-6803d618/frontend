import React, { useState, useEffect, useCallback, FC } from "react";
import useFollow, { Peer } from "hooks/FollowHook";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

const FollowersTab: FC = () => {
  const [followers, setFollowers] = useState<Peer[]>([]);
  const { getFollowers, removeFollower } = useFollow();

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

  return (
    <Container>
      {followers.map(({ id, userName, displayName, isFollowed }) => (
        <UserCard
          id={id}
          userName={userName}
          displayName={displayName}
          isFollowed={isFollowed}
          onFollowerRemove={handleRemoveFollower}
          key={id}
        />
      ))}
    </Container>
  );
};

export default FollowersTab;

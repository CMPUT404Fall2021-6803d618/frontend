import React, { useState, useEffect, FC, useCallback } from "react";
import useFollow, { Peer } from "hooks/FollowHook";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

const FollowingsTab: FC = () => {
  const [followings, setFollowings] = useState<Peer[]>([]);
  const { getFollowings, unfollow } = useFollow();

  useEffect(() => {
    getFollowings().then((data) => {
      setFollowings(data);
    });
  }, [getFollowings]);

  const handleUnfollow = useCallback(
    async (id: string) => {
      await unfollow(id);
      const newFollowings = followings.filter((f) => f.id !== id);
      setFollowings(newFollowings);
    },
    [followings, unfollow]
  );

  return (
    <Container>
      {followings.map(({ id, userName, displayName, isFollowed }) => (
        <UserCard
          id={id}
          userName={userName}
          displayName={displayName}
          isFollowed={isFollowed}
          key={id}
          onUnfollow={handleUnfollow}
        />
      ))}
    </Container>
  );
};

export default FollowingsTab;

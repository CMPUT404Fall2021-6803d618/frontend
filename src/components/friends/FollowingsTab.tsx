import React, { useState, useEffect, FC } from "react";
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
  const { getFollowings } = useFollow();

  useEffect(() => {
    getFollowings().then((data) => {
      setFollowings(data);
    });
  }, [getFollowings]);

  return (
    <Container>
      {followings.map(({ id, userName, displayName, isFollowed }) => (
        <UserCard
          id={id}
          userName={userName}
          displayName={displayName}
          isFollowed={isFollowed}
          key={id}
        />
      ))}
    </Container>
  );
};

export default FollowingsTab;

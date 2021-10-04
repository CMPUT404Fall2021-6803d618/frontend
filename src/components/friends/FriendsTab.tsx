import React, { useState, useEffect, FC } from "react";
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
  const { getFriends } = useFollow();

  useEffect(() => {
    getFriends().then((data) => {
      setFriends(data);
    });
  }, [getFriends]);

  return (
    <Container>
      {friends.map(({ id, userName, displayName, isFollowed }) => (
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

export default FriendsTab;

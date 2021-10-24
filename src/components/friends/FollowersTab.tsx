import React, { FC } from "react";
import { Peer } from "hooks/FollowHook";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

export interface IFollowersTabProps {
  followers: null | Peer[];
  onFollow: (id: string) => Promise<void>;
  onUnfollow: (id: string) => Promise<void>;
  onRemoveFollower: (id: string) => Promise<void>;
}

const FollowersTab: FC<IFollowersTabProps> = (props) => {
  const { followers, onFollow, onUnfollow, onRemoveFollower } = props;

  return (
    <Container>
      {followers ? (
        followers.map(({ id, displayName, followStatus }) => (
          <UserCard
            id={id}
            displayName={displayName}
            followStatus={followStatus}
            onFollowerRemove={onRemoveFollower}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            key={id}
          />
        ))
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
};

export default FollowersTab;

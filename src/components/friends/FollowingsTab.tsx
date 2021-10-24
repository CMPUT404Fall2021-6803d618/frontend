import React, { FC } from "react";
import { Peer } from "hooks/FollowHook";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

export interface IFollowingsTabProps {
  followings: Peer[] | null;
  onUnfollow: (id: string) => Promise<void>;
}

const FollowingsTab: FC<IFollowingsTabProps> = (props) => {
  const { followings, onUnfollow } = props;

  return (
    <Container>
      {followings ? (
        followings.map(({ id, displayName, followStatus }) => (
          <UserCard id={id} displayName={displayName} followStatus={followStatus} key={id} onUnfollow={onUnfollow} />
        ))
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
};

export default FollowingsTab;

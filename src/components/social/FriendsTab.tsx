import React, { FC } from "react";
import { Person } from "hooks/SocialHook";
import styled from "styled-components";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";
import UsersList from "./UsersList";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

export interface IFriendsTabProps {
  friends: Person[] | null;
  onRemoveFollower: (id: string) => Promise<void>;
  onUnfollow: (id: string) => Promise<void>;
}

const FriendsTab: FC<IFriendsTabProps> = (props) => {
  const { friends, onRemoveFollower, onUnfollow } = props;

  return (
    <UsersList>
      {friends ? (
        friends.map(({ id, displayName, followStatus }) => (
          <UserCard
            id={id}
            displayName={displayName}
            followStatus={followStatus}
            key={id}
            onFollowerRemove={onRemoveFollower}
            onUnfollow={onUnfollow}
          />
        ))
      ) : (
        <Loading />
      )}
    </UsersList>
  );
};

export default FriendsTab;

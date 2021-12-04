import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import styled from "styled-components";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";
import ListContainer from "../common/components/ListContainer";

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

  const render = useCallback(() => {
    if (friends?.length === 0) {
      return <div>No friends</div>;
    } else {
      return friends?.map(({ id, displayName, followStatus, profileColor, profileImage }) => (
        <UserCard
          id={id}
          displayName={displayName}
          followStatus={followStatus}
          key={id}
          onFollowerRemove={onRemoveFollower}
          onUnfollow={onUnfollow}
          profileColor={profileColor}
          profileImage={profileImage}
        />
      ));
    }
  }, [friends, onRemoveFollower, onUnfollow]);

  return <ListContainer>{friends ? render() : <Loading />}</ListContainer>;
};

export default FriendsTab;

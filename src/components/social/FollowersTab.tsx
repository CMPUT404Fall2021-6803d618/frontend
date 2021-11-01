import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import styled from "styled-components";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

export interface IFollowersTabProps {
  followers: null | Person[];
  onFollow: (id: string) => Promise<void>;
  onUnfollow: (id: string) => Promise<void>;
  onRemoveFollower: (id: string) => Promise<void>;
}

const FollowersTab: FC<IFollowersTabProps> = (props) => {
  const { followers, onFollow, onUnfollow, onRemoveFollower } = props;

  const render = useCallback(() => {
    if (followers?.length === 0) {
      return <div>No followers</div>;
    } else {
      return followers?.map(({ id, displayName, followStatus }) => (
        <UserCard
          id={id}
          displayName={displayName}
          followStatus={followStatus}
          onFollowerRemove={onRemoveFollower}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          key={id}
        />
      ));
    }
  }, [followers, onFollow, onRemoveFollower, onUnfollow]);

  return <Container>{followers ? render() : <Loading />}</Container>;
};

export default FollowersTab;

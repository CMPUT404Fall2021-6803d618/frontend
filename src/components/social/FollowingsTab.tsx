import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

export interface IFollowingsTabProps {
  followings: Person[] | null;
  onUnfollow: (id: string) => Promise<void>;
}

const FollowingsTab: FC<IFollowingsTabProps> = (props) => {
  const { followings, onUnfollow } = props;

  const render = useCallback(() => {
    if (followings?.length === 0) {
      return <div>No followings</div>;
    } else {
      return followings?.map(({ id, displayName, followStatus }) => (
        <UserCard id={id} displayName={displayName} followStatus={followStatus} key={id} onUnfollow={onUnfollow} />
      ));
    }
  }, [followings, onUnfollow]);

  return <Container>{followings ? render() : <div>Loading</div>}</Container>;
};

export default FollowingsTab;

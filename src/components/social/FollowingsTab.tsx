import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";
import UsersList from "./UsersList";

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
        <UserCard
          id={id}
          displayName={displayName}
          followStatus={followStatus}
          key={id}
          onUnfollow={onUnfollow}
        />
      ));
    }
  }, [followings, onUnfollow]);

  return <UsersList>{followings ? render() : <Loading />}</UsersList>;
};

export default FollowingsTab;

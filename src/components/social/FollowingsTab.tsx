import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";
import ListContainer from "../common/components/ListContainer";

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
      return followings?.map(
        ({ id, displayName, followStatus, profileColor, profileImage, url }) => (
          <UserCard
            id={id}
            displayName={displayName}
            followStatus={followStatus}
            key={id}
            onUnfollow={onUnfollow}
            profileColor={profileColor}
            profileImage={profileImage}
            url={url}
          />
        )
      );
    }
  }, [followings, onUnfollow]);

  return <ListContainer>{followings ? render() : <Loading />}</ListContainer>;
};

export default FollowingsTab;

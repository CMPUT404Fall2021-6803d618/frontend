import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";
import UsersList from "./UsersList";

interface IProps {
  people: Person[] | null;
  onFollow: (id: string) => Promise<void>;
  onUnfollow: (id: string) => Promise<void>;
}

const PeopleTab: FC<IProps> = (props) => {
  const { people, onFollow, onUnfollow } = props;

  const render = useCallback(() => {
    if (people?.length === 0) {
      return <div>No people</div>;
    } else {
      return people?.map(({ id, displayName, followStatus }) => (
        <UserCard
          id={id}
          displayName={displayName}
          followStatus={followStatus}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          key={id}
        />
      ));
    }
  }, [people, onFollow, onUnfollow]);

  return <UsersList>{people ? render() : <Loading />}</UsersList>;
};

export default PeopleTab;

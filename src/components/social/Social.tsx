import TabsNav from "components/common/components/TabsNav";
import { withParamId } from "decorators/withParamId";
import useSocial from "hooks/SocialHook";
import React, { FC, useMemo } from "react";
import FollowersTab from "./FollowersTab";
import FollowingsTab from "./FollowingsTab";
import FriendsTab from "./FriendsTab";
import PeopleTab from "./PeopleTab";

interface IProps {
  id: string;
}

const Social: FC<IProps> = (props) => {
  const { id } = props;
  const {
    currentNode,
    nodes,
    people,
    followers,
    followings,
    friends,
    handleFollow,
    handleRemoveFollower,
    handleUnfollow,
    handleNodeChange,
  } = useSocial();
  const tabs = useMemo(
    () => [
      {
        id: "people",
        label: "People",
        render: () => (
          <PeopleTab
            people={people}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            nodes={nodes}
            currentNode={currentNode}
            onNodeChange={handleNodeChange}
          />
        ),
      },
      {
        id: "followers",
        label: "Followers",
        render: () => (
          <FollowersTab
            followers={followers}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            onRemoveFollower={handleRemoveFollower}
          />
        ),
      },
      {
        id: "followings",
        label: "Followings",
        render: () => <FollowingsTab followings={followings} onUnfollow={handleUnfollow} />,
      },
      {
        id: "friends",
        label: "Friends",
        render: () => (
          <FriendsTab
            friends={friends}
            onUnfollow={handleUnfollow}
            onRemoveFollower={handleRemoveFollower}
          />
        ),
      },
    ],
    [
      currentNode,
      followers,
      followings,
      friends,
      handleFollow,
      handleNodeChange,
      handleRemoveFollower,
      handleUnfollow,
      nodes,
      people,
    ]
  );

  return <TabsNav tabs={tabs} id={id} />;
};

export default withParamId(Social);

import React, { FC } from "react";
import FollowersTab from "./FollowersTab";
import FollowingsTab from "./FollowingsTab";
import FriendsTab from "./FriendsTab";
import FriendTabs, { Tab } from "./FriendTabs";

const tabs: Tab[] = [
  {
    label: "Followers",
    route: "followers",
    Component: FollowersTab,
  },
  {
    label: "Followings",
    route: "followings",
    Component: FollowingsTab,
  },
  {
    label: "Friends",
    route: "friends",
    Component: FriendsTab,
  },
];

const Friend: FC = () => {
  return (
    <div>
      <FriendTabs tabs={tabs} />
    </div>
  );
};

export default Friend;

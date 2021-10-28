import { withParamId } from "decorators/withParamId";
import useSocial from "hooks/SocialHook";
import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import history from "utils/history";
import FollowersTab from "./FollowersTab";
import FollowingsTab from "./FollowingsTab";
import FriendsTab from "./FriendsTab";
import PeopleTab from "./PeopleTab";
import SocialTabs from "./SocialTabs";

interface IProps {
  id: string;
}

const Social: FC<IProps> = (props) => {
  const { id } = props;
  const { people, followers, followings, friends, handleFollow, handleRemoveFollower, handleUnfollow } = useSocial();
  const tabs = useMemo(
    () => [
      {
        id: "people",
        label: "People",
        render: () => <PeopleTab people={people} onFollow={handleFollow} onUnfollow={handleUnfollow} />,
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
          <FriendsTab friends={friends} onUnfollow={handleUnfollow} onRemoveFollower={handleRemoveFollower} />
        ),
      },
    ],
    [followers, followings, friends, handleFollow, handleRemoveFollower, handleUnfollow, people]
  );
  const [currentTab, setCurrentTab] = useState(tabs.find((t) => t.id === id)?.id ?? tabs[0].id);

  useEffect(() => {
    const unlisten = history.listen((data) => {
      if (data.location.state !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tabId = (data.location.state as any).id;
        const tab = tabs.find((t) => t.id === tabId)?.id ?? tabs[0].id;
        setCurrentTab(tab);
      } else {
        setCurrentTab(tabs[0].id);
      }
    });
    return () => unlisten();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = useCallback((newTab: string) => {
    setCurrentTab(newTab);
    history.push(newTab, { id: newTab });
  }, []);

  return (
    <div>
      <SocialTabs currentTab={currentTab} tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
};

export default withParamId(Social);

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import useFollow from "hooks/FollowHook";
import React, { useState, ChangeEvent, PropsWithChildren, FC, useCallback } from "react";
import FollowersTab from "./FollowersTab";
import FollowingsTab from "./FollowingsTab";
import FriendsTab from "./FriendsTab";

interface TabPanelProps {
  value: number;
  index: number;
}

export interface Tab {
  label: string;
  route: string;
  render: FC;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function TabPanel(props: PropsWithChildren<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    key: `tab-${index}`,
  };
}

const FriendTabs: FC = () => {
  const [value, setValue] = useState(0);
  const { followers, followings, friends, handleFollow, handleRemoveFollower, handleUnfollow } = useFollow();

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-types
    (_event: ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="friend tabs">
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Followings" {...a11yProps(1)} />
          <Tab label="Friends" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FollowersTab
          followers={followers}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          onRemoveFollower={handleRemoveFollower}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FollowingsTab followings={followings} onUnfollow={handleUnfollow} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FriendsTab friends={friends} onUnfollow={handleUnfollow} onRemoveFollower={handleRemoveFollower} />
      </TabPanel>
    </Box>
  );
};

export default FriendTabs;

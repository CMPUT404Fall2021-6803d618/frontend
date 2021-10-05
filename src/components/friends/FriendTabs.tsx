import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, {
  useState,
  ChangeEvent,
  PropsWithChildren,
  FC,
  useCallback,
} from "react";

interface TabPanelProps {
  value: number;
  index: number;
}

export interface Tab {
  label: string;
  route: string;
  Component: FC;
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

interface FriendTabsProps {
  tabs: Tab[];
}
const FriendTabs: FC<FriendTabsProps> = (props) => {
  const { tabs } = props;
  const [value, setValue] = useState(0);

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
          {tabs.map((tab, index) => (
            <Tab label={tab.label} {...a11yProps(index)} key={tab.label} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={`tab-panel-${index}`}>
          <tab.Component />
        </TabPanel>
      ))}
    </Box>
  );
};

export default FriendTabs;

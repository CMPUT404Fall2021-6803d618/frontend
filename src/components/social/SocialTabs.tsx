import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState, ChangeEvent, PropsWithChildren, FC, useCallback, useEffect } from "react";

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

interface IProps {
  currentTab: string;
  tabs: { id: string; label: string; render: () => JSX.Element }[];
  onTabChange: (newTab: string) => void;
}

const SocialTabs: FC<IProps> = (props) => {
  const { tabs, currentTab, onTabChange } = props;
  const [value, setValue] = useState(
    (() => {
      const index = tabs.findIndex((t) => t.id === currentTab);
      if (index === -1) {
        return 0;
      } else {
        return index;
      }
    })()
  );

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === currentTab);
    if (index === -1) {
      setValue(0);
    } else {
      setValue(index);
    }
  }, [currentTab, tabs]);

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-types
    (_event: ChangeEvent<{}>, newValue: number) => {
      onTabChange(tabs[newValue].id);
    },
    [onTabChange, tabs]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="friend tabs">
          {tabs.map((tab) => (
            <Tab label={tab.label} {...a11yProps(0)} key={`tab-${tab.label}`} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={`tab-panel-${tab.label}`}>
          {tab.render()}
        </TabPanel>
      ))}
    </Box>
  );
};

export default SocialTabs;

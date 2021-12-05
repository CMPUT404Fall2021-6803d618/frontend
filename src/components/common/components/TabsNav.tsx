import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/system/Box";
import React, { FC, useState, useCallback, useEffect, ChangeEvent, PropsWithChildren } from "react";
import history from "utils/history";

interface TabPanelProps {
  value: number;
  index: number;
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
  id: string;
  tabs: {
    id: string;
    label: string;
    render: () => JSX.Element;
  }[];
}

const TabsNav: FC<IProps> = (props) => {
  const { id, tabs } = props;
  const [currentTab, setCurrentTab] = useState(tabs.find((t) => t.id === id)?.id ?? tabs[0].id);
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
      const newTab = tabs[newValue].id;
      setCurrentTab(newTab);
      history.push(newTab, { id: newTab });
    },
    [tabs]
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "hidden" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="friend tabs"
            scrollButtons
            allowScrollButtonsMobile
          >
            {tabs.map((tab, index) => (
              <Tab label={tab.label} {...a11yProps(index)} key={`tab-${tab.label}`} wrapped />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel value={value} index={index} key={`tab-panel-${tab.label}`}>
            {tab.render()}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
};

export default TabsNav;

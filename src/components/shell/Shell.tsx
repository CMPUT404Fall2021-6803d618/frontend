import React, { FC, useState, useCallback } from "react";
import { routes } from "router/routes";
import Router from "router/Router";
import styled from "styled-components";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const Root = styled.div`
  display: flex;
  height: 100%;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background: white;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

interface IProps {
  location: {
    pathname: string;
  };
}

const Shell: FC<IProps> = () => {
  const classes = useStyles();
  const [currentTitle, setCurrentTitle] = useState(routes[1].appBarTitle ?? "");
  const [currentUrl, setCurrentUrl] = useState(routes[1].path);

  const handleRouteChange = useCallback((path: string, url: string) => {
    const currentRoute = routes.find((route) => route.path === path);
    setCurrentUrl(currentRoute ? url : routes[0].path);
    setCurrentTitle(currentRoute?.appBarTitle ?? "");
  }, []);

  return (
    <Root>
      <ResponsiveDrawer currentUrl={currentUrl} currentTitle={currentTitle} />
      <Main>
        {currentTitle && <div className={classes.toolbar} />}
        <Router routes={routes} onRouteChange={handleRouteChange} />
      </Main>
    </Root>
  );
};

export default Shell;

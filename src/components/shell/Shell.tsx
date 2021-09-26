import React, { useMemo } from "react";
import { IRoute, routes } from "router/routes";
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

export default function Shell(props: IProps) {
  const classes = useStyles();

  const currentRoute: IRoute = useMemo(() => {
    const currentPath = props.location.pathname;
    return routes.find((route) => route.path === currentPath) ?? routes[0];
  }, [props.location.pathname]);

  return (
    <Root>
      <ResponsiveDrawer currentRoute={currentRoute} />
      <Main>
        {currentRoute.appBarTitle && <div className={classes.toolbar} />}
        <Router routes={routes} />
      </Main>
    </Root>
  );
}

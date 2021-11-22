import React, { FC, useState, useCallback, Fragment } from "react";
import { routes } from "router/routes";
import Router from "router/Router";
import styled from "styled-components";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

const Root = styled.div`
  display: flex;
  height: 100%;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 2;
`;

const DrawerToggleButton = styled(IconButton)`
  @media (min-width: 600px) {
    display: none !important;
  }
`;

interface IProps {
  location: {
    pathname: string;
  };
}

const Shell: FC<IProps> = () => {
  const [currentTitle, setCurrentTitle] = useState(routes[1].appBarTitle ?? "");
  const [currentUrl, setCurrentUrl] = useState(routes[1].path);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleRouteChange = useCallback((path: string, url: string) => {
    const currentRoute = routes.find((route) => route.path === path);
    setCurrentUrl(currentRoute ? url : routes[0].path);
    setCurrentTitle(currentRoute?.appBarTitle ?? "");
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <Root>
      <ResponsiveDrawer currentUrl={currentUrl} onDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />

      <Main>
        {currentTitle && (
          <Fragment>
            <AppBar position="relative" elevation={0}>
              <Toolbar>
                <DrawerToggleButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </DrawerToggleButton>
                <Typography variant="h6" noWrap>
                  {currentTitle}
                </Typography>
              </Toolbar>
            </AppBar>
            <Divider />
          </Fragment>
        )}
        <Router routes={routes} onRouteChange={handleRouteChange} />
      </Main>
    </Root>
  );
};

export default Shell;

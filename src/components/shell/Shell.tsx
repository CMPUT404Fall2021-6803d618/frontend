import React, { FC, useState, useCallback, Fragment } from "react";
import { routes } from "router/routes";
import Router from "router/Router";
import styled from "styled-components";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { LINK_LIST } from "router/drawerLinks";
import { Link } from "react-router-dom";

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

interface INavProps {
  children: React.ReactNode;
  className?: string;
}

interface INavItem {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const Nav: FC<INavProps> = ({ children, className = null }) => {
  return (
    <nav className={"px-0 sm:px-4 " + (className || "")}>
      <ul className="flex flex-col items-stretch">{children}</ul>
    </nav>
  );
};

const NavItem: FC<INavItem> = ({ to, isActive, children }) => {
  return (
    <li>
      <Link to={to} className={`block px-4 py-2 rounded-md ${isActive ? "bg-green-500 text-gray-800" : ""}`}>
        {children}
      </Link>
    </li>
  );
};

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
    <div className="container mx-auto flex flex-row px-0 sm:px-20 md:px-40">
      {/* the navigation menu */}
      <Nav className="w-1/4 min-w-min">
        {LINK_LIST.map((list, index) => (
          <Fragment key={`drawer-link-list-${index}`}>
            {list.map((link) => (
              <NavItem
                key={link.name}
                to={link.path}
                isActive={link.subpath ? link.subpath.includes(currentUrl) : link.path === currentUrl}
              >
                {link.name}
              </NavItem>
            ))}
          </Fragment>
        ))}
      </Nav>

      {/* the main route view */}
      <div className="w-3/4 flex-2 ">
        <h2 className="w-full bg-gray-900 text-white">{currentTitle}</h2>
        <Router routes={routes} onRouteChange={handleRouteChange} />
      </div>
    </div>
  );
};

export default Shell;

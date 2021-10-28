import React, { FunctionComponent } from "react";
import { Switch } from "react-router";
import { IRoute } from "./routes";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { Redirect, Route } from "react-router-dom";

interface IProps {
  routes: IRoute[];
  onRouteChange: (newPath: string, url: string) => void;
}

const Router: FunctionComponent<IProps> = ({ routes, onRouteChange }) => {
  return (
    <Switch>
      {routes.map((route: IRoute) => (
        <RouteWithSubRoutes key={route.path} {...route} onRouteChange={onRouteChange} />
      ))}
      <Route component={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default Router;
